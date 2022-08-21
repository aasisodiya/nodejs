# Making API Calls

- [Making API Calls](#making-api-calls)
  - [Sample code to make API calls](#sample-code-to-make-api-calls)

## Sample code to make API calls

```js
var options = {
    'method': 'GET',
    'url': 'https://some-get-url.com/,
    'headers': {
        'Authorization': auth
    }
};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.statusCode, error, response.body);
});
```
