const express = require('express');
const router = express.Router();
const { clerkClient } = require('@clerk/clerk-sdk-node');
const User = require('../models/User');

// Create user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user role
router.put('/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const userId = req.auth.userId;

    // Verify user matches the requested ID using Clerk's ID format
    if (userId !== id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update database
    const user = await User.findOne({ where: { clerkUserId: id } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.role = role;
    await user.save();

    // Update Clerk metadata with proper error handling
    try {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: { role }
      });
    } catch (clerkError) {
      console.error('Clerk metadata update failed:', clerkError);
      return res.status(500).json({ 
        message: 'Role updated locally but failed to update Clerk metadata'
      });
    }

    res.json(user);
  } catch (error) {
    console.error('Role update error:', error);
    res.status(400).json({ 
      message: 'Error updating role',
      error: error.errors?.[0]?.message || error.message 
    });
  }
});

module.exports = router;
