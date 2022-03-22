const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  it("Should return 1 once it's changed", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(0);
    await counter.deployed();

    expect(await counter.getCount()).to.equal(0);

    const incrementTx = await counter.increment();

    // wait until the transaction is mined
    await incrementTx.wait();

    expect(await counter.getCount()).to.equal(1);
  });
});



