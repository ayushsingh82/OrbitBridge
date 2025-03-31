// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @title RouteManager
/// @notice Manages cross-chain token routes and pricing information
contract RouteManager is Ownable, ReentrancyGuard {
    // Structs
    struct Token {
        string symbol;
        string name;
        address tokenAddress;
        uint8 decimals;
        bool isActive;
    }

    struct Chain {
        string name;
        string symbol;
        uint256 chainId;
        bool isActive;
    }

    struct Route {
        uint256 fromChainId;
        uint256 toChainId;
        address fromToken;
        address toToken;
        string protocol;
        uint256 fee;
        uint256 estimatedTime;
        bool isActive;
    }

    struct Quote {
        uint256 fromAmount;
        uint256 toAmount;
        uint256 fee;
        uint256 slippage;
        uint256 timestamp;
        string protocol;
    }

    // State variables
    mapping(uint256 => Chain) public chains;
    mapping(uint256 => mapping(address => Token)) public chainTokens;
    mapping(bytes32 => Route) public routes;
    mapping(bytes32 => Quote) public quotes;
    
    uint256 public chainCount;
    uint256 public constant MAX_SLIPPAGE = 500; // 5%

    // Events
    event ChainAdded(uint256 chainId, string name, string symbol);
    event TokenAdded(uint256 chainId, address tokenAddress, string symbol, string name);
    event RouteAdded(
        uint256 fromChainId,
        uint256 toChainId,
        address fromToken,
        address toToken,
        string protocol
    );
    event QuoteUpdated(
        bytes32 routeId,
        uint256 fromAmount,
        uint256 toAmount,
        uint256 slippage
    );

    constructor() {
        // Initialize with some default chains
        _addChain(1, "Ethereum", "ETH");
        _addChain(137, "Polygon", "MATIC");
        _addChain(56, "BNB Chain", "BNB");
    }

    /// @notice Add a new chain
    function addChain(
        uint256 chainId,
        string memory name,
        string memory symbol
    ) external onlyOwner {
        _addChain(chainId, name, symbol);
    }

    /// @notice Internal function to add a chain
    function _addChain(
        uint256 chainId,
        string memory name,
        string memory symbol
    ) internal {
        require(bytes(chains[chainId].name).length == 0, "Chain already exists");
        
        chains[chainId] = Chain({
            name: name,
            symbol: symbol,
            chainId: chainId,
            isActive: true
        });
        
        chainCount++;
        emit ChainAdded(chainId, name, symbol);
    }

    /// @notice Add a token to a chain
    function addToken(
        uint256 chainId,
        address tokenAddress,
        string memory symbol,
        string memory name,
        uint8 decimals
    ) external onlyOwner {
        require(chains[chainId].isActive, "Chain not active");
        require(chainTokens[chainId][tokenAddress].decimals == 0, "Token already exists");

        chainTokens[chainId][tokenAddress] = Token({
            symbol: symbol,
            name: name,
            tokenAddress: tokenAddress,
            decimals: decimals,
            isActive: true
        });

        emit TokenAdded(chainId, tokenAddress, symbol, name);
    }

    /// @notice Add a new route between chains
    function addRoute(
        uint256 fromChainId,
        uint256 toChainId,
        address fromToken,
        address toToken,
        string memory protocol,
        uint256 fee,
        uint256 estimatedTime
    ) external onlyOwner {
        require(chains[fromChainId].isActive, "Source chain not active");
        require(chains[toChainId].isActive, "Destination chain not active");
        require(chainTokens[fromChainId][fromToken].isActive, "Source token not active");
        require(chainTokens[toChainId][toToken].isActive, "Destination token not active");

        bytes32 routeId = _getRouteId(fromChainId, toChainId, fromToken, toToken);
        
        routes[routeId] = Route({
            fromChainId: fromChainId,
            toChainId: toChainId,
            fromToken: fromToken,
            toToken: toToken,
            protocol: protocol,
            fee: fee,
            estimatedTime: estimatedTime,
            isActive: true
        });

        emit RouteAdded(fromChainId, toChainId, fromToken, toToken, protocol);
    }

    /// @notice Update quote for a route
    function updateQuote(
        uint256 fromChainId,
        uint256 toChainId,
        address fromToken,
        address toToken,
        uint256 fromAmount,
        uint256 toAmount,
        uint256 slippage,
        string memory protocol
    ) external onlyOwner {
        require(slippage <= MAX_SLIPPAGE, "Slippage too high");
        
        bytes32 routeId = _getRouteId(fromChainId, toChainId, fromToken, toToken);
        require(routes[routeId].isActive, "Route not active");

        quotes[routeId] = Quote({
            fromAmount: fromAmount,
            toAmount: toAmount,
            fee: routes[routeId].fee,
            slippage: slippage,
            timestamp: block.timestamp,
            protocol: protocol
        });

        emit QuoteUpdated(routeId, fromAmount, toAmount, slippage);
    }

    /// @notice Get quote for a route
    function getQuote(
        uint256 fromChainId,
        uint256 toChainId,
        address fromToken,
        address toToken,
        uint256 amount
    ) external view returns (
        uint256 toAmount,
        uint256 fee,
        uint256 slippage,
        string memory protocol
    ) {
        bytes32 routeId = _getRouteId(fromChainId, toChainId, fromToken, toToken);
        Quote storage quote = quotes[routeId];
        require(quote.timestamp > 0, "Quote not available");
        
        // Scale amount based on existing quote
        uint256 scaledAmount = (amount * quote.toAmount) / quote.fromAmount;
        
        return (
            scaledAmount,
            quote.fee,
            quote.slippage,
            quote.protocol
        );
    }

    /// @notice Generate unique route ID
    function _getRouteId(
        uint256 fromChainId,
        uint256 toChainId,
        address fromToken,
        address toToken
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(fromChainId, toChainId, fromToken, toToken));
    }
}
