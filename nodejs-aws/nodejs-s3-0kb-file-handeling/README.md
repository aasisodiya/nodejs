# Handle 0kb File In S3

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs.aws.s3-0kb-file&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs.aws.s3-0kb-file)

- [Handle 0kb File In S3](#handle-0kb-file-in-s3)
  - [Code](#code)
    - [Some points to keep note of](#some-points-to-keep-note-of)
    - [Sample Code](#sample-code)

You can use below code to handle 0kb file uploads to S3. Below code simply utilizes the event based trigger that gets thrown when a file gets uploaded to S3 Bucket. Now on this Event you can configure a Lambda, which will take care of checking file size. Which you can set to anything that you desire. Now if the file size is 0kb, or less than that of size specified then it will be deleted from the S3 bucket.

## Code

Below we have a Lambda code in nodejs, that you will have to configure to trigger when ever there is an upload event of any file to S3 Bucket i.e. file upload event. And when it gets triggered it will delete the respective file if its size is 0kb.

### Some points to keep note of

1. Lambda Needs to be in the same region as of that of S3 Bucket
2. Attach Role that allows lambda to make changes to S3 Bucket
3. Add Event Trigger on S3 File Upload to trigger below lambda

### Sample Code

```nodejs
var AWS = require("aws-sdk");

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
async function deleteFile(bucketName, filename) {
  console.log("Deleting file: " + filename + " from bucket: " + bucketName);
  var bucketInstance = new AWS.S3();
  var params = {
    Bucket: bucketName,
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
```

[Click here for above sample code](./index.js)

---

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs&label=aasisodiya/nodejs&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs)
