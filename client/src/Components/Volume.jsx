import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings, Info, ArrowDownUp } from 'lucide-react'

// Import token data from Routes
const TOKENS = {
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    logoURI: 'https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png'
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether USD',
    logoURI: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png'
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    logoURI: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png'
  },
  MATIC: {
    symbol: 'MATIC',
    name: 'Polygon',
    logoURI: 'https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png'
  },
  BNB: {
    symbol: 'BNB',
    name: 'BNB',
    logoURI: 'https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png'
  },
  BUSD: {
    symbol: 'BUSD',
    name: 'Binance USD',
    logoURI: 'https://tokens.1inch.io/0x4fabb145d64652a948d72533023f6e7a623c7c53.png'
  }
}

function TokenLogo({ symbol }) {
  const token = TOKENS[symbol]
  return (
    <div className="flex items-center gap-2">
      <img
        src={token?.logoURI}
        alt={token?.symbol}
        className="w-6 h-6 rounded-full"
        onError={(e) => {
          e.target.onerror = null
          e.target.src = `https://placehold.co/24x24/4B4BFF/FFFFFF/png?text=${symbol?.[0]}`
        }}
      />
      <span>{symbol}</span>
    </div>
  )
}

const CHAINS = {
  ETHEREUM: {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    logoURI: 'https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png'
  },
  ARBITRUM: {
    id: 'arbitrum',
    name: 'Arbitrum',
    symbol: 'ARB',
    logoURI: 'https://tokens.1inch.io/0x912ce59144191c1204e64559fe8253a0e49e6548.png'
  },
  OPTIMISM: {
    id: 'optimism',
    name: 'Optimism',
    symbol: 'OP',
    logoURI: 'https://tokens.1inch.io/0x4200000000000000000000000000000000000042.png'
  },
  POLYGON: {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    logoURI: 'https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png'
  },
  BSC: {
    id: 'bsc',
    name: 'BNB Chain',
    symbol: 'BNB',
    logoURI: 'https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png'
  }
}

function ChainLogo({ chain }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={chain?.logoURI}
        alt={chain?.name}
        className="w-6 h-6 rounded-full"
        onError={(e) => {
          e.target.onerror = null
          e.target.src = `https://placehold.co/24x24/4B4BFF/FFFFFF/png?text=${chain?.symbol?.[0]}`
        }}
      />
      <span>{chain?.name}</span>
    </div>
  )
}

// Add this mock data mapping for different chain pairs
const CHAIN_VOLUME_DATA = {
  'ethereum-arbitrum': {
    volume: '823.5M',
    change: '+5.2%',
    routes: [
      { volume: '412.3M', protocol: 'Hop', change: '+3.1%' },
      { volume: '256.7M', protocol: 'Across', change: '+6.4%' },
      { volume: '154.5M', protocol: 'Stargate', change: '+4.8%' }
    ]
  },
  'ethereum-optimism': {
    volume: '612.7M',
    change: '+8.3%',
    routes: [
      { volume: '298.4M', protocol: 'Hop', change: '+7.2%' },
      { volume: '201.3M', protocol: 'Across', change: '+9.1%' },
      { volume: '113.0M', protocol: 'Stargate', change: '+8.5%' }
    ]
  },
  'polygon-ethereum': {
    volume: '445.2M',
    change: '+4.1%',
    routes: [
      { volume: '225.8M', protocol: 'Hop', change: '+2.8%' },
      { volume: '142.4M', protocol: 'Across', change: '+5.3%' },
      { volume: '77.0M', protocol: 'Stargate', change: '+4.2%' }
    ]
  },
  'bsc-ethereum': {
    volume: '567.8M',
    change: '+6.7%',
    routes: [
      { volume: '289.5M', protocol: 'Hop', change: '+5.9%' },
      { volume: '178.3M', protocol: 'Across', change: '+7.4%' },
      { volume: '100.0M', protocol: 'Stargate', change: '+6.8%' }
    ]
  },
  // Add more chain pair combinations as needed
}

function Volume() {
  const [fromChain, setFromChain] = useState(CHAINS.ETHEREUM)
  const [toChain, setToChain] = useState(CHAINS.ARBITRUM)
  const [timeFilter, setTimeFilter] = useState('24h')
  const [showSettings, setShowSettings] = useState(false)
  const [volumeData, setVolumeData] = useState(null)

  useEffect(() => {
    // Get volume data based on selected chains
    const getVolumeData = () => {
      const pairKey = `${fromChain.id}-${toChain.id}`
      const reversePairKey = `${toChain.id}-${fromChain.id}`
      
      // Check if we have data for this pair or its reverse
      const data = CHAIN_VOLUME_DATA[pairKey] || CHAIN_VOLUME_DATA[reversePairKey]
      
      if (data) {
        // If using reverse pair, adjust the volume slightly to make it different
        if (CHAIN_VOLUME_DATA[reversePairKey] && !CHAIN_VOLUME_DATA[pairKey]) {
          return {
            ...data,
            volume: (parseFloat(data.volume) * 0.85).toFixed(1) + 'M',
            change: data.change.startsWith('+') ? 
              '-' + (parseFloat(data.change.slice(1)) * 0.7).toFixed(1) + '%' :
              '+' + (parseFloat(data.change.slice(1)) * 0.7).toFixed(1) + '%',
            routes: data.routes.map(route => ({
              ...route,
              volume: (parseFloat(route.volume) * 0.85).toFixed(1) + 'M',
              change: route.change.startsWith('+') ?
                '-' + (parseFloat(route.change.slice(1)) * 0.7).toFixed(1) + '%' :
                '+' + (parseFloat(route.change.slice(1)) * 0.7).toFixed(1) + '%'
            }))
          }
        }
        return data
      }

      // If no data exists for this pair, generate some random data
      return {
        volume: (Math.random() * 500 + 100).toFixed(1) + 'M',
        change: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 10).toFixed(1) + '%',
        routes: [
          {
            protocol: 'Hop',
            volume: (Math.random() * 200 + 50).toFixed(1) + 'M',
            change: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 8).toFixed(1) + '%'
          },
          {
            protocol: 'Across',
            volume: (Math.random() * 150 + 30).toFixed(1) + 'M',
            change: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 8).toFixed(1) + '%'
          },
          {
            protocol: 'Stargate',
            volume: (Math.random() * 100 + 20).toFixed(1) + 'M',
            change: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 8).toFixed(1) + '%'
          }
        ]
      }
    }

    // Update volume data when chains or time filter changes
    setVolumeData(getVolumeData())
  }, [fromChain, toChain, timeFilter])

  const handleSwitch = () => {
    const temp = fromChain
    setFromChain(toChain)
    setToChain(temp)
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-8">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4B4BFF]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#2D2DFF]/15 rounded-full blur-[100px]"></div>

      <div className="relative max-w-lg mx-auto">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-[#4B4BFF]/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Volume Analytics</h2>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-[#4B4BFF]/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Time Period</span>
                  <Info className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex gap-2">
                  {['24h', '7d', '30d', 'All'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimeFilter(period)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        timeFilter === period
                          ? 'bg-gradient-to-r from-[#4B4BFF] to-[#2D2DFF] text-white'
                          : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chain Selection */}
          <div className="space-y-6">
            {/* From Chain */}
            <div className="bg-white/5 p-4 rounded-xl border border-[#4B4BFF]/20">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">From Chain</span>
              </div>
              <select
                value={fromChain.id}
                onChange={(e) => setFromChain(Object.values(CHAINS).find(c => c.id === e.target.value))}
                className="w-full p-3 bg-white/5 text-white rounded-xl border border-[#4B4BFF]/20 outline-none"
              >
                {Object.values(CHAINS).map((chain) => (
                  <option key={chain.id} value={chain.id} className="bg-[#1a1b1e]">
                    {chain.name}
                  </option>
                ))}
              </select>
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

            {/* To Chain */}
            <div className="bg-white/5 p-4 rounded-xl border border-[#4B4BFF]/20">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">To Chain</span>
              </div>
              <select
                value={toChain.id}
                onChange={(e) => setToChain(Object.values(CHAINS).find(c => c.id === e.target.value))}
                className="w-full p-3 bg-white/5 text-white rounded-xl border border-[#4B4BFF]/20 outline-none"
              >
                {Object.values(CHAINS).map((chain) => (
                  <option key={chain.id} value={chain.id} className="bg-[#1a1b1e]">
                    {chain.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Volume Display */}
            {volumeData && (
              <div className="mt-6 p-6 bg-white/5 rounded-xl border border-[#4B4BFF]/20">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <ChainLogo chain={fromChain} />
                    <span className="text-gray-400">→</span>
                    <ChainLogo chain={toChain} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${volumeData.volume}</div>
                    <div className={`text-sm ${
                      volumeData.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {volumeData.change}
                    </div>
                  </div>
                </div>

                {/* Routes Breakdown */}
                <div className="mt-4 space-y-3">
                  <h3 className="text-gray-400 text-sm">Routes Breakdown</h3>
                  {volumeData.routes.map((route, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span>{route.protocol}</span>
                      <div className="text-right">
                        <div>${route.volume}</div>
                        <div className={`text-sm ${
                          route.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {route.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Volume