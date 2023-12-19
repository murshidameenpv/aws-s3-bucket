import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

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
    console.log("Access key:", AWS.config.credentials.accessKeyId);
  }
});

console.log("Region: ", AWS.config.region);