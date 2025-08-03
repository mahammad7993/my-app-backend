const Blog = require('../models/Blog');

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().populate('author', 'name email');
  res.json(blogs);
};

const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'name email');
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json(blog);
};

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const blog = new Blog({
    title,
    content,
    author: req.user._id,
  });
  const created = await blog.save();
  res.status(201).json(created);
};

const updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  if (blog.author.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not authorized to update this blog' });

  blog.title = req.body.title || blog.title;
  blog.content = req.body.content || blog.content;
  blog.updatedAt = Date.now();

  const updated = await blog.save();
  res.json(updated);
};

const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  if (blog.author.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not authorized to delete this blog' });

  await blog.remove();
  res.json({ message: 'Blog deleted successfully' });
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};


