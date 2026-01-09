var AWS = require('aws-sdk');
var bucketInstance = new AWS.S3();

// Lambda code that will run in interval on s3 bucket and
// will check and delete the respective file if its size is 0
// Requirements----------------------------------------------
// 1. Lambda Needs to be in the same region of the S3 Bucket
// 2. Attach Role that allows lambda to make changes to S3

// InComplete!!!!!!!!!!!!!!!!!!!!!!!
// InComplete!!!!!!!!!!!!!!!!!!!!!!!
// InComplete!!!!!!!!!!!!!!!!!!!!!!!
// InComplete!!!!!!!!!!!!!!!!!!!!!!!
// InComplete!!!!!!!!!!!!!!!!!!!!!!!

exports.handler = async (event) => {
    var objectsinBucket = await getListObjects("mumbai-temp-bucket", null);
    console.log(objectsinBucket);
    const response = {
        statusCode: 200,
        body: JSON.stringify('File Processed!'),
    };
    return response;
};

// Function to Delete File from S3 Bucket
async function deleteFile(bucketname, filename) {
    console.log("Deleting file: " + filename + " from bucket: " + bucketname);
    var params = {
        Bucket: bucketname,
        Key: filename
    };
    await bucketInstance.deleteObject(params, function (err, data) {
        if (data) {
            console.log("File deleted successfully");
        }
        else {
            console.log("Check if you have sufficient permissions : " + err);
        }
    }).promise();
}

// Function to fetch list of objects in given S3 Bucket
async function getListObjects(bucketname, maxKeys) {
    var listObjects
    var params = {
        Bucket: bucketname,
        // MaxKeys: maxKeys //(use this only if you need some n no. of files)
    };
    if (maxKeys != null) {
        params.MaxKeys = maxKeys;
    }
    params.MaxKeys = maxKeys;
    await bucketInstance.listObjectsV2(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            // console.log(data.Contents);           // successful response
            if (data.IsTruncated == true) {
                console.log("All files aren't processed!");
            }
            listObjects = data;
        }
    }).promise();
    return listObjects;
}
// // Sample response for listObjectV2
// {
//     IsTruncated: false,
//     Contents: [
//         {
//         Key: 'cmd.txt',
//         LastModified: 2020-01-20T09: 27: 28.000Z,
//         ETag: '"2d8236ce5e32082dd4d8a8eddf11ef9b"',
//         Size: 414,
//         StorageClass: 'STANDARD'
//         },
//         {
//         Key: 'folder/cmd.txt',
//         LastModified: 2020-01-20T09: 27: 32.000Z,
//         ETag: '"2d8236ce5e32082dd4d8a8eddf11ef9b"',
//         Size: 414,
//         StorageClass: 'STANDARD'
//         },
//         {
//         Key: 'folder/one.txt',
//         LastModified: 2020-01-20T09: 12: 15.000Z,
//         ETag: '"c4ca4238a0b923820dcc509a6f75849b"',
//         Size: 1,
//         StorageClass: 'STANDARD'
//         },
//         {
//         Key: 'one.txt',
//         LastModified: 2020-01-20T08: 55: 49.000Z,
//         ETag: '"c4ca4238a0b923820dcc509a6f75849b"',
//         Size: 1,
//         StorageClass: 'STANDARD'
//         }
//     ],
//     Name: 'mumbai-temp-bucket',
//     Prefix: '',
//     MaxKeys: 100000,
//     CommonPrefixes: [],
//     KeyCount: 4
// }