import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import { dragonData } from './dragons.js';
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.ACCESS_SECRET_KEY,
  region: 'ap-south-1'
});

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const dragonDataStr = JSON.stringify(dragonData);

// Set up the parameters for the upload
const uploadParams = {
  Bucket: 'my-bucket-77da2bcd-4f05-45eb-8aa7-969648e7dc3f',
  Key: 'dragonData.json',
  Body: dragonDataStr
};

// Upload the file
s3.upload(uploadParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Upload Success", data.Location);
  }
});
