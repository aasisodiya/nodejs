# SES NodeJs Operations

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs.aws.ses&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs.aws.ses)

- [SES NodeJs Operations](#ses-nodejs-operations)
  - [AWS SES](#aws-ses)
  - [Sending an basic email with SES](#sending-an-basic-email-with-ses)
  - [Reference](#reference)

## AWS SES

- We use AWS SES i.e. Simple Email Sender Service to send emails
- You can only send email from verified email addresses or domains. If you try to send email from an address that isn't verified, the operation results in an "Email address not verified" error.
- If your account is still in the Amazon SES sandbox, you can only send email to other verified addresses in your account, or to addresses that are associated with the Amazon SES mailbox simulator.
- SES attachment has a limit of 10MB

## Sending an basic email with SES

```nodejs
/* The following example sends a formatted email: */

var params = {
    Destination: {
        BccAddresses: [],
        CcAddresses: ["recipient3@example.com"],
        ToAddresses: ["recipient1@example.com", "recipient2@example.com"],
    },
    Message: {
        Body: {
            Html: {
                Charset: "UTF-8",
                Data: 'This message body contains HTML formatting. It can, for example, contain links like this one: <a class="ulink" href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide" target="_blank">Amazon SES Developer Guide</a>.',
            },
            Text: {
                Charset: "UTF-8",
                Data: "This is the message body in text format.",
            },
        },
        Subject: {
            Charset: "UTF-8",
            Data: "Test email",
        },
    },
    ReplyToAddresses: [],
    ReturnPath: "",
    ReturnPathArn: "",
    Source: "sender@example.com",
    SourceArn: "",
};
ses.sendEmail(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
    /*
     data = {
      MessageId: "EXAMPLE78603177f-7a5433e7-8edb-42ae-af10-f0181f34d6ee-000000"
     }
     */
});
```

## Reference

- [AWS SES SendEmail](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#sendEmail-property)

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs&label=aasisodiya/nodejs&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs)
