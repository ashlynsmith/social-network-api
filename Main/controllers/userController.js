// Importing Models
const { User } = require('../models');

module.exports = {
  // Get All Users
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // Get One User
    async getOneUser(req, res) {
        try{
            const user = await User.findOne({ _id: req.params.userId })
            .select("-__v")
            .populate('thoughts');

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID!'})
            }

            res.json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create New User
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
      // Delete A User
      async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No User with that ID' });
          }
    
          
          res.json({ message: 'User Deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Update A User
      async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Add A Friend To User
      async addFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Delete A Friend From A User
      async  removeFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
          );
      
          if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
      
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      }
}
