var AWS = require("aws-sdk");

// Lambda code that will trigger on S3 file upload event and
// will delete the respective file if its size is 0
// Requirements----------------------------------------------
// 1. Lambda Needs to be in the same region of the S3 Bucket
// 2. Attach Role that allows lambda to make changes to S3
// 3. Add Event Trigger on S3 File Upload to trigger this lambda

exports.handler = async (event) => {
  console.log("Size of the uploaded file: " + event.Records[0].s3.object.size);
  if (event.Records[0].s3.object.size == 0) {
    await deleteFile(
      event.Records[0].s3.bucket.name,
      event.Records[0].s3.object.key
    );
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify("File Processed!"),
  };
  return response;
};

// Function to Delete File from S3 Bucket
async function deleteFile(bucketname, filename) {
  console.log("Deleting file: " + filename + " from bucket: " + bucketname);
  var bucketInstance = new AWS.S3();
  var params = {
    Bucket: bucketname,
    Key: filename,
  };
  await bucketInstance
    .deleteObject(params, function (err, data) {
      if (data) {
        console.log("File deleted successfully");
      } else {
        console.log("Check if you have sufficient permissions : " + err);
      }
    })
    .promise();
}

// Sample Event Body : event.Records[0].s3.object.size
// console.log(JSON.stringify(event));
//     {
//     "Records": [
//         {
//             "eventVersion": "2.1",
//             "eventSource": "aws:s3",
//             "awsRegion": "ap-south-1",
//             "eventTime": "2020-01-20T07:19:24.958Z",
//             "eventName": "ObjectCreated:Put",
//             "userIdentity": {
//                 "principalId": "AWS:AROA54HWSISCORPVJH5H:akash_sisodiya@siscorp.com"
//             },
//             "requestParameters": {
//                 "sourceIPAddress": "125.18.33.122"
//             },
//             "responseElements": {
//                 "x-amz-request-id": "DC92D0404021942E",
//                 "x-amz-id-2": "rNCA2vh2BK4zwsIz40DZ9Vv0iToa8TmmB4NmjeAVufBbzZfovb0+5G9q91upFZBEh8WqvWJ9o/s="
//             },
//             "s3": {
//                 "s3SchemaVersion": "1.0",
//                 "configurationId": "995d8294-9e7f-43a9-b1c7-bd9fd1d0e8e7",
//                 "bucket": {
//                     "name": "mumbai-temp-bucket",
//                     "ownerIdentity": {
//                         "principalId": "A21HO0LS8Z8EI5"
//                     },
//                     "arn": "arn:aws:s3:::mumbai-temp-bucket"
//                 },
//                 "object": {
//                     "key": "one.txt",
//                     "size": 1,
//                     "eTag": "c4ca4238a0b923820dcc509a6f75849b",
//                     "sequencer": "005E25547CE93EAE54"
//                 }
//             }
//         }
//     ]
// }
