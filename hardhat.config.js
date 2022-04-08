require("@nomiclabs/hardhat-waffle");

const INFURA_API_KEY = "e0c0649106b74055b75eabebb028bc5f";
const WALLET_PRIVATE_KEY =
  "36d672185862dc7ac9971efc9b27a75b7405ae92396d899cb41e339ea628795c";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${WALLET_PRIVATE_KEY}`],
    },
  },
};
