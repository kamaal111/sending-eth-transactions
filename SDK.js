const { Network, Alchemy } = require("alchemy-sdk");

require("dotenv").config();

const { ALCHEMY_API_URL } = process.env;

const alchemy = new Alchemy({
  url: ALCHEMY_API_URL,
  network: Network.ETH_SEPOLIA,
});

module.exports = alchemy;
