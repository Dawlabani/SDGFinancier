// netlify/functions/api.js
const express = require('express');
const serverless = require('@netlify/functions');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import route handlers (updated paths)
const chatbotRoutes = require('./routes/chatbot');
const authRoutes = require('./routes/auth');
const budgetRoutes = require('./routes/budget');
const expenseRoutes = require('./routes/expenseModel');
const profileRoutes = require('./routes/profile');
const questionsRoutes = require('./routes/questions');
const rewardsRoutes = require('./routes/rewards');
const sustainabilityRoutes = require('./routes/sustainability');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (ensure your DB_URI is correct in Netlify env variables)
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Register API routes
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/questions', questionsRoutes);
app.use('/api/rewards', rewardsRoutes);
app.use('/api/sustainability', sustainabilityRoutes);

// Basic root endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Netlify Functions API operational!' });
});

// Export wrapped handler
const handler = serverless.express(app);
module.exports = { handler };
