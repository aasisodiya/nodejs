// Import the module from s3.js
var s3op = require('./aws-s3');

exports.handler = async (event) => {
    var bucketName = "test-bucket-delete-this"
    var objectNamesArray = ["test1.txt", "test2.txt"];
    var output
    await s3op.createBucket(bucketName);
    await s3op.putObject(bucketName, "test1.txt", "some body1");
    await s3op.putObject(bucketName, "test2.txt", "some body2");
    await s3op.putObject(bucketName, "test3.txt", "some body3");
    output = await s3op.listObjectsV2(bucketName);
    console.log(output);
    output = await s3op.getObject(bucketName, "test1.txt");
    console.log(output);
    await s3op.deleteObject(bucketName, "test3.txt");
    await s3op.deleteObjects(bucketName, objectNamesArray);
    await s3op.deleteBucket(bucketName);
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};

// exports.handler(0); // Use for local execution
