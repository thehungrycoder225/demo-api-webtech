const mongoose = require('mongoose');

// This is the "Rule Book" for a Room
const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number, // Number: 101
    required: true,
    unique: true, // No duplicate room numbers allowed
    min[100, 'Room number must be 3 digits'], // Custom error message if room number < 100
  },
  type: {
    type: String, // Text: "Single", "Suite"
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min:[0, 'Price cannot be negative'], // Custom error message if price < 0
  },
  isBooked: {
    type: Boolean, // True or False
    default: false, // Assume room is empty (False) at first
  },
  features: [String], // A list of words: ["WiFi", "TV", "Bath"]
});

module.exports = mongoose.model('Room', roomSchema);
