# Using fs Library in Lambda

- [Using fs Library in Lambda](#using-fs-library-in-lambda)
  - [Documenting the issues I faced while using fs library in lambda](#documenting-the-issues-i-faced-while-using-fs-library-in-lambda)
    - [Reading any file in lambda](#reading-any-file-in-lambda)
  - [Reference](#reference)

## Documenting the issues I faced while using fs library in lambda

Here I have considered below template as reference for all my use cases below, `// Your Code Here` is the part that I will be referring to here on forward

```nodejs
const fs = require('fs');
const fsp = require('fs').promises;
exports.handler = async (event) => {

    // Your Code Here

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
```

### Reading any file in lambda

- Failed Code

    ```nodejs
    var test = fs.readFile("test.txt", function(err, data){
        console.log(data.toString(), err);
    });
    console.log(test);
    ```

- Successful Code

    ```nodejs
    console.log(fs.readFileSync("test.txt"));
    console.log(fs.readFileSync('test2.txt', 'utf8'));
    ```

    **If the encoding option is specified then this function returns a string. Otherwise it returns a buffer.**

- Successful Code

    ```nodejs
    console.log(await fsp.readFile('test2.txt', 'utf8'));
    console.log(await fsp.readFile("test.txt"));
    ```

    ```nodejs
    fs.writeFileSync("/tmp/test.txt","Hey text.txt");
    console.log((await fs.readFileSync("/tmp/test.txt")).toString());
    fsp.writeFile("/tmp/test2.txt","Hey text2.txt")
    console.log(await fsp.readFile('/tmp/test2.txt', 'utf8'));
    ```

**So What's The Difference?** readFileSync() is synchronous and blocks execution until finished. These return their results as return values. readFile() are asynchronous and return immediately (mostly undefined) while they function in the background. You pass a callback function which gets called when they finish.

## Reference

- [fs Promises API](https://nodejs.org/api/fs.html#fs_fs_promises_api)
- [Difference Between readFile() and readFileSync()](https://stackoverflow.com/questions/17604866/difference-between-readfile-and-readfilesync)
