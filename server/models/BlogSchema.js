const { Schema, model, models } = require('mongoose');

const blogSchema = new Schema({
  title: {
    type: String,
    require: [true, 'Title is required'],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  body: {
    type: String,
    required: [true, 'Content is required'],
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
});

const Blog = models.Blog || model('Blog', blogSchema);

module.exports = Blog;
