// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract IoTDeviceManager {
    address public owner;
    
    struct Device {
        bool isVerified;
        address owner;
    }
    
    mapping(string => Device) public devices;
    mapping(string => mapping(uint256 => uint256)) public temperatureReadings;
    
    // Event to log when a device is verified
    event DeviceVerified(address indexed verifier, string deviceID);
    
    // Modifier to restrict certain functions to the owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    // Constructor to initialize the contract
    constructor() {
        owner = msg.sender;
    }
    
    // Function to add a new device
    function addDevice(string memory _deviceID) public {
        require(devices[_deviceID].owner == address(0), "Device already exists");
        devices[_deviceID] = Device(false, msg.sender);
    }
    
    // Function to verify a device, only callable by the owner
    function verifyDevice(string memory _deviceID) public onlyOwner {
        require(devices[_deviceID].owner != address(0), "Device does not exist");
        devices[_deviceID].isVerified = true;
        emit DeviceVerified(msg.sender, _deviceID);
    }
    
    // Function to check if a device is verified
    function isDeviceVerified(string memory _deviceID) public view returns (bool) {
        return devices[_deviceID].isVerified;
    }

    // function to add temperature reading
    function addTemperatureReading(string memory _deviceID, uint256 _temperature) public {
        require(devices[_deviceID].owner != address(0), "Device does not exist");
        require(devices[_deviceID].isVerified, "Device is not verified");
        uint256 _timestamp = block.timestamp;
        temperatureReadings[_deviceID][_timestamp] = _temperature;
    }
}
