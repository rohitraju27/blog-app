import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Blog({ blog, editable, handleDelete }) {
  return (
    <div className='m-3 col-3 p-0'>
      <Card style={{ width: '25rem', height: '10rem' }}>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Text>Created By: {blog.createdBy.username}</Card.Text>
          <div className='d-flex'>
            <Link to='/blog' state={blog}>
              <Button variant='primary'>View Blog</Button>
            </Link>
            {editable && (
              <>
                <span className='ms-3'>
                  <Link to={`/update-blog?id=${blog._id}`}>
                    <Button>Edit Blog</Button>
                  </Link>
                </span>
                <span className='ms-3'>
                  <Button variant='danger' onClick={handleDelete}>
                    Delete Blog
                  </Button>
                </span>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Blog;
