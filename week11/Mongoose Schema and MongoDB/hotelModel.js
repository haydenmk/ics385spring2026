const mongoose = require('mongoose');
const { Schema } = mongoose;

const hotelSchema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;