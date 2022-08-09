# Unzip An Executable File And Use It Inside Lambda

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs.aws.lambda.unzip&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs.aws.lambda.unzip)

- [Unzip An Executable File And Use It Inside Lambda](#unzip-an-executable-file-and-use-it-inside-lambda)
  - [Instructions](#instructions)
  - [Q&A](#qa)
  - [Reference](#reference)

## Instructions

Install Required Imports

```powershell
npm install adm-zip
```

Initialize your code by importing required packages

```javascript
var fs = require("fs").promises;
var AdmZip = require("adm-zip");
var spawnsync = require("child_process").spawnSync;
```

Now extract the executable file you want to run in lambda

```javascript
// reading archives
var zip = new AdmZip("./myscript.zip");
zip.extractAllTo(/*target path*/ "/tmp/", /*overwrite*/ true);
```

> **IMPORTANT:** you can only play with files inside /tmp folder in lambda for all other locations it will give an error

Now after extracting, we will use `spawnsync` function for running the executable file. In spawnsync function you have to pass the executable file in first argument / it can be any command that you want to execute.

```javascript
// Giving access to our extracted executable file
var chmodExec = spawnsync("chmod", [
  "777",
  "/tmp/path_to_your_executable_file",
]);
console.log(String(chmodExec.stdout));

// Run the executable file
var args = ["arg1", "arg2"];
var fileExec = spawnsync("/tmp/path_to_your_executable_file", args);
console.log(String(fileExec.stdout));
```

Now pay attention to the fact that we are first modifying the access right for our executable file as it might not run directly on lambda

> **IMPORTANT:** Make sure to give access rights to your executable file

## Q&A

**Question:** Why was the executable even zipped in the first place if we had to unzip it?

**Answer:** **_Simple! Just for fun!_** btw I did it for learning purpose, and also it makes the whole package a bit less clumsy in case when you have many files in your executable file's package. And Yes! I know it increases the over all operation's time and waste resource.

## Reference

- [adm-zip](https://github.com/cthackers/adm-zip/wiki/ADM-ZIP)
- [SpawnSync](https://www.npmjs.com/package/spawn-sync)

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs&label=aasisodiya/nodejs&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs)
