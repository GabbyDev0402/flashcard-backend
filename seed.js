const mongoose = require('mongoose');
const Card = require('./models/Card');
require('dotenv').config();

const sampleCards = [
  {
    subject: "General Education",
    question: "What is the capital of France?",
    choices: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    subject: "General Education",
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    subject: "Mathematics",
    question: "What is 15 × 8?",
    choices: ["110", "120", "125", "130"],
    answer: "120"
  },
  {
    subject: "Mathematics",
    question: "What is the square root of 144?",
    choices: ["10", "11", "12", "13"],
    answer: "12"
  },
  {
    subject: "Science",
    question: "What is the chemical symbol for gold?",
    choices: ["Go", "Gd", "Au", "Ag"],
    answer: "Au"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing cards (optional)
    await Card.deleteMany({});
    console.log('🗑️ Cleared existing cards');
    
    // Insert sample cards
    const insertedCards = await Card.insertMany(sampleCards);
    console.log(`✅ Inserted ${insertedCards.length} sample cards`);
    
    // Display inserted cards
    insertedCards.forEach((card, index) => {
      console.log(`${index + 1}. [${card.subject}] ${card.question}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();