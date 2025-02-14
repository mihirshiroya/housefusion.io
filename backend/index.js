require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { clerkClient } = require('@clerk/clerk-sdk-node');
const { Webhook } = require('svix');
const User = require('./models/User');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Add this after CORS middleware
app.use(express.json());
app.use(ClerkExpressRequireAuth());

// Connect to PostgreSQL
sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('PostgreSQL connection error:', err));

// Sync models
sequelize.sync();

// Webhook handler for Clerk
app.post('/api/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  try {
    // Convert raw body to string if it's a Buffer
    const payloadString = req.body.toString('utf8');
    
    const wh = new Webhook(WEBHOOK_SECRET);
    const evt = await wh.verify(
      payloadString,
      {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      }
    );
    
    const { type, data } = evt;
    
    // Handle user creation
    if (type === 'user.created') {
      await User.create({
        clerkUserId: data.id,
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        role: 'buyer'
      });
      console.log('User saved to PostgreSQL');
    }

    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(400).json({ 
      message: 'Webhook verification failed',
      error: error.message 
    });
  }
});

// Protected route example
app.get('/api/protected', async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  try {
    const token = authHeader.split(' ')[1]; // Bearer token
    const client = await clerkClient.sessions.verifySession(token);
    
    if (!client) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.json({ message: 'Protected route accessed successfully' });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
});

// Routes
app.use('/api/users', userRoutes);

// Public route example
app.get('/api/public', (req, res) => {
  res.json({ message: 'This is a public route' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
