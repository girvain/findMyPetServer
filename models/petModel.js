const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
  },
  color1: {
    type: String,
  },
  color2: {
    type: String,
  },
  description: {
    type: String,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  town: {
    type: String,
  },
  city: {
    type: String,
  },
  postcode: {
    type: String,
  },
  missingFrom: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  lat: {
    type: String,
  },
  lng: {
    type: String,
  },
  petPictureURL: {
    type: String,
  },
  iconUrl: {
    type: String,
  },
});

var Pet = mongoose.model('Pet', PetSchema);
module.exports = Pet;
