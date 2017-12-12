FinChain-UI
============

This is a light wallet that connects to a FinChain API provided by the *witness_node* executable.


It *stores all keys locally* in the browser, *never exposing your keys to anyone* as it signs transactions locally before transmitting them to the API server which then broadcasts them to the blockchain network. The wallet is encrypted with a password of your choosing and encrypted in a browser database.


## Getting started&emsp;项目部署

FinChain-UI depends node Node.js, and version 6+ is required.

On Ubuntu and OSX, the easiest way to install Node is to use the [Node Version Manager](https://github.com/creationix/nvm).

To install NVM for Linux/OSX, simply copy paste the following in a terminal:

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
nvm install v6
nvm use v6
```

Once you have Node installed, you can clone the repo:

```
https://github.com/FinanceChainFoundation/FinChain-UI.git
cd FinChain-ui
```

Before launching the GUI you will need to install the npm packages:

>在装载GUI前，你需要为每一子目录安装npm包:
```
npm install
```

## Running the dev server&emsp

The dev server uses Express in combination with Webpack.

npm start

