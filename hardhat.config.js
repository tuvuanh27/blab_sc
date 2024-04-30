require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    blab: {
      url: "http://117.4.240.104:8545",
      accounts: [
        "2cd006bb12b765b709dd5fba4293f108bb7763060f23758ee6b36e7f3f09b89c",
      ],
    },
    bsc: {
      url: "https://convincing-delicate-energy.bsc-testnet.quiknode.pro/b91b99c0106aa0367dc4fff41b0fe2d0f010b006/",
      accounts: [
        "2cd006bb12b765b709dd5fba4293f108bb7763060f23758ee6b36e7f3f09b89c",
      ],
    },
  },
};
