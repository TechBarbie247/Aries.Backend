const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  bio: { type: String, maxlength: 500, default: '' },
  interests: [{ type: String }],
  gender: { type: String, enum: ['male','female','non-binary','other','unspecified'], default: 'unspecified' },
  seeking: { type: String, enum: ['male','female','non-binary','any','unspecified'], default: 'any' },
  age: { type: Number, min: 18, max: 120, required: false }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3, maxlength: 30, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  profile: { type: ProfileSchema, default: () => ({}) },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
