const chai = require('chai');
const expect = chai.expect;
const geoformatter = require('../utils/geoFormatter');

describe('GeoFormatter', function() {
  let stub = {};
  beforeEach(function() {
    stub = {
      id: '1',
      name: 'Gary',
      species: 'Dog',
      breed: 'Shitsu',
      color1: 'black',
      color2: 'white',
      description:
        'Dangerious dog, do not approach. He will bite when he is scared so phone if spotted',
      missingFrom: '13/01/2020',
      address1: '22 Wingate Crescent',
      address2: 'Calderwood',
      town: 'East Kilbride',
      city: 'Glasgow',
      postcode: 'G743SU',
      email: 'gavin@hotmail.co.uk',
      phoneNo: '07587083744',
      lat: 55.777005,
      lng: -4.182441,
      iconUrl: '../assets/pawprint.png',
    };
  });

  const apiKey = 'AIzaSyBTeTxxRv1A90-82vUJ0H-pKNHTNx7DE_A';

  it('should return a full string with all address values that works with api', function() {
    expect(geoformatter.geoFormat(stub, apiKey)).to.be.a('string');
  });

  it('test with a missing street name and postcode, should return the co-ordinates of the local area', function() {
    stub.address1 = '';
    stub.postcode = '';
    expect(geoformatter.geoFormat(stub, apiKey)).to.be.a('string');
  });

  it('should not throw any errors with empty strings', function() {
    stub.address2 = '';
    expect(geoformatter.geoFormat(stub, apiKey)).to.be.a('string');
  });

  it('test with undefined values', function() {
    stub.address2 = undefined;
    expect(geoformatter.geoFormat(stub, apiKey)).to.be.a('string');
  });
});
