var AWS = require("aws-sdk");

// This is a Lambda code, that will trigger when you
// Upload any file to S3 i.e. file upload event and
// will delete the respective file if its size is 0
// Some points to keep note of -----------------------------
// 1. Lambda Needs to be in the same region as of that of S3 Bucket
// 2. Attach Role that allows lambda to make changes to S3 Bucket
// 3. Add Event Trigger on S3 File Upload to trigger below lambda

exports.handler = async (event) => {
  console.log("Size of the uploaded file: " + event.Records[0].s3.object.size);
  // Check if file size is 0
  if (event.Records[0].s3.object.size == 0) {
    // Delete the file from S3 Bucket
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
//                 "sourceIPAddress": "x.y.z.a"
//             },
//             "responseElements": {
//                 "x-amz-request-id": "hsagsjahsnoasjioasuioa",
//                 "x-amz-id-2": "hsagsjahsnoasjioasuioa+5G9q91upFZBEh8WqvWJ9o/s="
//             },
//             "s3": {
//                 "s3SchemaVersion": "1.0",
//                 "configurationId": "ybceriueniouiowxo-9e7f-43a9-b1c7-bd9fd1d0e8e7",
//                 "bucket": {
//                     "name": "mumbai-temp-bucket",
//                     "ownerIdentity": {
//                         "principalId": "ybceriueniouiowxo"
//                     },
//                     "arn": "arn:aws:s3:::mumbai-temp-bucket"
//                 },
//                 "object": {
//                     "key": "one.txt",
//                     "size": 1,
//                     "eTag": "ybceriueniouiowxo",
//                     "sequencer": "ybceriueniouiowxo"
//                 }
//             }
//         }
//     ]
// }
