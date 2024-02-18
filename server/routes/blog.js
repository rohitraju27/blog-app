const express = require('express');
const {
  createBlog,
  getAllBlogs,
  editBlog,
  getBlog,
  deleteBlog,
} = require('../controller/blog');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/new', auth, createBlog);
router.get('/allBlogs', auth, getAllBlogs);
router.patch('/updateBlog/:id', auth, editBlog);
router.get('/:id', auth, getBlog);
router.delete('/:id', auth, deleteBlog);

module.exports = router;
