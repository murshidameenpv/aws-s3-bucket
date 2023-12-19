import dotenv from 'dotenv';
import AWS from 'aws-sdk';


dotenv.config();
const access_key_id = process.env.ACCESS_KEY_ID;
const secret_key = process.env.ACCESS_SECRET_KEY;

AWS.config.update({
  accessKeyId: access_key_id,
  secretAccessKey: secret_key,
  region: 'ap-south-1'
});


//JUST MAKE SURE CREDS ARE OK
AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log(
    "Access key:", AWS.config.credentials.accessKeyId,
    "Region: ", AWS.config.region);
  }
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