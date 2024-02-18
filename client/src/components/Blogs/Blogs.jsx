import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';

const Blogs = () => {
  const user = useSelector((state) => state.user).user;
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const data = await fetch(
          `${process.env.REACT_APP_BLOG_APP_BACKEND}/blog/allBlogs`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json());

        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (localStorage.getItem('profile')) {
      const token = JSON.parse(localStorage.getItem('profile')).token;
      fetchData(token);
    }
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (blog) => {
    try {
      const token = JSON.parse(localStorage.getItem('profile')).token;
      await fetch(
        `${process.env.REACT_APP_BLOG_APP_BACKEND}/blog/${blog._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json);

      const filteredBlogs = blogs.filter((b) => b._id !== blog._id);
      setBlogs(filteredBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='row '>
      {!localStorage.getItem('profile') ? (
        <h1 className='mx-auto'>Please login first....</h1>
      ) : (
        blogs.map((blog) => (
          <Blog
            key={blog._id}
            blog={blog}
            editable={
              user.token && user.result._id === blog.createdBy._id
                ? true
                : false
            }
            handleDelete={() => handleDelete(blog)}
          />
        ))
      )}
    </div>
  );
};

export default Blogs;
