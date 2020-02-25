const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donationSchema = new Schema({
  username: { type: String, required: true },
  message: { type: String, required: false },
  amount: { type: Number, required: true },
  media_url: { type: String, required: false },
  start_time: { type: Number, required: false },
  played: { type: Boolean, default: false }
}, {
  timestamps: true,
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;