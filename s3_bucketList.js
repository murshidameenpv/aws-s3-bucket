import dotenv from 'dotenv';
import AWS from 'aws-sdk';
dotenv.config();

AWS.config.update({
  accessKeyId:process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.ACCESS_SECRET_KEY,
  region: 'ap-south-1'
});



// Create S3 service object
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });


// Call S3 to list the buckets
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});