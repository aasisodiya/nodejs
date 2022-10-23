"use strict";
const AWS = require("aws-sdk");


// DynamoDB Get Example
exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({
        apiVersion: "2012-10-08"
    });
    const documentClient = new AWS.DynamoDB.DocumentClient({
        region: "us-east-1",
    });
    const params = {
        TableName: "Users",
        Key: {
            id: "12345",
        },
    };

    try {
        const data = await documentClient.get(params).promise();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

// DynamoDB Put Example
("use strict");
const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({
        apiVersion: "2012-10-08"
    });
    const documentClient = new AWS.DynamoDB.DocumentClient({
        region: "us-east-1",
    });
    const params = {
        TableName: "Users",
        Item: {
            id: "12345",
            firstname: "Akash",
            lastname: "Sisodiya",
        },
    };

    try {
        const data = await documentClient.put(params).promise();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};