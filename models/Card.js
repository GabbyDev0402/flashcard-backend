const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true
  },
  choices: {
    type: [String],
    required: [true, 'Choices are required'],
    validate: {
      validator: function(choices) {
        return choices.length >= 2;
      },
      message: 'At least 2 choices are required'
    }
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
    trim: true
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

// Add index for faster subject-based queries
cardSchema.index({ subject: 1 });

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;