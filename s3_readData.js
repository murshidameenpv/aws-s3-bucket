import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import { dragonData } from './Data/dragons.js';
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.ACCESS_SECRET_KEY,
  region: 'ap-south-1'
});

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const ssm = new AWS.SSM();

async function readDragons() {
    const fileName = 'dragonData.json';
    const bucketName = 'my-bucket-77da2bcd-4f05-45eb-8aa7-969648e7dc3f';
    return readDragonsFromS3(bucketName,fileName);
}

// async function getFileName() {
//     const fileNameParams = {
//         Name: 'dragonData',
//         WithDecryption: false
//     };
//     const promise = await ssm.getParameter(fileNameParams).promise()
//     return promise.Parameter.Value;
// }
// async function getBucketName() {
//     const bucketNameParams = {
//         Name: 'dragondata-bucket',
//         WithDecryption: false
//     };
//     const promise = await ssm.getParameter(bucketNameParams).promise()
//     return promise.Parameter.Value;
// }
function readDragonsFromS3(bucketName, fileName) {
    s3.selectObjectContent({
        Bucket: bucketName,
        Expression: 'select * from s3Object s',
        ExpressionType: 'SQL',
        Key: fileName,
        InputSerialization: {
            JSON: {
                Type: 'DOCUMENT'
            }
        },
        OutputSerialization: {
            JSON: {}
        }
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            handleData(data)
        }
    }
    );
}

function handleData(data) {
    data.Payload.on('data', (event) => {
        if (event.Records) {
            console.log(event.Records.Payload.toString());
        }
    });
}
readDragons();