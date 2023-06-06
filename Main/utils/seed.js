// Seed Data
const { connect, connection } = require('mongoose');
const { User, Thought } = require('../models');
const { userDb, thoughtDb, reactionDb } = require('./data');

const seedDatabase = async () => {
  try {
    await connect('mongodb://127.0.0.1:27017/socialDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database');

    await User.deleteMany({});
    await Thought.deleteMany({});

  
    const users = await User.insertMany(userDb);

    const frank = users.find(user => user.userName === 'Frank');
    const james = users.find(user => user.userName === 'James');

    frank.friends.push(james._id);
    james.friends.push(frank._id);

    await frank.save();
    await james.save();

    for (const thoughtData of thoughtDb) {
      const thought = new Thought(thoughtData);
      await thought.save();
    }

    console.log('Seed data inserted successfully');

    // Disconnect from the database
    await connection.close();
    console.log('Disconnected from the database');
  } catch (error) {
    console.error('Seed script encountered an error:', error);
  }
};

seedDatabase();
