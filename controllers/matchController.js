const Match = require('../models/Match');
const User = require('../models/User');
const mongoose = require('mongoose');

class MatchController {

  static async likeUser(req, res) {
    try {
      const meId = req.user._id;
      const { targetId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(targetId)) return res.status(400).json({ error: 'Invalid id' });
      if (meId.equals(targetId)) return res.status(400).json({ error: 'You cannot like yourself' });

      const target = await User.findById(targetId);
      if (!target) return res.status(404).json({ error: 'User not found' });


      const me = await User.findById(meId);
      if (!me.likes.includes(targetId)) {
        me.likes.push(targetId);
        await me.save();
      }

    
      const mutual = target.likes.includes(meId);
      if (mutual) {
    
        const usersPair = [meId.toString(), targetId.toString()].sort();
        const pairKey = usersPair.join('_');

        let match = await Match.findOne({ users: { $all: usersPair } });
        if (!match) {
          match = await Match.create({ users: usersPair });
        
          me.matches.push(match._id);
          target.matches.push(match._id);
          await me.save();
          await target.save();
        }
        return res.json({ matched: true, match });
      }

      res.json({ liked: true, mutual: false });
    } catch (err) {
      console.error('likeUser error', err);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async getMatches(req, res) {
    try {
      const me = await User.findById(req.user._id).populate({
        path: 'matches',
        populate: { path: 'users', select: 'username profile' }
      });
      res.json(me.matches);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
}

module.exports = MatchController;
