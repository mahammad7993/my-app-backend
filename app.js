const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Middleware — ALLOW frontend access
app.use(cors({
  origin: 'http://localhost:3002', // or frontend URL if deployed
  credentials: true
}));

// JSON body parser
app.use(express.json());

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// DB connect & server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Connection error:', err));
