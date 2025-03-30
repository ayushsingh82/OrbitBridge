import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Activity, Code2, Wallet, ArrowUpRight } from 'lucide-react'

const ROLLUPS = {
  CASCADE: {
    name: 'Cascade (Injective)',
    type: 'Solana SVM',
    ecosystem: 'IBC',
    status: 'Active',
    logoURI: '/assets/cascade.png',
    metrics: {
      txCount: '1.2M',
      txGrowth: '+15.3%',
      contracts: '2.4K',
      contractGrowth: '+8.7%',
      tvl: '$45.2M',
      tvlGrowth: '+12.4%'
    }
  },
  MILAN: {
    name: 'Milan (Caldera)',
    type: 'Arbitrum',
    ecosystem: 'Gibraltar Testnet',
    status: 'Testing',
    logoURI: '/assets/milan.png',
    metrics: {
      txCount: '856K',
      txGrowth: '+23.5%',
      contracts: '1.8K',
      contractGrowth: '+11.2%',
      tvl: '$28.7M',
      tvlGrowth: '+18.9%'
    }
  },
  KYOTO: {
    name: 'Kyoto (AltLayer)',
    type: 'Arbitrum',
    ecosystem: 'Mainnet',
    status: 'Upcoming',
    logoURI: '/assets/kyoto.png',
    metrics: {
      txCount: '642K',
      txGrowth: '+19.8%',
      contracts: '1.2K',
      contractGrowth: '+15.4%',
      tvl: '$18.5M',
      tvlGrowth: '+21.3%'
    }
  },
  VIENNA: {
    name: 'Vienna (Caldera)',
    type: 'OP Stack',
    ecosystem: 'Cortado Testnet',
    status: 'Testing',
    logoURI: '/assets/vienna.png',
    metrics: {
      txCount: '723K',
      txGrowth: '+17.6%',
      contracts: '1.5K',
      contractGrowth: '+9.8%',
      tvl: '$22.3M',
      tvlGrowth: '+16.7%'
    }
  },
  POLYGON_ZKEVM: {
    name: 'Polygon zkEVM',
    type: 'zkEVM',
    ecosystem: 'Polygon',
    status: 'Active',
    logoURI: '/assets/polygon.png',
    metrics: {
      txCount: '2.1M',
      txGrowth: '+25.4%',
      contracts: '3.2K',
      contractGrowth: '+13.6%',
      tvl: '$89.5M',
      tvlGrowth: '+19.2%'
    }
  }
}

function MetricCard({ title, value, change, icon: Icon }) {
  return (
    <div className="bg-white/5 p-4 rounded-xl border border-[#4B4BFF]/20">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400 text-sm">{title}</span>
      </div>
      <div className="flex justify-between items-end">
        <div className="text-2xl font-bold">{value}</div>
        <div className={`text-sm ${
          change.startsWith('+') ? 'text-green-400' : 'text-red-400'
        }`}>
          {change}
        </div>
      </div>
    </div>
  )
}

function RollupCard({ rollup }) {
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-[#4B4BFF]/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            src={rollup.logoURI}
            alt={rollup.name}
            className="w-10 h-10 rounded-full"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = `https://placehold.co/40x40/4B4BFF/FFFFFF/png?text=${rollup.name[0]}`
            }}
          />
          <div>
            <h3 className="font-bold text-lg">{rollup.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{rollup.type}</span>
              <span>•</span>
              <span>{rollup.ecosystem}</span>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm ${
          rollup.status === 'Active' ? 'bg-green-500/20 text-green-400' :
          rollup.status === 'Testing' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-blue-500/20 text-blue-400'
        }`}>
          {rollup.status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          title="Transactions"
          value={rollup.metrics.txCount}
          change={rollup.metrics.txGrowth}
          icon={Activity}
        />
        <MetricCard
          title="Contracts"
          value={rollup.metrics.contracts}
          change={rollup.metrics.contractGrowth}
          icon={Code2}
        />
        <MetricCard
          title="TVL"
          value={rollup.metrics.tvl}
          change={rollup.metrics.tvlGrowth}
          icon={Wallet}
        />
        <a
          href="#"
          className="flex items-center justify-center bg-gradient-to-r from-[#4B4BFF] to-[#2D2DFF] rounded-xl hover:shadow-[0_0_20px_rgba(75,75,255,0.3)] transition-all duration-300"
        >
          <span className="mr-2">View Details</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

function Rollups() {
  const [timeFilter, setTimeFilter] = useState('24h')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredRollups = Object.values(ROLLUPS).filter(rollup => 
    statusFilter === 'all' || rollup.status.toLowerCase() === statusFilter
  )

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-8">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4B4BFF]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#2D2DFF]/15 rounded-full blur-[100px]"></div>

      <div className="relative container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Rollup Activity</h1>
          
          <div className="flex gap-4">
            {/* Time Filter */}
            <div className="flex gap-2">
              {['24h', '7d', '30d', 'All'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeFilter(period)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    timeFilter === period
                      ? 'bg-gradient-to-r from-[#4B4BFF] to-[#2D2DFF] text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {['all', 'active', 'testing', 'upcoming'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg transition-all capitalize ${
                    statusFilter === status
                      ? 'bg-gradient-to-r from-[#4B4BFF] to-[#2D2DFF] text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRollups.map((rollup) => (
            <RollupCard key={rollup.name} rollup={rollup} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Rollups