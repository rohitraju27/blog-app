import React from 'react';
import { Form, Button } from 'react-bootstrap';

function FormPage({
  error,
  type = 'Create',
  blog,
  handleSubmit,
  onBlogChange,
}) {
  const style = { width: '50%', margin: 'auto' };
  return (
    <div style={style} className='mt-5'>
      <Form>
        <h1>{type} Blog</h1>
        <Form.Group className='mb-3' controlId='formBasicTitle'>
          <Form.Label>Blog Title</Form.Label>
          <Form.Control
            onChange={(e) => onBlogChange(e.target.title, e.target.value)}
            title='title'
            type='text'
            value={blog.title}
            placeholder='Enter title of your blog'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicContent'>
          <Form.Label>Content</Form.Label>
          <Form.Control
            onChange={(e) => onBlogChange(e.target.title, e.target.value)}
            as='textarea'
            rows={3}
            title='body'
            type='text'
            value={blog.body}
            placeholder='Enter your content'
          />
        </Form.Group>
        {error && (
          <span className='d-block' style={{ color: 'red' }}>
            {error}
          </span>
        )}
        <Button variant='primary' type='submit' onClick={handleSubmit}>
          {type === 'Edit' ? 'Edit' : 'Create'}
        </Button>
      </Form>
    </div>
  );
}

export default FormPage;
