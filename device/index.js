const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(
  "http://117.4.240.104:8545"
);
const abi = require("../artifacts/contracts/IOT.sol/IoTDeviceManager.json");

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi.abi,
  provider
);
const deviceId = "test_device";
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function main() {
  const isVerified = await contract.isDeviceVerified(deviceId);
  console.log("Is verified:", isVerified);

  const addDevice = await contract.connect(signer).addDevice(deviceId);
  const verifyDevice = await contract.connect(signer).verifyDevice(deviceId);

  console.log("Device added:", addDevice);
  console.log("Device verified:", verifyDevice);

  setInterval(async () => {
    const randomTemperature = Math.floor(Math.random() * 100);
    console.log("Data sent:", randomTemperature);
    const sendData = await contract
      .connect(signer)
      .addTemperatureReading(deviceId, randomTemperature);

    console.log("Data sent:", sendData);
  }, 300000);
}

main();
