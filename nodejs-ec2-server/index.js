var app = require('express')();
console.log("Starting the server!");
var sampleJson = {
    "status": 200,
    "message": "Aloha!"
}
app.get('', function (req, res) {
    console.log("Processing Request")
    res.type('application/json');
    res.send(sampleJson);
});
app.get('/data', function (req, res) {
    console.log("Processing Request")
    res.type('application/json');
    res.send(sampleJson);
});
console.log("Listening on port: 9000")
app.listen(9000);