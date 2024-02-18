import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BLOG_APP_BACKEND,
});

const defaultHeaders = () => {
  const headers = {};
  headers['Content-Type'] = 'application/json';
  headers['Authorization'] = `Bearer ${
    JSON.parse(localStorage.getItem('profile')).token
  }`;
  return headers;
};

export const signin = (formData) => instance.post('/user/signin', formData);
export const signup = (formData) => instance.post('/user/signup', formData);
export const updateUser = (userData, id) =>
  instance.patch(`/user/update/${id}`, userData, { headers: defaultHeaders() });

export const createBlog = (blog) => {
  return instance
    .post('/blog/new', blog, { headers: defaultHeaders() })
    .then((res) => res.data);
};

export const getAllBlogs = () => {
  return instance
    .get('/blog/allBlogs', { headers: defaultHeaders() })
    .then((res) => res.data);
};

export const updateBlog = (blog, id) => {
  return instance.patch(`blog/updateBlog/${id}`, blog, {
    headers: defaultHeaders(),
  });
};
