import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownUp, Settings, Info, Loader } from 'lucide-react'
import axios from 'axios'

const CHAINS = {
  ETHEREUM: {
    id: 1,
    name: 'Ethereum',
    icon: '',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.infura.io/v3/your-api-key',
    tokens: {
      ETH: {
        symbol: 'ETH',
        name: 'Ethereum',
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        decimals: 18,
        coingeckoId: 'ethereum',
        logoURI: 'https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png'
      },
      USDT: {
        symbol: 'USDT',
        name: 'Tether USD',
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        decimals: 6,
        coingeckoId: 'tether',
        logoURI: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png'
      },
      USDC: {
        symbol: 'USDC',
        name: 'USD Coin',
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        decimals: 6,
        coingeckoId: 'usd-coin',
        logoURI: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png'
      }
    }
  },
  POLYGON: {
    id: 137,
    name: 'Polygon',
    icon: '',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon-rpc.com',
    tokens: {
      MATIC: {
        symbol: 'MATIC',
        name: 'Polygon',
        address: '0x0000000000000000000000000000000000001010',
        decimals: 18,
        coingeckoId: 'matic-network',
        logoURI: 'https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png'
      },
      USDT: {
        symbol: 'USDT',
        name: 'Tether USD',
        address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        decimals: 6,
        coingeckoId: 'tether',
        logoURI: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png'
      }
    }
  },
  BSC: {
    id: 56,
    name: 'BNB Chain',
    icon: '',
    symbol: 'BNB',
    rpcUrl: 'https://bsc-dataseed.binance.org',
    tokens: {
      BNB: {
        symbol: 'BNB',
        name: 'BNB',
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        decimals: 18,
        coingeckoId: 'binancecoin',
        logoURI: 'https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png'
      },
      BUSD: {
        symbol: 'BUSD',
        name: 'Binance USD',
        address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        decimals: 18,
        coingeckoId: 'binance-usd',
        logoURI: 'https://tokens.1inch.io/0x4fabb145d64652a948d72533023f6e7a623c7c53.png'
      }
    }
  }
}

function ChainOption({ chain }) {
  return (
    <div className="flex items-center gap-2">
      <span>{chain.icon}</span>
      <span>{chain.name}</span>
    </div>
  )
}

function TokenOption({ token }) {
  return (
    <div className="flex items-center gap-2">
      <img 
        src={token.logoURI} 
        alt={token.symbol} 
        className="w-5 h-5 rounded-full"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/20x20';
        }}
      />
      <span>{token.symbol}</span>
    </div>
  )
}

function Routes() {
  const [selectedChain, setSelectedChain] = useState(CHAINS.ETHEREUM)
  const [fromToken, setFromToken] = useState(CHAINS.ETHEREUM.tokens.ETH.symbol)
  const [toToken, setToToken] = useState(CHAINS.ETHEREUM.tokens.USDT.symbol)
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState('0.5')
  const [showSettings, setShowSettings] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [tokenPrices, setTokenPrices] = useState({})

  // Reset tokens when chain changes
  useEffect(() => {
    const chainTokens = selectedChain.tokens
    const defaultFromToken = Object.values(chainTokens)[0].symbol
    const defaultToToken = Object.values(chainTokens)[1]?.symbol || defaultFromToken
    setFromToken(defaultFromToken)
    setToToken(defaultToToken)
    setFromAmount('')
    setToAmount('')
    setError('')
  }, [selectedChain])

  // Fetch token prices from CoinGecko
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const tokens = Object.values(selectedChain.tokens)
        const ids = [...new Set(tokens.map(t => t.coingeckoId))].join(',')
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
        )
        setTokenPrices(response.data)
      } catch (err) {
        console.error('Error fetching prices:', err)
        setError('Failed to fetch token prices')
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 60000)
    return () => clearInterval(interval)
  }, [selectedChain])

  const getTokenPrice = (symbol) => {
    const token = selectedChain.tokens[symbol]
    return tokenPrices[token.coingeckoId]?.usd || 0
  }

  const getQuote = async () => {
    if (!fromAmount || parseFloat(fromAmount) === 0) {
      setToAmount('')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const fromTokenData = selectedChain.tokens[fromToken]
      const toTokenData = selectedChain.tokens[toToken]
      
      const response = await axios.get(`https://api.1inch.io/v5.0/${selectedChain.id}/quote`, {
        params: {
          fromTokenAddress: fromTokenData.address,
          toTokenAddress: toTokenData.address,
          amount: (parseFloat(fromAmount) * Math.pow(10, fromTokenData.decimals)).toString(),
        }
      })

      const toAmountFormatted = (response.data.toTokenAmount / Math.pow(10, toTokenData.decimals)).toFixed(6)
      setToAmount(toAmountFormatted)
    } catch (err) {
      console.error('Error fetching quote:', err)
      setError(err.response?.data?.description || 'Failed to fetch quote')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (fromAmount) {
      getQuote()
    }
  }, [fromAmount, fromToken, toToken, selectedChain])

  const handleSwitch = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const getPriceRatio = (from, to) => {
    const fromPrice = getTokenPrice(from)
    const toPrice = getTokenPrice(to)
    if (!fromPrice || !toPrice) return '0.00'
    return (fromPrice / toPrice).toFixed(6)
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4B4BFF]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#2D2DFF]/15 rounded-full blur-[100px]"></div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-[#4B4BFF]/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Swap Route</h2>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Chain Selector */}
          <div className="mb-6">
            <label className="block text-gray-400 text-sm font-medium mb-2">Network</label>
            <select
              value={selectedChain.id}
              onChange={(e) => setSelectedChain(Object.values(CHAINS).find(c => c.id === parseInt(e.target.value)))}
              className="w-full p-3 bg-white/5 text-white rounded-xl border border-[#4B4BFF]/20 outline-none"
            >
              {Object.values(CHAINS).map((chain) => (
                <option key={chain.id} value={chain.id} className="bg-[#1a1b1e]">
                  {chain.icon} {chain.name}
                </option>
              ))}
            </select>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-[#4B4BFF]/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Slippage Tolerance</span>
                  <Info className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex gap-2">
                  {['0.5', '1.0', '2.0'].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSlippage(value)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        slippage === value
                          ? 'bg-gradient-to-r from-[#4B4BFF] to-[#2D2DFF] text-white'
                          : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      {value}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* From Token */}
          <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-[#4B4BFF]/20">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">From</span>
              </div>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-2xl text-white placeholder-gray-600 outline-none flex-1"
                />
                <select
                  value={fromToken}
                  onChange={(e) => setFromToken(e.target.value)}
                  className="bg-white/5 text-white px-4 py-2 rounded-xl border border-[#4B4BFF]/20 outline-none"
                >
                  {Object.values(selectedChain.tokens).map(token => (
                    <option key={token.symbol} value={token.symbol} className="bg-[#1a1b1e]">
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Switch Button */}
            <div className="flex justify-center -my-3 relative z-10">
              <button
                onClick={handleSwitch}
                className="bg-gradient-to-r from-[#4B4BFF] to-[#2D2DFF] p-2 rounded-xl hover:shadow-[0_0_20px_rgba(75,75,255,0.3)] transition-all duration-300"
              >
                <ArrowDownUp className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* To Token */}
            <div className="bg-white/5 p-4 rounded-xl border border-[#4B4BFF]/20">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">To</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={toAmount}
                    readOnly
                    placeholder="0.00"
                    className="bg-transparent text-2xl text-white placeholder-gray-600 outline-none w-full"
                  />
                  {isLoading && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Loader className="w-5 h-5 text-[#4B4BFF] animate-spin" />
                    </div>
                  )}
                </div>
                <select
                  value={toToken}
                  onChange={(e) => setToToken(e.target.value)}
                  className="bg-white/5 text-white px-4 py-2 rounded-xl border border-[#4B4BFF]/20 outline-none"
                >
                  {Object.values(selectedChain.tokens).map(token => (
                    <option key={token.symbol} value={token.symbol} className="bg-[#1a1b1e]">
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            {/* Price display */}
            {fromAmount && !isLoading && (
              <div className="mt-4 text-sm text-gray-400 text-center">
                1 {fromToken} = {getPriceRatio(fromToken, toToken)} {toToken}
                <br />
                1 {toToken} = {getPriceRatio(toToken, fromToken)} {fromToken}
              </div>
            )}

            {/* Route Button */}
            <button
              onClick={getQuote}
              disabled={!fromAmount || isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#4B4BFF] to-[#2D2DFF] text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(75,75,255,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Finding Best Route...' : 'Get Route'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Routes