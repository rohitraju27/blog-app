import React from 'react';
import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function BlogPage() {
  const user = useSelector((state) => state.user).user;
  const location = useLocation();
  const blog = location.state;
  const currentUser = user.result._id === blog.createdBy._id;
  return (
    <div>
      <div className='d-flex justify-content-between px-5 pt-3'>
        <span>
          Created by {currentUser ? 'You' : `${blog.createdBy.username}`}
        </span>
        <Image
          src={blog.createdBy.image}
          roundedCircle
          width={50}
          height={50}
        />
      </div>
      <h1>{blog.title}</h1>
      <div>{blog.body}</div>
    </div>
  );
}

export default BlogPage;
