const fs = require('fs');
const fsp = require('fs').promises;
exports.handler = async (event) => {

    // Your Code Here
    fs.writeFileSync("/tmp/test.txt", "Hey text.txt");
    console.log((await fs.readFileSync("/tmp/test.txt")).toString());
    fsp.writeFile("/tmp/test2.txt", "Hey text2.txt")
    console.log(await fsp.readFile('/tmp/test2.txt', 'utf8'));

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};