// Importing models
const { User, Thought } = require('../models');

module.exports = {
  // Get All Thoughts
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find()
        .select("-__v")
        .populate('reactions');
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Get One Thought
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
  
        if (!thought) {
          return res.status(404).json({ message: 'No Thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Create New Thought
    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
  
        if (!user) {
          return res.status(404).json({
            message: 'Thought created, but found no user with that ID',
          })
        }
  
        res.json('Created the Thought 🎉');
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    // Update One Thought
    async updateThought(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No Thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    // Delete One Thought
    async deleteThought(req, res) {
      try {
        const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
  
        if (!thought) {
          return res.status(404).json({ message: 'No Thought with this id!' });
        }
  
        const user = await User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
  
        if (!user) {
          return res.status(404).json({
            message: 'Thought created but no user with this id!',
          });
        }
  
        res.json({ message: 'Thought successfully deleted!' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
  //  Adding A Reaction To Thought
    async addReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
        console.log(err)
      }

    },
    // Deleting A Reaction From Thought
    async removeReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
          );

    
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
    
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  };
  
