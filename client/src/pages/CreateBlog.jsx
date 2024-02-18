import React, { useEffect, useState } from 'react';

import FormPage from '../components/FormPage';
import { createBlog } from '../api/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
  const user = useSelector((state) => state.user).user;
  const [blogData, setBlogData] = useState({
    title: '',
    body: '',
    createdBy: user.result ? user?.result._id : '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('profile'))) {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const onBlogChange = (title, value) => {
    const temp = {
      ...blogData,
      [title]: value,
    };

    setBlogData(temp);
  };
  const onCreateBlog = async (e) => {
    e.preventDefault();
    try {
      await createBlog(blogData);
      navigate('/');
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };
  return (
    <FormPage
      type='Create'
      blog={blogData}
      error={error}
      handleSubmit={onCreateBlog}
      onBlogChange={onBlogChange}
    />
  );
}

export default CreateBlog;
