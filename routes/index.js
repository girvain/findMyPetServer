var express = require('express');
var router = express.Router();
var Pet = require('../models/petModel');
const needle = require('needle');
const geoFormat = require('../utils/geoFormatter');

// const result = require('dotenv').config();
// //module for getting enviroment variables. aws will take these automatically
// if (result.error) {
//   throw result.error;
// }

const apiKey = process.env.GOOGLE_MAP_API_KEY;

router.get('/all', (req, res, next) => {
  Pet.find({}, (err, pets) => {
    if (err) return next(err);
    console.log(pets);
    return res.json(pets);
  });
});

/**
 * Route to handle searching of pets
 */
router.post('/find', (req, res, next) => {
  console.log(req.body);
  // destructure the data to remove undefined vars
  var query = { ...req.body };
  console.log(query);
  //name: { $regex: new RegExp(req.body.name, 'i') },
  Pet.find(query, (err, result) => {
    console.log(result);
    if (err) return next(err);
    res.json(result);
  });
});

/**
 * This route takes a pet uplaod request, performs an http request to
 * get the lat and lng from the address. Then adds them to the pet object
 * and adds it to the database.
 */
router.post('/add-pet', (req, res, next) => {
  const newPet = {
    name: req.body.name,
    species: req.body.species,
    breed: req.body.breed,
    color1: req.body.color1,
    color2: req.body.color2,
    description: req.body.description,
    address1: req.body.address1,
    address2: req.body.address2,
    town: req.body.town,
    city: req.body.city,
    postcode: req.body.postcode,
    missingFrom: req.body.missingFrom,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    lat: req.body.lat,
    lng: req.body.lng,
    pictureKey: req.body.pictureKey,
    iconUrl: './assets/pawprint.png',
  };
  // use geoFormat to get the mapAPI format
  const addrDataModel = {
    address1: newPet.address1,
    address2: newPet.address2,
    town: newPet.town,
    city: newPet.city,
    postcode: newPet.postcode,
  };

  const mapURL = geoFormat.geoFormat(addrDataModel, apiKey);

  // do the http request
  needle('get', mapURL)
    .then(res => {
      //console.log(res.body.results[0]);
      console.log(newPet);
      if (res.statusCode == 200) {
        console.log(res.body.results[0].geometry.location);
        newPet.lat = res.body.results[0].geometry.location.lat;
        newPet.lng = res.body.results[0].geometry.location.lng;
        console.log(newPet);
        return res;
      }
    })
    .then(res => {
      Pet.create(newPet, (err, pet) => {
        if (err) {
          res.status = 403;
        } else {
          res.status = 200;
        }
      });
      return res;
    })
    .catch(function(err) {
      console.log('Error HTTP request to Google Map API request!');
    });
  res.json({ result: 200 });
});

// router.get('/get-geo', (req, res, next) => {
//   const number = 9;
//   const street1 = 'glen';
//   const street2 = 'doll';
//   const town1 = 'East';
//   const town2 = 'Kilbride';
//   const city = 'Glasgow';
//   const apiKey = 'AIzaSyBTeTxxRv1A90-82vUJ0H-pKNHTNx7DE_A';

//   let mapURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${number}+${street1}+${street2},
// +${town1}+${town2},+${city}&key=${apiKey}`;

//   const testUrl =
//     'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=' +
//     apiKey;

//   needle.get(mapURL, (error, res) => {
//     //console.log(res.body.results[0]);
//     if (!error && res.statusCode == 200) {
//       console.log(res.body.results[0].geometry.location);
//     }
//   });

//   // extract the address into object
//   const addrDataModel = {
//     address1: '9 glen doll',
//     address2: '',
//     town: 'east kilbride',
//     city: 'glasgow',
//     postcode: 'g743su',
//   };
//   console.log(geoFormat.geoFormat(addrDataModel, apiKey));
// });

module.exports = router;
