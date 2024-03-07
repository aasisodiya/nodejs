var awsIot = require('aws-iot-device-sdk');
// Run using node filename.js
//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts 
// to connect with a client identifier which is already in use, the existing 
// connection will be terminated.
//
var device = awsIot.device({
    keyPath: 'bla-private.pem.key',
    certPath: 'bla-certificate.pem.crt',
    caPath: 'AmazonRootCA1.pem',
    clientId: 'myClient-9989',
    host: 'bla-ats.iot.us-east-1.amazonaws.com'
});

device
    .on('connect', function () {
        console.log('connected');
        device.subscribe('topic_1');
        for (let index = 0; index < 10; index++) {
            console.log('topic_' + index);
            device.subscribe('topic_' + index);
        }
        console.log('subscribed!')
        // device.publish('topic_2', JSON.stringify({ test_data: 1 }));
        // console.log('published!')
    });

// device
//     .on('close', function () {
//         console.log('close');
//     });
// device
//     .on('reconnect', function () {
//         console.log('reconnect');
//     });
// device
//     .on('offline', function () {
//         console.log('offline');
//     });
device
    .on('error', function (error) {
        console.log('error', error);
    });
// device
//     .on('message', function (topic, payload) {
//         console.log('message', topic, payload.toString());
//     });
// device
//   .on('message', function(topic, payload) {
//     console.log('message', topic, payload.toString());
//   });



//   blabla-ats.iot.us-east-1.amazonaws.com
//   Update to this thing shadow
// $aws/things/IoTThing/shadow/update
// Update to this thing shadow was accepted
// $aws/things/IoTThing/shadow/update/accepted
// Update this thing shadow documents
// $aws/things/IoTThing/shadow/update/documents
// Update to this thing shadow was rejected
// $aws/things/IoTThing/shadow/update/rejected
// Get this thing shadow
// $aws/things/IoTThing/shadow/get
// Get this thing shadow accepted
// $aws/things/IoTThing/shadow/get/accepted
// Getting this thing shadow was rejected
// $aws/things/IoTThing/shadow/get/rejected
// Delete this thing shadow
// $aws/things/IoTThing/shadow/delete
// Deleting this thing shadow was accepted
// $aws/things/IoTThing/shadow/delete/accepted
// Deleting this thing shadow was rejected
// $aws/things/IoTThing/shadow/delete/rejected
