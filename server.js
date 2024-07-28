require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes/route');
var router = express.Router();

const app = express();
const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
// app.use('/api', routes);

// // // Error handling middleware
// const errorHandler = (err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// };

// // // Apply error handling middleware
// // app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});