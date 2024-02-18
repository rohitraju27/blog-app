const Blog = require('../models/BlogSchema.js');

const createBlog = async (req, res) => {
  const { title, body, createdBy } = req.body;
  try {
    if (!title || !body) {
      res.status(400).json({ message: 'Please enter all fields', status: 400 });
      return;
    }

    const blog = new Blog({
      title,
      body,
      createdBy,
      createdDate: new Date().toISOString(),
    });
    await blog.save();

    res
      .status(201)
      .json({ message: 'Created a blog successfully', status: 201 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Could not create a blog', status: 500 });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('createdBy');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ message: 'Could not fetch all blogs', status: 404 });
  }
};

const editBlog = async (req, res) => {
  const newBlog = req.body;
  const { id } = req.params;
  try {
    if (!newBlog.title || !newBlog.body) {
      res.status(400).json({ message: 'Please enter all fields', status: 400 });
      return;
    }

    const updatedBlog = await Blog.findByIdAndUpdate({ _id: id }, newBlog);
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Edit failed', status: 500 });
  }
};

const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: 'Could not find blog', status: 404 });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndDelete(id);

    res.status(200).json({ message: 'Delete successful', status: 200 });
  } catch (error) {
    res.status(200).json({ message: 'Delete unsuccessful', status: 500 });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  editBlog,
  getBlog,
  deleteBlog,
};
