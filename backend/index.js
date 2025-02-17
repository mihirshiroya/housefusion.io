require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { Clerk } = require('@clerk/clerk-sdk-node');
const { Webhook } = require('svix');
const User = require('./models/User');
const path = require('path');

const clerkClient = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://housefusion-io.onrender.com/'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Custom webhook body parser
const webhookParser = async (req, res, next) => {
  if (req.originalUrl === '/api/webhook') {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      req.rawBody = Buffer.concat(chunks);
      next();
    });
  } else {
    express.json()(req, res, next);
  }
};

app.use(webhookParser);

// Webhook handler
app.post('/api/webhook', async (req, res) => {
  console.log('Received webhook request');
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET');
    return res.status(400).json({ message: 'Webhook secret not configured' });
  }

  try {
    // Get the headers
    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    if (!svix_id || !svix_timestamp || !svix_signature) {
      throw new Error('Missing required Svix headers');
    }

    // Create the webhook headers
    const headers = {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    };

    // Verify the webhook
    const wh = new Webhook(WEBHOOK_SECRET);
    const payload = req.rawBody.toString('utf8');
    const evt = wh.verify(payload, headers);

    console.log('Webhook event type:', evt.type);

    // Handle user creation
    if (evt.type === 'user.created') {
      const userData = evt.data;
      
      // Get the primary email
      const emailAddress = userData.email_addresses?.[0]?.email_address;
      
      if (!emailAddress) {
        throw new Error('No email address found in user data');
      }

      // Check for existing user
      const existingUser = await User.findOne({
        where: { clerkUserId: userData.id }
      });

      if (existingUser) {
        return res.status(200).json({
          message: 'User already exists',
          userId: existingUser.id
        });
      }

      // Create new user
      const newUser = await User.create({
        clerkUserId: userData.id,
        email: emailAddress,
        firstName: userData.first_name || null,
        lastName: userData.last_name || null,
        role: 'buyer' // Using the default value from your model
      });

      console.log('User created successfully:', newUser.id);
      return res.status(201).json({
        message: 'User created successfully',
        userId: newUser.id
      });
    }

    // Handle other webhook events if needed
    return res.status(200).json({
      message: 'Webhook processed successfully'
    });

  } catch (error) {
    console.error('Webhook processing error:', {
      message: error.message,
      stack: error.stack,
      validationErrors: error.errors
    });

    // Send appropriate error response
    return res.status(400).json({
      message: 'Webhook processing failed',
      error: error.message
    });
  }
});

// Public route
app.get('/api/public', (req, res) => {
  res.json({ message: 'This is a public route' });
});

// Auth middleware
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// Protected routes
app.use('/api/protected', ClerkExpressRequireAuth());
app.use('/api/users', ClerkExpressRequireAuth({
  secretKey: process.env.CLERK_SECRET_KEY
}), userRoutes);

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Database initialization
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL');
    
    // Sync models without force to preserve data
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized');
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
})();

// Protected route example
app.get('/api/protected', async (req, res) => {
  try {
    const userId = req.auth.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Invalid session' });
    }
    res.json({ message: 'Protected route accessed successfully' });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});