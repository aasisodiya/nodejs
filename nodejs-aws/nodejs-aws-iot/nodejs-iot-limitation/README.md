# IoT Limitation

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs.aws.iot.limitation&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs.aws.iot.limitation)

- [IoT Limitation](#iot-limitation)
  - [Objective](#objective)
  - [Targets / Requirements](#targets--requirements)
  - [Final Working Solution](#final-working-solution)
  - [Learning Points](#learning-points)
  - [Test](#test)

## Objective

To create a Pub Sub Model to overcome limitations of AWS IoT

## Targets / Requirements

    1. Users will subscribe to many different topics
    2. Published message should reach to authorized Users only

## Final Working Solution

    1. Created a DynamoDB Table named `Subscriptions` with `topic` as primary key
    2. Created a Lambda to populate this table with key pair of `topic` and `users` array
    3. Created another Lambda to re-publish a published message to all authorized users only
    4. Created a IoT Rule that will trigger the re-publishing lambda when a message is published

## Learning Points

    1. Package : `aws-iot-device-sdk` can't be used with lambda as I faced issues while making code synchronous
    2. Below mentioned method worked just by using default aws library functions

    ```js
        var iotdata = new AWS.IotData({
            endpoint: await getIoTEndpoint()
        });
        async function getIoTEndpoint() {
            var params = {
                endpointType: 'iot:Data-ATS'
            };

            const iot = new AWS.Iot();
            const endpoint = await iot.describeEndpoint(params).promise();
            console.log(endpoint);
            return endpoint.endpointAddress;
        }
    ```

    4. Creating IoT device isn't necessary for pub-sub
    5. `a/b/c` and `a/b/c/` aren't the same topic while subscribing or publishing
    6. `a/b/#` - `#` is only allowed during subscribing and not with publish, during publishing you have to be specific
    7. IoT Rule we used : `SELECT * FROM 'sistech/#' where status = 'false'`

## Test

Publish to: `sistech/account1/`

Publish Format:

    ```json
    {
    "topic": "sistech/account1/",
    "message": "Hello from AWS Lambda Console",
    "status": "false"
    }
    ```

Subscribe to: `sistech/userid/account1/#`

---

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs&label=aasisodiya/nodejs&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs)
