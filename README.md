# Sample Solidity Project

This is a sample solidity project, aims to help one to get started into the world of smart contracts. For step to step guide refer [Setting up solidity and writing our first smart contract](https://hashnode.com/preview/6236b3f0bef4c71aa6f111ac).

## Pre Requisites

Before running any command, ensure npm and node are installed. To check if Node.js and NPM is already installed, input the following commands in the terminal:

```
node --version
npm --version
```

Go to [Node.js](https://nodejs.org/en/) if you need to install it.

## Setup

The project include following dev dependenies.

- [Hardhat](https://github.com/nomiclabs/hardhat): compile and run the smart contracts on a local development network
- [Ethers](https://github.com/ethers-io/ethers.js/): renowned Ethereum library and wallet implementation
- [Waffle](https://github.com/EthWorks/Waffle): tooling for writing comprehensive smart contract tests
- [Solcoverage](https://github.com/sc-forks/solidity-coverage): code coverage
- [Prettier Plugin Solidity](https://github.com/prettier-solidity/prettier-plugin-solidity): code formatter

## Sample-Counter-Contract

```js
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    uint256 count; // persistent contract storage

    constructor(uint256 _count) {
        count = _count;
    }

    function increment() public {
        count += 1;
        console.log("The count value after increment", count);
    }

    function getCount() public view returns (uint256) {
        console.log("The count value on getCount", count);
        return count;
    }
}
```

## How to run the project

Clone the project and go to project directory.

Use `npm install` to pull in all dependencies.

Solidity code goes into `contracts/Counter.sol`, tests (Waffle/mocha/chai) go into `test/Counter.test.js`, Hardhat scripts go into `scripts/counter.js`.

Use `npm run build` to compile your contracts.

On compiling the contracts an abi file gets created at `artifacts/contracts/Counter.sol/Counter.json`. The abi file defines the standard way of interacting with smart contract in the ethereum ecosystem.

![compile](https://github.com/GeekyAnts/sample-smart-contract-ethereum/blob/develop/assets/compile.png)

Use `npm run test:light` to run all tests without a coverage report.

Use `npm run test` to run all tests including a coverage report.

![coverage](https://github.com/GeekyAnts/sample-smart-contract-ethereum/blob/develop/assets/coverage.png)

Use `npm run local-testnet` to spin up a local Hardhat testnet (Best run this in a separate terminal. It's a long-running process).

Use `npm run deploy:local` to run `scripts/counter.js` which deploys the counter contract to your local testnet, previously started with `npm run local-testnet`.

![deploy](https://github.com/GeekyAnts/sample-smart-contract-ethereum/blob/develop/assets/deploy.png)
