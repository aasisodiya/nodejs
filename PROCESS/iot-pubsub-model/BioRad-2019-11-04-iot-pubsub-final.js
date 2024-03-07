
// Load the SDK for JavaScript
var AWS = require('aws-sdk');

// Create the DynamoDB service object
var documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    // TODO implement
    console.log(event);

    // change topic format from a/b to a_b
    let topicBuilder = event.topic.split("/");
    let topic = topicBuilder.join("_");
    console.log("Topic for DB Query : " + topic);

    let userData = "";
    let querytopic = topicBuilder[0] + "_" + topicBuilder[1] + "_#";
    var params = {
        TableName: 'Subscription',
        Key: {
            "topicURL": querytopic
        }
    };
    console.log(">>>>" + querytopic);
    console.log(params);
    await documentClient.get(params, function (err, data) {
        console.log("DBop")
        if (err) console.log(err);
        else console.log(data);
        if (data != null && data.Item != null) {
            userData = data.Item.users
        }
    }).promise();
    console.log("====================================" + querytopic);
    console.log(userData);

    console.log("------------------------------------------------------------------");
    console.log(userData);
    console.log("------------------------------------------------------------------");
    // Checking Code---------------------------------------------------------------------------------

    const service = new AWS.Service({
        endpoint: 'https://lv8f791pq6.execute-api.us-west-2.amazonaws.com',
        convertResponseTypes: false,
        apiConfig: {
            metadata: {
                protocol: 'rest-json'
            },
            operations: {
                getData: {
                    http: {
                        method: 'GET',
                        requestUri: '/default/user-subscriptions?oktaUserId={uid}'
                    },
                    input: {
                        type: 'structure',
                        required: ['uid'],
                        members: {
                            'uid': {
                                type: 'string',
                                location: 'uri',
                                locationName: 'uid'
                            }
                        }
                    }
                }
            }
        }
    });

    // APi call on user and topic
    if (userData == "") {
        userData = [];
    }
    var authUserDBData = {};
    for (let index = 0; index < userData.length; index++) {
        const element = userData[index];
        // Calling the API now
        service.isGlobalEndpoint = true;
        await service.getData({ uid: element }, (err, data) => {
            if (err) {
                console.error(':>> operation error:', err);
                // return callback(err);
            }
            authUserDBData[element] = data;
        }).promise();
    }
    console.log("--------------------vvvvvvvvvvvvv-------------------");
    console.log(authUserDBData)


    // ----------------Alter above code only (focus : accessdata)------------
    // Check if user has access
    var accessdata = {
        "00u4crnquhYSNDN7U2p7": "yes",
        "00u4lvu488OimmQq52p7": "yes",
        "00u4ggezdgKUHd5zL2p7": "yes"
    };

    let usersWithAccess = Object.keys(accessdata);
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    // Checking for final authorized list
    usersWithAccess = userData.filter(value => usersWithAccess.includes(value));

    // Creating an array of topics which are authorized
    var authorizedTopics = [];
    usersWithAccess.forEach(element => {
        if (accessdata[element] == "yes") {
            var pubTopic = "";
            // console.log(getKeyByValue(element2, "yes"));
            // console.log(topic);
            pubTopic = addUserIdToTopic(event.topic, element)
            // console.log(pubTopic);
            console.log('Authorized : ' + pubTopic);
            authorizedTopics.push(pubTopic)
        }
    });

    // Publishing message to authorized topics
    let sentEvent = JSON.parse(JSON.stringify(event));
    sentEvent.status = true;

    console.log("Publishing the data --------------------------------");
    try {

        var iotdata = new AWS.IotData({
            endpoint: await getIoTEndpoint()
        });
        for (var i = 0; i < authorizedTopics.length; i++) {
            sentEvent.topic = authorizedTopics[i];
            if (sentEvent.topic.indexOf("#") != -1) {
                sentEvent.topic = sentEvent.topic.substr(0, sentEvent.topic.length - 1);
            }
            console.log(sentEvent)
            var params = {
                topic: sentEvent.topic,
                payload: JSON.stringify(sentEvent),
                qos: '1'
            };
            const responsePub = await iotdata.publish(params).promise();
            console.log(sentEvent);
            console.log("Re Published! to " + sentEvent.topic);
        }
        console.log('Re Publish Completed');
    } catch (error) {
        console.error(error);
        throw new Error("Error occured !");
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify(event.message),
    };
    return response;
};


Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
function addUserIdToTopic(topic, userid) {
    topic = topic.split("/");
    topic.insert(1, userid);
    topic = topic.join("/");
    return topic;
}

async function getIoTEndpoint() {
    var params = {
        endpointType: 'iot:Data-ATS'
    };

    const iot = new AWS.Iot();
    const endpoint = await iot.describeEndpoint(params).promise();
    console.log(endpoint);
    return endpoint.endpointAddress;
}