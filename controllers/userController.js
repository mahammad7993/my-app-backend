// controllers/userController.js

const Blog = require('../models/Blog');

const getCurrentUser = async (req, res) => {
  try {
    const user = req.user; // already fetched in protect middleware

    // Fetch blogs authored by this user
    const blogs = await Blog.find({ author: user._id }).sort({ createdAt: -1 });

    res.json({ user, blogs });
  } catch (err) {
    console.error('Error fetching profile and blogs:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCurrentUser };
