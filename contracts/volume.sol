// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @title VolumeTracker
/// @notice Tracks cross-chain bridge volume and protocol statistics
contract VolumeTracker is Ownable, ReentrancyGuard {
    // Structs
    struct ChainInfo {
        string name;
        string symbol;
        bool isActive;
    }

    struct Protocol {
        string name;
        bool isActive;
        uint256 totalVolume;
    }

    struct VolumeData {
        uint256 totalVolume;
        uint256 timestamp;
        mapping(string => uint256) protocolVolumes; // protocol name => volume
    }

    // State variables
    mapping(uint256 => ChainInfo) public chains;
    mapping(string => Protocol) public protocols;
    mapping(bytes32 => VolumeData) public chainPairVolumes; // hash of fromChain-toChain => VolumeData
    mapping(uint256 => uint256) public dailyVolumes; // timestamp => volume
    
    string[] public activeProtocols;
    uint256 public chainCount;

    // Events
    event VolumeUpdated(
        uint256 fromChainId,
        uint256 toChainId,
        string protocol,
        uint256 amount,
        uint256 timestamp
    );

    event ChainAdded(uint256 chainId, string name, string symbol);
    event ProtocolAdded(string protocolName);
    event ChainStatusUpdated(uint256 chainId, bool isActive);
    event ProtocolStatusUpdated(string protocolName, bool isActive);

    constructor() {
        // Initialize with some default protocols
        _addProtocol("Hop");
        _addProtocol("Across");
        _addProtocol("Stargate");
    }

    /// @notice Add a new chain to the tracker
    function addChain(
        uint256 chainId,
        string memory name,
        string memory symbol
    ) external onlyOwner {
        require(bytes(chains[chainId].name).length == 0, "Chain already exists");
        
        chains[chainId] = ChainInfo({
            name: name,
            symbol: symbol,
            isActive: true
        });
        
        chainCount++;
        emit ChainAdded(chainId, name, symbol);
    }

    /// @notice Add a new protocol to the tracker
    function addProtocol(string memory protocolName) external onlyOwner {
        _addProtocol(protocolName);
    }

    /// @notice Internal function to add a protocol
    function _addProtocol(string memory protocolName) internal {
        require(bytes(protocolName).length > 0, "Invalid protocol name");
        require(!protocols[protocolName].isActive, "Protocol already exists");

        protocols[protocolName] = Protocol({
            name: protocolName,
            isActive: true,
            totalVolume: 0
        });

        activeProtocols.push(protocolName);
        emit ProtocolAdded(protocolName);
    }

    /// @notice Update volume data for a chain pair and protocol
    function updateVolume(
        uint256 fromChainId,
        uint256 toChainId,
        string memory protocolName,
        uint256 amount
    ) external onlyOwner nonReentrant {
        require(chains[fromChainId].isActive, "Source chain not active");
        require(chains[toChainId].isActive, "Destination chain not active");
        require(protocols[protocolName].isActive, "Protocol not active");

        bytes32 pairHash = _getChainPairHash(fromChainId, toChainId);
        uint256 timestamp = block.timestamp / 1 days; // Current day

        // Update protocol volume
        protocols[protocolName].totalVolume += amount;
        chainPairVolumes[pairHash].protocolVolumes[protocolName] += amount;

        // Update total volumes
        chainPairVolumes[pairHash].totalVolume += amount;
        chainPairVolumes[pairHash].timestamp = block.timestamp;
        dailyVolumes[timestamp] += amount;

        emit VolumeUpdated(fromChainId, toChainId, protocolName, amount, block.timestamp);
    }

    /// @notice Get volume data for a chain pair
    function getChainPairVolume(
        uint256 fromChainId,
        uint256 toChainId
    ) external view returns (
        uint256 totalVolume,
        uint256 lastUpdate,
        uint256[] memory protocolVolumes
    ) {
        bytes32 pairHash = _getChainPairHash(fromChainId, toChainId);
        VolumeData storage data = chainPairVolumes[pairHash];
        
        uint256[] memory volumes = new uint256[](activeProtocols.length);
        for (uint i = 0; i < activeProtocols.length; i++) {
            volumes[i] = data.protocolVolumes[activeProtocols[i]];
        }

        return (data.totalVolume, data.timestamp, volumes);
    }

    /// @notice Get daily volume for a specific day
    function getDailyVolume(uint256 timestamp) external view returns (uint256) {
        return dailyVolumes[timestamp / 1 days];
    }

    /// @notice Get protocol details
    function getProtocolDetails(string memory protocolName) external view returns (
        bool isActive,
        uint256 totalVolume
    ) {
        Protocol storage protocol = protocols[protocolName];
        return (protocol.isActive, protocol.totalVolume);
    }

    /// @notice Generate hash for chain pair
    function _getChainPairHash(uint256 fromChainId, uint256 toChainId) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(fromChainId, toChainId));
    }

    /// @notice Update chain status
    function updateChainStatus(uint256 chainId, bool isActive) external onlyOwner {
        require(bytes(chains[chainId].name).length > 0, "Chain does not exist");
        chains[chainId].isActive = isActive;
        emit ChainStatusUpdated(chainId, isActive);
    }

    /// @notice Update protocol status
    function updateProtocolStatus(string memory protocolName, bool isActive) external onlyOwner {
        require(bytes(protocols[protocolName].name).length > 0, "Protocol does not exist");
        protocols[protocolName].isActive = isActive;
        emit ProtocolStatusUpdated(protocolName, isActive);
    }
}
