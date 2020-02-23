// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'ap-south-1' });

// Create S3 service object
var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

module.exports.createBucket = async function (bucketName) {
    var success = false;
    // Create the parameters for calling createBucket
    // var params = {
    //     Bucket: 'STRING_VALUE', /* required */
    //     ACL: private | public - read | public - read - write | authenticated - read,
    //     CreateBucketConfiguration: {
    //         LocationConstraint: EU | eu - west - 1 | us - west - 1 | us - west - 2 | ap - south - 1 | ap - southeast - 1 | ap - southeast - 2 | ap - northeast - 1 | sa - east - 1 | cn - north - 1 | eu - central - 1
    //     },
    //     GrantFullControl: 'STRING_VALUE',
    //     GrantRead: 'STRING_VALUE',
    //     GrantReadACP: 'STRING_VALUE',
    //     GrantWrite: 'STRING_VALUE',
    //     GrantWriteACP: 'STRING_VALUE',
    //     ObjectLockEnabledForBucket: true || false
    // };
    var bucketParams = {
        Bucket: bucketName,
        ACL: 'public-read'
    };
    // call S3 to create the bucket
    await s3.createBucket(bucketParams).promise().then((data) => {
        console.log('Success: Bucket [' + bucketName + '] created');
        success = true;
    }).catch((err) => {
        console.log('Error: Bucket [' + bucketName + '] creation failed');
        console.log(err);
    });
    return success;
}

module.exports.deleteBucket = async function (bucketName) {
    var success = false;
    // Create the parameters for calling deleteBucket
    var bucketParams = {
        Bucket: bucketName,
    };
    // call S3 to delete the bucket
    await s3.deleteBucket(bucketParams).promise().then((data) => {
        console.log('Success: Bucket [' + bucketName + '] deleted');
        success = true;
    }).catch((err) => {
        console.log('Error: Bucket [' + bucketName + '] deletion failed');
        console.log(err);
    });
    return success;
}

module.exports.listObjectsV2 = async function (bucketName) {
    var listOfObjects;
    // Create the parameters for calling listObject
    // var params = {
    //     Bucket: 'STRING_VALUE', /* required */
    //     Delimiter: 'STRING_VALUE',
    //     EncodingType: url,
    //     Marker: 'STRING_VALUE',
    //     MaxKeys: 'NUMBER_VALUE',
    //     Prefix: 'STRING_VALUE',
    //     RequestPayer: requester
    // };
    var params = {
        Bucket: bucketName, /* required */
    };
    // call S3 to listObject in the bucket
    await s3.listObjectsV2(params).promise().then((data) => {
        console.log('Success: List of Objects from bucket [' + bucketName + ']');
        listOfObjects = data;
    }).catch((err) => {
        console.log('Error: fetching List of Objects from bucket [' + bucketName + ']');
        console.log(err);
    });
    return listOfObjects;
}

module.exports.putObject = async function (bucketName, objectKey, objectBody) {
    var success = false;
    // var params = {
    //     Bucket: 'STRING_VALUE', /* required */
    //     Key: 'STRING_VALUE', /* required */
    //     ACL: private | public - read | public - read - write | authenticated - read | aws - exec - read | bucket - owner - read | bucket - owner - full - control,
    //     Body: Buffer.from('...') || 'STRING_VALUE' || streamObject,
    //     CacheControl: 'STRING_VALUE',
    //     ContentDisposition: 'STRING_VALUE',
    //     ContentEncoding: 'STRING_VALUE',
    //     ContentLanguage: 'STRING_VALUE',
    //     ContentLength: 'NUMBER_VALUE',
    //     ContentMD5: 'STRING_VALUE',
    //     ContentType: 'STRING_VALUE',
    //     Expires: new Date || 'Wed Dec 31 1969 16:00:00 GMT-0800 (PST)' || 123456789,
    //     GrantFullControl: 'STRING_VALUE',
    //     GrantRead: 'STRING_VALUE',
    //     GrantReadACP: 'STRING_VALUE',
    //     GrantWriteACP: 'STRING_VALUE',
    //     Metadata: {
    //         '<MetadataKey>': 'STRING_VALUE',
    //         /* '<MetadataKey>': ... */
    //     },
    //     ObjectLockLegalHoldStatus: ON | OFF,
    //     ObjectLockMode: GOVERNANCE | COMPLIANCE,
    //     ObjectLockRetainUntilDate: new Date || 'Wed Dec 31 1969 16:00:00 GMT-0800 (PST)' || 123456789,
    //     RequestPayer: requester,
    //     SSECustomerAlgorithm: 'STRING_VALUE',
    //     SSECustomerKey: Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
    //     SSECustomerKeyMD5: 'STRING_VALUE',
    //     SSEKMSEncryptionContext: 'STRING_VALUE',
    //     SSEKMSKeyId: 'STRING_VALUE',
    //     ServerSideEncryption: AES256 | aws: kms,
    //     StorageClass: STANDARD | REDUCED_REDUNDANCY | STANDARD_IA | ONEZONE_IA | INTELLIGENT_TIERING | GLACIER | DEEP_ARCHIVE,
    //     Tagging: 'STRING_VALUE',
    //     WebsiteRedirectLocation: 'STRING_VALUE'
    // };
    var params = {
        Bucket: bucketName,
        Key: objectKey,
        Body: objectBody
    }
    await s3.putObject(params).promise().then((data) => {
        console.log('Success: Object [' + objectKey + '] uploaded to bucket [' + bucketName + ']');
        success = true;
    }).catch((err) => {
        console.log('Error: Object [' + objectKey + '] failed to upload to bucket [' + bucketName + ']');
        console.log(err);
    });
    return success;
}

module.exports.getObject = async function (bucketName, objectKey) {
    var object
    // var params = {
    //     Bucket: 'STRING_VALUE', /* required */
    //     Key: 'STRING_VALUE', /* required */
    //     IfMatch: 'STRING_VALUE',
    //     IfModifiedSince: new Date || 'Wed Dec 31 1969 16:00:00 GMT-0800 (PST)' || 123456789,
    //     IfNoneMatch: 'STRING_VALUE',
    //     IfUnmodifiedSince: new Date || 'Wed Dec 31 1969 16:00:00 GMT-0800 (PST)' || 123456789,
    //     PartNumber: 'NUMBER_VALUE',
    //     Range: 'STRING_VALUE',
    //     RequestPayer: requester,
    //     ResponseCacheControl: 'STRING_VALUE',
    //     ResponseContentDisposition: 'STRING_VALUE',
    //     ResponseContentEncoding: 'STRING_VALUE',
    //     ResponseContentLanguage: 'STRING_VALUE',
    //     ResponseContentType: 'STRING_VALUE',
    //     ResponseExpires: new Date || 'Wed Dec 31 1969 16:00:00 GMT-0800 (PST)' || 123456789,
    //     SSECustomerAlgorithm: 'STRING_VALUE',
    //     SSECustomerKey: Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
    //     SSECustomerKeyMD5: 'STRING_VALUE',
    //     VersionId: 'STRING_VALUE'
    // };
    var params = {
        Bucket: bucketName,
        Key: objectKey
    }
    await s3.getObject(params).promise().then((data) => {
        console.log('Success: Get Object[' + objectKey + '] from Bucket [' + bucketName + ']');
        object = data;
    }).catch((err) => {
        console.log('Error: Get Object[' + objectKey + '] from Bucket [' + bucketName + ']');
        console.log(err);
    });
    return object;
}

module.exports.deleteObject = async function (bucketName, objectKey) {
    var success = false;
    // var params = {
    //     Bucket: 'STRING_VALUE', /* required */
    //     Key: 'STRING_VALUE', /* required */
    //     BypassGovernanceRetention: true || false,
    //     MFA: 'STRING_VALUE',
    //     RequestPayer: requester,
    //     VersionId: 'STRING_VALUE'
    // };
    var params = {
        Bucket: bucketName,
        Key: objectKey
    }
    await s3.deleteObject(params).promise().then((data) => {
        console.log('Success: Deleted Object [' + objectKey + '] from Bucket [' + bucketName + ']');
        success = true;
    }).catch((err) => {
        console.log('Error: Failed to Delete Object [' + objectKey + '] from Bucket [' + bucketName + ']');
        console.log(err);
    });
    return success;
}

module.exports.deleteObjects = async function (bucketName, objectKeysArray) {
    var success = false;
    // var params = {
    //     Bucket: 'STRING_VALUE', /* required */
    //     Delete: { /* required */
    //         Objects: [ /* required */
    //             {
    //                 Key: 'STRING_VALUE', /* required */
    //                 VersionId: 'STRING_VALUE'
    //             },
    //             /* more items */
    //         ],
    //         Quiet: true || false
    //     },
    //     BypassGovernanceRetention: true || false,
    //     MFA: 'STRING_VALUE',
    //     RequestPayer: requester
    // };
    var objects = [];
    for (let index = 0; index < objectKeysArray.length; index++) {
        const element = objectKeysArray[index];
        var object = {
            Key: element
        };
        objects[objects.length] = object;
    }
    var params = {
        Bucket: bucketName,
        Delete: {
            Objects: objects,
            Quiet: false
        }
    }
    await s3.deleteObjects(params).promise().then((data) => {
        console.log('Success: Deleted Objects from Bucket [' + bucketName + ']');
        success = true;
    }).catch((err) => {
        console.log('Error: Delete Objects from Bucket [' + bucketName + ']');
        console.log(err);
    });
    return success;
}
