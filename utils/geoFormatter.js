const geoFormat = (addressObj, apiKey) => {
  const { address1, address2, town, city, postcode} = addressObj;
  console.log(address2);
  const address1New = address1.replace(/ /g, '+');
  const address2New = address2.replace(/ /g, '+');
  const townNew = town.replace(/ /g, '+');
  const cityNew = city.replace(/ /g, '+');
  const postcodeNew = postcode.replace(/ /g, '');
  var mapURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address1New},
+${townNew},+${postcodeNew}&key=${apiKey}`;

  return mapURL;
}

exports.geoFormat = geoFormat;
