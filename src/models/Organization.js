const mongoose = require('../database');

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name_responsible: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;
