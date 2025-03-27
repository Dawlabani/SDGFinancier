// netlify/functions/api.js
const express = require('express');
const serverless = require('@netlify/functions');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import route handlers
const chatbotRoutes = require('../../api/chatbot');
const authRoutes = require('../../api/auth');
const budgetRoutes = require('../../api/budget');
const expenseRoutes = require('../../api/expenseModel');
const profileRoutes = require('../../api/profile');
const questionsRoutes = require('../../api/questions');
const rewardsRoutes = require('../../api/rewards');
const sustainabilityRoutes = require('../../api/sustainability');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (adjust your .env accordingly)
mongoose.connect(process.env.DB_URI).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

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
