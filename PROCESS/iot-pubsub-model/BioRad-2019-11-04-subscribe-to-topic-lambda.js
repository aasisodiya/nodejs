// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Set the region 
AWS.config.update({ region: 'us-west-2' });

// Create DynamoDB document client
var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
    var statusCode = 200;
    var oktaUserId;
    var topics;
    console.log(event);
    if (event.httpMethod == 'GET') {
        console.log("Get Data");
        if (event.queryStringParameters != null && event.queryStringParameters.oktaUserId != null) {
            oktaUserId = event.queryStringParameters.oktaUserId;
        } else if (event.body != null) {
            let mainData = JSON.parse(event.body);
            if (mainData.oktaUserId != null) {
                oktaUserId = mainData.oktaUserId;
            }
        }
        var params = {
            TableName: 'UserSubscriptions',
            Key: { 'oktaUserId': oktaUserId.toString() }
        };
        await docClient.get(params, function (err, data) {
            if (err) {
                console.log("Error", err);
                statusCode = 400;
            } else {
                if (data != null && data.Item != null) {
                    console.log(data);
                    console.log("Success", data.Item.topics);
                    topics = data.Item.topics;
                } else {
                    statusCode = 400;
                }
            }
        }).promise();
    } else if (event.httpMethod == 'POST') {
        var topics;
        console.log(event.body);
        if (event.body != null) {
            console.log(event)
            console.log(event.body)
            let mainData = JSON.parse(event.body);
            if (mainData.oktaUserId != null && mainData.topics != null) {
                oktaUserId = mainData.oktaUserId;
                topics = mainData.topics;
            }
        }
        var params = {
            TableName: 'UserSubscriptions',
            Key: { 'oktaUserId': oktaUserId.toString() }
        };
        await docClient.get(params, function (err, data) {
            if (err) {
                console.log("Error", err);
                statusCode = 400;
            } else {
                if (data != null && data.Item != null) {
                    console.log(data);
                    console.log("Success", data.Item.topics);
                    topics.concat(data.Item.topics);
                    topics = [...new Set(topics)];
                } else {
                    statusCode = 400;
                }
            }
        }).promise();
        console.log("Upload Data" + topics);
        params = {
            TableName: 'UserSubscriptions',
            Item: {
                'oktaUserId': oktaUserId,
                'topics': topics
            }
        };
        await docClient.put(params, function (err, data) {
            if (err) {
                console.log("Error", err);
                statusCode = 400;
            } else {
                console.log("Upload Success");
            }
        }).promise();
    }
    const response = {
        statusCode: statusCode,
        body: JSON.stringify(topics),
    };
    console.log("Response" + response.toString())
    console.log(response);
    return response;
};
