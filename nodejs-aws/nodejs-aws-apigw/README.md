# AWS API Gateway Response Handling

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs.aws.apigw&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs.aws.apigw)

- [AWS API Gateway Response Handling](#aws-api-gateway-response-handling)
  - [Responses in APIGW](#responses-in-apigw)
    - [Basic Code](#basic-code)
    - [Adding some headers in Lambda Response](#adding-some-headers-in-lambda-response)
    - [JSON as Content-Type](#json-as-content-type)
    - [Adding Random Stuff to Response Body](#adding-random-stuff-to-response-body)
    - [Inserting JSON body directly in Response's Body Parameter](#inserting-json-body-directly-in-responses-body-parameter)
  - [Settings in API Gateway](#settings-in-api-gateway)
  - [Some Question to Look Into Later](#some-question-to-look-into-later)

## Responses in APIGW

Below are some examples of how the APIGW settings applies on different responses. (Its just for personal reference, and also data is not fullproof)

> Note: Below 2 Code Example has APIGW configured on HTTP API instead of REST API

### Basic Code

```nodejs
exports.handler = async (event) => {
    console.log(event)
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
```

Response:

```text
"Hello from Lambda!"
Headers-----
Date: Thu, 09 Apr 2020 07:25:48 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 20
Connection: keep-alive
Apigw-Requestid: KtUfbjJIg=
```

### Adding some headers in Lambda Response

```nodejs
exports.handler = async (event) => {
    console.log(event)
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
        headers: {
            "Content-Type": "text"
        }
    };
    return response;
};
```

Response

```text
"Hello from Lambda!"
Headers-----
Date: Thu, 09 Apr 2020 07:28:52 GMT
Content-Type: text
Content-Length: 20
Connection: keep-alive
Apigw-Requestid: KtU8IjTPHJHQ=
```

> Note: For below codes APIGW is configured with REST API

### JSON as Content-Type

```nodejs
exports.handler = async (event) => {
    console.log(event)
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
        headers: {
            "Content-Type": "application/json"
        }
    };
    return response;
};
```

Response

```text
"Hello from Lambda!"
Headers-----
Date: Thu, 09 Apr 2020 07:45:22 GMT
Content-Type: application/json
Content-Length: 20
Connection: keep-alive
x-amzn-RequestId: f7d116f4-b341-4fc0-9733-87f1db9deb
x-amz-apigw-id: KtXWvHcFvwQ=
X-Amzn-Trace-Id: Root=1-5e8ed291-17542ef8ade964fbe2836;Sampled=0
```

### Adding Random Stuff to Response Body

```nodejs
exports.handler = async (event) => {
    console.log(event)
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda Base64!'),
        headers: {
            "Content-Type": "application/json"
        },
        isBase64Encoded: true
        // randomheader:"randomheader" - gives error
    };
    return response;
};
```

I tried some random header, they fail on API GW

Response

```text
"Hello from Lambda Base64!"
Headers-----
Date: Thu, 09 Apr 2020 07:48:26 GMT
Content-Type: application/json
Content-Length: 27
Connection: keep-alive
x-amzn-RequestId: c5c6eced-552d-4071-97a4-f0d697
x-amz-apigw-id: KtXziHcF9bw=
X-Amzn-Trace-Id: Root=1-5e8ed349-d73c09306b1ac;Sampled=0
```

### Inserting JSON body directly in Response's Body Parameter

```nodejs
exports.handler = async (event) => {
    console.log(event)
    // TODO implement
    const response = {
        statusCode: 200,
        // body: "{\"akash\":\"adityasingh\"}" //this works
        body: {
            "akash":"adityasingh"
        } //this doesn't work
    };
    return response;
};
```

> Note: When inserting JSON object directly in body of response, It will give an error

Response

```text
502 Gives Error
{
    "message": "Internal server error"
}
Headers-----
Date: Thu, 09 Apr 2020 08:05:08 GMT
Content-Type: application/json
Content-Length: 36
Connection: keep-alive
x-amzn-RequestId: e3a60132-0ad3-483e-89cb-6c6aab50c
x-amzn-ErrorType: InternalServerErrorException
x-amz-apigw-id: KtaQSPHcF9ZQ=
```

## Settings in API Gateway

**_APIGW > API > Settings > Binary Media Types_**

- You can configure binary support for your API by specifying which media types should be treated as binary types.
- API Gateway will look at the Content-Type and Accept HTTP headers to decide how to handle the body. `If you fail to specify this, your content won't be treated as required`
- In here if you add your mediatype - ex. application/json then and then only your json body get encoded into Base64
- If you use _/_ all of your content get Base64 encoded

## Some Question to Look Into Later

1. How to check/test that your response is Base64 encoded?
2. How to enable Base64 encoded response? I know how to enable Base64 encoded request, but is it also applicable for response?
3. How does APIGW handles isBase64Encoded flag?
4. What are other options on response if you disable lambda proxy integration?

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs)
