// netlify/functions/api.js
const express = require('express');
const serverless = require('@netlify/functions');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Import route handlers
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

// Connect explicitly to your Neon PostgreSQL database
const sequelize = new Sequelize("postgresql://neondb_owner:npg_Jn3SVYWM4vbL@ep-winter-morning-a8z5gk4d-pooler.eastus2.azure.neon.tech/neondb?sslmode=require", {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected successfully'))
  .catch(err => console.error('Unable to connect to PostgreSQL:', err));

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
