import React, { useState, useEffect } from 'react'

function Volume() {
  // State for time filter
  const [timeFilter, setTimeFilter] = useState('7d');
  
  // State for selected chains (for filtering)
  const [selectedChains, setSelectedChains] = useState([]);
  
  // Mock data - would be replaced with API calls in production
  const volumeData = {
    totalVolume: "$1.42B",
    dailyVolume: "$28.5M",
    weeklyGrowth: "+12.3%",
    topBridge: "Ethereum → Arbitrum",
    topBridgeVolume: "$8.2M"
  };
  
  // Mock chain data with logos
  const chains = [
    { id: 'ethereum', name: 'Ethereum', icon: '/assets/chain-logos/ethereum.svg' },
    { id: 'arbitrum', name: 'Arbitrum', icon: '/assets/chain-logos/arbitrum.svg' },
    { id: 'optimism', name: 'Optimism', icon: '/assets/chain-logos/optimism.svg' },
    { id: 'cartesi', name: 'Cartesi', icon: '/assets/chain-logos/cartesi.svg' },
    { id: 'taiko', name: 'Taiko', icon: '/assets/chain-logos/taiko.svg' },
    { id: 'fhenix', name: 'Fhenix', icon: '/assets/chain-logos/fhenix.svg' },
    { id: 'zksync', name: 'zkSync', icon: '/assets/chain-logos/zksync.svg' },
    { id: 'starknet', name: 'Starknet', icon: '/assets/chain-logos/starknet.svg' }
  ];
  
  // Mock cross-chain volume data
  const crossChainVolume = [
    { source: 'ethereum', target: 'arbitrum', volume: 823500000, volumeFormatted: '$823.5M', change: '+5.2%' },
    { source: 'ethereum', target: 'optimism', volume: 612700000, volumeFormatted: '$612.7M', change: '+8.3%' },
    { source: 'arbitrum', target: 'ethereum', volume: 415200000, volumeFormatted: '$415.2M', change: '-2.1%' },
    { source: 'optimism', target: 'ethereum', volume: 324900000, volumeFormatted: '$324.9M', change: '+1.7%' },
    { source: 'ethereum', target: 'taiko', volume: 128300000, volumeFormatted: '$128.3M', change: '+22.5%' },
    { source: 'taiko', target: 'ethereum', volume: 87600000, volumeFormatted: '$87.6M', change: '+14.8%' },
    { source: 'arbitrum', target: 'optimism', volume: 76500000, volumeFormatted: '$76.5M', change: '+3.2%' },
    { source: 'optimism', target: 'arbitrum', volume: 68400000, volumeFormatted: '$68.4M', change: '+2.7%' },
    { source: 'ethereum', target: 'cartesi', volume: 45200000, volumeFormatted: '$45.2M', change: '+18.9%' },
    { source: 'cartesi', target: 'ethereum', volume: 32100000, volumeFormatted: '$32.1M', change: '+11.3%' },
    { source: 'ethereum', target: 'fhenix', volume: 29800000, volumeFormatted: '$29.8M', change: '+31.5%' },
    { source: 'fhenix', target: 'ethereum', volume: 18700000, volumeFormatted: '$18.7M', change: '+26.8%' }
  ];
  
  // Handle time filter change
  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
  };
  
  // Toggle chain selection for filtering
  const toggleChainSelection = (chainId) => {
    if (selectedChains.includes(chainId)) {
      setSelectedChains(selectedChains.filter(id => id !== chainId));
    } else {
      setSelectedChains([...selectedChains, chainId]);
    }
  };
  
  // Filter cross-chain volume based on selected chains
  const filteredCrossChainVolume = selectedChains.length === 0 
    ? crossChainVolume 
    : crossChainVolume.filter(item => 
        selectedChains.includes(item.source) || selectedChains.includes(item.target)
      );
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Cross-Chain Bridge Volume</h1>
        
        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500 mb-1">Total Bridge Volume</p>
            <p className="text-2xl font-bold text-indigo-600">{volumeData.totalVolume}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500 mb-1">Daily Volume (24h)</p>
            <p className="text-2xl font-bold text-indigo-600">{volumeData.dailyVolume}</p>
            <p className="text-sm text-green-500 mt-1">{volumeData.weeklyGrowth} this week</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500 mb-1">Most Active Bridge</p>
            <p className="text-2xl font-bold text-indigo-600">{volumeData.topBridge}</p>
            <p className="text-sm text-gray-500 mt-1">{volumeData.topBridgeVolume} (24h)</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500 mb-1">Active Bridges</p>
            <p className="text-2xl font-bold text-indigo-600">27</p>
            <p className="text-sm text-gray-500 mt-1">Across {chains.length} chains</p>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Volume Analytics</h2>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => handleTimeFilterChange('24h')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timeFilter === '24h' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                24H
              </button>
              <button 
                onClick={() => handleTimeFilterChange('7d')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timeFilter === '7d' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                7D
              </button>
              <button 
                onClick={() => handleTimeFilterChange('30d')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timeFilter === '30d' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                30D
              </button>
              <button 
                onClick={() => handleTimeFilterChange('90d')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timeFilter === '90d' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                90D
              </button>
              <button 
                onClick={() => handleTimeFilterChange('all')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timeFilter === 'all' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
            </div>
          </div>
          
          {/* Volume chart placeholder - would be replaced with a real chart library */}
          <div className="bg-gray-100 rounded-lg p-4 h-64 mb-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 mb-2">Bridge Volume Chart</div>
              <div className="text-sm text-gray-500">
                This would be a line or bar chart showing bridge volume over time.
                <br />
                (Implement with Chart.js, Recharts, or similar library)
              </div>
            </div>
          </div>
          
          {/* Chain filter */}
          <h3 className="text-lg font-medium text-gray-800 mb-3">Filter by Chain</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {chains.map(chain => (
              <button
                key={chain.id}
                onClick={() => toggleChainSelection(chain.id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedChains.includes(chain.id)
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'
                }`}
              >
                <img 
                  src={chain.icon} 
                  alt={chain.name} 
                  className="w-4 h-4 mr-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/chain-logos/default.svg';
                  }} 
                />
                {chain.name}
              </button>
            ))}
            
            {selectedChains.length > 0 && (
              <button
                onClick={() => setSelectedChains([])}
                className="flex items-center px-3 py-2 rounded-md text-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
        
        {/* Cross-chain volume table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Cross-Chain Bridge Volume</h2>
            <p className="text-gray-500 text-sm mt-1">
              {timeFilter === '24h' ? 'Last 24 hours' : 
               timeFilter === '7d' ? 'Last 7 days' : 
               timeFilter === '30d' ? 'Last 30 days' : 
               timeFilter === '90d' ? 'Last 90 days' : 'All time'}
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source Chain
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Target Chain
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volume
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCrossChainVolume.map((item, index) => {
                  const sourceChain = chains.find(chain => chain.id === item.source);
                  const targetChain = chains.find(chain => chain.id === item.target);
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img 
                            src={sourceChain?.icon} 
                            alt={sourceChain?.name} 
                            className="w-6 h-6 mr-3"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/assets/chain-logos/default.svg';
                            }} 
                          />
                          <div className="text-sm font-medium text-gray-900">
                            {sourceChain?.name || item.source}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img 
                            src={targetChain?.icon} 
                            alt={targetChain?.name} 
                            className="w-6 h-6 mr-3"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/assets/chain-logos/default.svg';
                            }} 
                          />
                          <div className="text-sm font-medium text-gray-900">
                            {targetChain?.name || item.target}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{item.volumeFormatted}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex text-xs font-semibold px-2 py-1 rounded-full ${
                          item.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.change}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Heatmap visualization (placeholder) */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Bridge Volume Heatmap</h2>
          
          <div className="bg-gray-100 rounded-lg p-4 h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 mb-2">Cross-Chain Heatmap</div>
              <div className="text-sm text-gray-500">
                This would be a heatmap visualization showing volume intensity between chains.
                <br />
                (Implement with D3.js, react-vis, or similar library)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Volume