const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes'); // ✅ adjust if path is different

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Add this route registration
app.use('/api/blogs', blogRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err)); // 👈 Add log

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


