var express = require('express');
var router = express.Router();
const aws = require('aws-sdk');
const uuidv1 = require('uuid/v1');

aws.config.region = 'eu-west-2';
const S3_BUCKET = process.env.S3_BUCKET;

// router.get('/get-batman', (req, res) => {
//   const s3 = new aws.S3();
//   const fileName = req.query['file-name'];
//   const fileType = req.query['file-type'];
//   const fileId = 'batman.jpeg';
//   const s3Params = {
//     Bucket: S3_BUCKET,
//     Key: fileId,
//     Expires: 10,
//     //ContentType: fileType,
//     //ACL: 'public-read',
//   };

//   s3.getSignedUrl('getObject', s3Params, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.end();
//     }
//     const returnData = {
//       signedRequest: data,
//       url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileId}`,
//     };
//     //res.write(JSON.stringify(returnData));
//     console.log(data); // the data returned from the getSignedUrl is the data value on callback
//     //res.redirect(data);
//     //res.end();

//     res.send(JSON.stringify(data));
//     //res.send(data);
//   });
// });

router.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();

  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const fileId = uuidv1();
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileId,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileId}`,
      pictureKey: fileId,
    };
    //res.write(JSON.stringify(returnData));
    //console.log(returnData.url);
    //res.end();
    res.send(JSON.stringify(returnData));
  });
});

router.get('/get-file/:id', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const fileId = req.params.id;
  console.log(fileId);
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileId,
    Expires: 10,
    //ContentType: fileType,
    //ACL: 'public-read',
  };

  s3.getSignedUrl('getObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileId}`,
    };
    //res.write(JSON.stringify(returnData));
    console.log(data); // the data returned from the getSignedUrl is the data value on callback
    //res.redirect(data);
    //res.end();

    res.send(JSON.stringify(data));
    //res.send(data);
  });
});

module.exports = router;
