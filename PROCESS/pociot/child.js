var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
    keyPath: 'blabla-private.pem.key',
    certPath: 'blabla-certificate.pem.crt',
    caPath: 'AmazonRootCA1.pem',
    clientId: 'myClient-9989subscribe',
    host: 'blabla-ats.iot.us-east-1.amazonaws.com'
});
device
    .on('connect', function () {
        console.log('connected');
        for (let index = 1; index <= 100; index++) {
            device.subscribe('account/location/dept/instrument' + index);
            console.log('subscribed : ' + 'account/location/dept/instrument' + index);
        }
    });
device
    .on('message', function (topic, payload) {
        console.log('message', topic, payload.toString());
    });