const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require('uuid/v4');
const processResponse = require('./process-response.js');
const TABLE_NAME = process.env.TABLE_NAME,
    PRIMARY_KEY = process.env.PRIMARY_KEY,
    IS_CORS = true;

exports.handler = (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return Promise.resolve(processResponse(IS_CORS));
    }
    let columnName = decodeURIComponent(event.pathParameters.res) // User_Id
    let qVal = decodeURIComponent(event.pathParameters.id) // some user id
    if (!userid || !qVal) {
        return Promise.resolve(processResponse(IS_CORS, 'invalid', 400));
    }
    var params = {
        TableName: TABLE_NAME,
        FilterExpression: '#columnName = :qVal',
        ExpressionAttributeValues: { ':qVal': qVal },
        ExpressionAttributeNames: { "#columnName": columnName }
    };
    return dynamoDb.scan(params)
        .promise()
        .then(response => processResponse(IS_CORS, response.Item))
        .catch(err => {
            console.log(err)
            return processResponse(IS_CORS, "dynamo-error", 500);
        });
};
