const geoFormat = (addressObj, apiKey) => {
  let { address1, address2, town, city, postcode} = addressObj;
  console.log(address2);
  let address1New = '';
  let address2New = '';
  let townNew = '';
  let cityNew = '';
  let postcodeNew = '';


  if (typeof address1 !== 'undefined') {
    address1 = address1.replace(/ /g, '+');
  } else {
    address1 = '';
  }
  if (typeof address2 !== 'undefined') {
    address2 = address2.replace(/ /g, '+');
  } else {
    address2 = '';
  }
  if (typeof town !== 'undefined') {
    town = town.replace(/ /g, '+');
  }
  if (typeof city !== 'undefined') {
    city = city.replace(/ /g, '+');
  }
  if (typeof postcode !== 'undefined') {
    postcode = postcode.replace(/ /g, '+');
  }

  var mapURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address1}+${address2},
+${town}+${city},+${postcode}&key=${apiKey}`;
  console.log(mapURL);

  return mapURL;
}

exports.geoFormat = geoFormat;
