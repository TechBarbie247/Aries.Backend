const User = require('../models/User');

class UserController {
  static async getMe(req, res) {
    try {
      const user = await User.findById(req.user._id).select('-password').populate('matches');
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async updateProfile(req, res) {
    try {
      const updates = req.body;
      const allowed = ['profile']; 
      const data = {};
      if (updates.profile) data.profile = updates.profile;

      const user = await User.findByIdAndUpdate(req.user._id, data, { new: true }).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async browseProfiles(req, res) {
    try {
      
      const me = req.user;
      const query = { _id: { $ne: me._id } };
      const profiles = await User.find(query).select('-password');
      res.json(profiles);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
}

module.exports = UserController;
