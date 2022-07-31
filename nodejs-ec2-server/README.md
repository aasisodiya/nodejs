# How To Deploy A NodeJS Application On AWS EC2 Server

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs.aws.ec2server&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs.aws.ec2server)

- [How To Deploy A NodeJS Application On AWS EC2 Server](#how-to-deploy-a-nodejs-application-on-aws-ec2-server)
  - [Prerequisite](#prerequisite)
  - [Step 1: Install NodeJS](#step-1-install-nodejs)
  - [Step 2: Setup Demo Server](#step-2-setup-demo-server)
  - [Step 3: Run the Server](#step-3-run-the-server)
  - [Debug](#debug)
  - [Reference](#reference)

## Prerequisite

**Instance Type:** Amazon Linux 2 AMI 2.0.20200207.1 x86_64 HVM (*Free Tier Eligible*)

## Step 1: Install NodeJS

1. Connect to your Linux instance
1. Install node version manager (nvm) by typing the following at the command line.

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
    ```

1. Activate nvm by typing the following at the command line.

    ```bash
    . ~/.nvm/nvm.sh
    ```

1. Use nvm to install the latest version of Node.js by typing the following at the command line.

    ```bash
    nvm install node
    ```

1. Test that Node.js is installed and running correctly by typing the following at the command line.

    ``` bash
    node -e "console.log('Running Node.js ' + process.version)"
    ```

    OR

    ``` bash
    node -v
    ```

    Both of which will show you node version

## Step 2: Setup Demo Server

1. Make a folder

    ```bash
    mkdir server
    ```

1. Create a demo server code

    ```bash
    cat >> index.js << EOF
    var app = require('express')();
    console.log("Starting the server!");
    var sampleJson = {
        "status": 200,
        "message": "Aloha!"
    }
    app.get('', function (req, res) {
        console.log("Processing Request")
        res.type('application/json');
        res.send(sampleJson);
    });
    console.log("Listening on port: 9000")
    app.listen(9000);
    EOF
    ```

    *Feel free to modify the code*

1. Install Express

    ```bash
    npm install express
    ```

## Step 3: Run the Server

Now You have two option for running the code

- Run in Foreground

    ```bash
    node index.js
    #Output-----------------
    Starting the server!
    Listening on port: 9000
    #CTRL + C to exit
    ````

    *Issue with this can be you won\'t be able to run any other commands*

- Run in Background
    1. Install Latest Version of PM2

        ```bash
        npm install pm2@latest -g
        ```

    1. Now start the server with command

        ```bash
        pm2 start index.js
        ```

        *Here index.js is the target server file you want to run*

    1. Just to check the status of your server run below command

        ```bash
        pm2 list
        # Sample Output
        ┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
        │ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
        ├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
        │ 0  │ index              │ fork     │ 0    │ online    │ 1.4%     │ 38.1mb   │
        └────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
        ```

    1. To test the server, you have 2 ways
        - Locally (On EC2 Machine itself)

            ```bash
            curl http://localhost:9000
            # Output -------------------------
            {"status":200,"message":"Aloha!"}
            ```

        - Publicly (If available)

            You will have to hit this URL http://ec2-public-address:9000/ from POSTMAN or similar tool

## Debug

- If you run into any issue, you can always check logs bu using following commands

    ```bash
    pm2 logs
    ```

    *This will show you only last 15 statements from log*

- To view complete logs, you can use

    ```bash
    cat /home/ec2-user/.pm2/logs/index-error.log
    cat /home/ec2-user/.pm2/logs/index-out.log
    ```

- In case you get port issue (Unavailable Port), you can use following command to list all ports in use

    ```bash
    netstat -nltu
    ```

## Reference

- [Setting Up NodeJS on EC2 Instance](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html)
- [Getting Started With PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.nodejs&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.nodejs)
