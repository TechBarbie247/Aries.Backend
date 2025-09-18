const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) return res.status(400).json({ error: 'Missing fields' });

      const exists = await User.findOne({ $or: [{ email }, { username }] });
      if (exists) return res.status(409).json({ error: 'Username or email already in use' });

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const user = await User.create({ username, email, password: hashed });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
      console.error('Register error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }
}

module.exports = AuthController;
