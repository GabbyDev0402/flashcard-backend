const express = require('express');
const Card = require('../models/Card');

const router = express.Router();

// GET /api/cards - Fetch all cards or filter by subject
router.get('/', async (req, res) => {
  try {
    const { subject } = req.query;
    
    // Build query object
    const query = {};
    if (subject) {
      query.subject = subject;
    }
    
    // Fetch cards from database
    const cards = await Card.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: cards.length,
      data: cards
    });
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cards',
      error: error.message
    });
  }
});

// POST /api/cards - Create a new card
router.post('/', async (req, res) => {
  try {
    const { subject, question, choices, answer } = req.body;
    
    // Basic validation
    if (!subject || !question || !choices || !answer) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: subject, question, choices, answer'
      });
    }
    
    if (!Array.isArray(choices) || choices.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Choices must be an array with at least 2 options'
      });
    }
    
    if (!choices.includes(answer)) {
      return res.status(400).json({
        success: false,
        message: 'Answer must be one of the provided choices'
      });
    }
    
    // Create new card
    const newCard = new Card({
      subject,
      question,
      choices,
      answer
    });
    
    const savedCard = await newCard.save();
    
    res.status(201).json({
      success: true,
      message: 'Card created successfully',
      data: savedCard
    });
  } catch (error) {
    console.error('Error creating card:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while creating card',
      error: error.message
    });
  }
});

module.exports = router;