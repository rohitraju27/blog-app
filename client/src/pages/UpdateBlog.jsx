import React, { useEffect, useState } from 'react';

import FormPage from '../components/FormPage';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateBlog } from '../api/api';

function UpdateBlog() {
  const user = useSelector((state) => state.user).user;
  const [blogData, setBlogData] = useState({
    title: '',
    body: '',
    createdBy: user.result ? user?.result._id : '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('profile'))) {
      navigate('/login');
      return;
    }
    const token = JSON.parse(localStorage.getItem('profile')).token;

    const fetchBlog = async () => {
      const blog = await fetch(
        `${process.env.REACT_APP_BLOG_APP_BACKEND}/blog/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());

      setBlogData(blog);
    };

    fetchBlog();
    // eslint-disable-next-line
  }, [id]);

  const onBlogChange = (title, value) => {
    const temp = {
      ...blogData,
      [title]: value,
    };

    setBlogData(temp);
  };
  const onUpdateBlog = async (e) => {
    e.preventDefault();
    try {
      const updatedBlog = await updateBlog(blogData, id);
      setBlogData(updatedBlog);
      navigate('/');
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };
  return (
    <FormPage
      type='Edit'
      error={error}
      blog={blogData}
      handleSubmit={onUpdateBlog}
      onBlogChange={onBlogChange}
    />
  );
}

export default UpdateBlog;
