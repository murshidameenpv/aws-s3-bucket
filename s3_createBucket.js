import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

AWS.config.update({
  accessKeyId:process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.ACCESS_SECRET_KEY,
  region: 'ap-south-1'
});


const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
// Create the parameters for calling createBucket
// your code, you’re trying to get the bucket name from process.argv[2], which represents the third command line argument when running your script
//node s3_createBucket.js my-bucket
var bucketParams = {
  Bucket : 'my-bucket-' + uuidv4()
};

// call S3 to create the bucket
s3.createBucket(bucketParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Location);
  }
});