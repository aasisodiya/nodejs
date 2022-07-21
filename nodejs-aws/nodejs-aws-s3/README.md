# S3 NodeJS Operations

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs.aws.s3&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs.aws.s3)

- [S3 NodeJS Operations](#s3-nodejs-operations)
  - [**Important Note:** All methods are simplified versions of the actual code](#important-note-all-methods-are-simplified-versions-of-the-actual-code)
  - [Steps to get started](#steps-to-get-started)
    - [Step 1: Import S3 Module](#step-1-import-s3-module)
    - [Step 2: Call your method *(**Important:** Use await for all calls)*](#step-2-call-your-method-important-use-await-for-all-calls)
  - [Functions Descriptions](#functions-descriptions)
    - [Note to Self](#note-to-self)
  - [Reference](#reference)

## **Important Note:** All methods are simplified versions of the actual code

For simplicity I have compiled all aws s3 operations functions into methods that are simplified versions of the actual code. This way you can use/perform basic operations directly. But if required to perform complex operations, I have also provided the complete parameters body in comment in every function of s3.js file. Feel free to modify them as per your requirement.

> Make sure to update the region in aws-s3.js file, currently it is set to mumbai region.

## Steps to get started

### Step 1: Import S3 Module

```nodejs
// Import the module from s3.js
var s3op = require('./aws-s3');
```

### Step 2: Call your method *(**Important:** Use await for all calls)*

```nodejs
var bucketName = "test-bucket-delete-later-22"
await s3op.createBucket(bucketName);
```

## Functions Descriptions

Function - createBucket, putObject, deleteObject, deleteObjects and deleteBucket return true if everything goes well, else they return false if any error occurs. If required you can also put a check on function as shown in example below:

```nodejs
var flag = await s3op.deleteObject(bucketName, "test3.txt");
if(flag) {
    statusMessage = "File deleted!"
} else {
    statusMessage = "File not deleted!"
}
```

### Note to Self

- What is "Quiet" Key in params JSON of `deleteObjects` function?

    Answer: The operation supports two modes for the response: verbose and quiet. By default, the operation uses verbose mode in which the response includes the result of deletion of each key in your request. In quiet mode the response includes only keys where the delete operation encountered an error. For a successful deletion, the operation does not return any information about the delete in the response body.

- Function `deleteBucket` doesn't work if Bucket contains any object

- Be cautious while writing functions from aws-sdk, sometime functions executes twice.

    Avoid writing functions this way (function snippets that are mentioned in aws documents)

    ```nodejs
    await s3.listObjectsV2(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    }).promise();
    ```

    Instead write like this

    ```nodejs
    await s3.listObjectsV2(params).promise().then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log('Error: fetching List of Objects from bucket [' + bucketName + ']');
        console.log(err);
    });
    ```

## Reference

- [AWS NodeJS Github](https://github.com/aws/aws-sdk-js#in-nodejs-1)
- [AWS NodeJS Documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)
- [S3 Sample Code in NodeJS](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html)
- [Lambda Double Execution Issue](https://stackoverflow.com/questions/47635928/node-js-aws-promise-triggered-twice)
