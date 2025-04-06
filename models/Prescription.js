const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  aiSummary: {
    type: String,
    default: ''
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  qrcode: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);