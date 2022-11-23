var mqtt = require("mqtt");
// var client = mqtt.connect(url,options)
options = {
    clientId: "mqttjs01",
    clean: true,
};
var client = mqtt.connect(
    "mqtt://blabla-ats.iot.us-east-1.amazonaws.com",
    options
);

// keyPath: 'private.pem.key',
// certPath: 'certificate.pem.crt',
// caPath: 'AmazonRootCA1.pem',
// clientId: 'myClient' + randomNo,
// host: 'blabla-ats.iot.us-east-1.amazonaws.com'
console.log(client);
client.on("connect", function () {
    console.log("connected");
});

client.end();

// Reference : http://www.steves-internet-guide.com/using-node-mqtt-client/


// {
//     "name": "mqtt",
//     "version": "1.0.0",
//     "description": "",
//     "main": "index.js",
//     "dependencies": {
//       "mqtt": "^3.0.0"
//     },
//     "devDependencies": {},
//     "scripts": {
//       "test": "echo \"Error: no test specified\" && exit 1"
//     },
//     "author": "",
//     "license": "ISC"
//   }