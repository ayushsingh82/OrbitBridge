import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Background symbols */}
      <div className="crypto-symbols-container">
        <div className="crypto-symbol">Ξ</div>
        <div className="crypto-symbol">⟁</div>
        <div className="crypto-symbol">◎</div>
        <div className="crypto-symbol">♦</div>
        <div className="crypto-symbol">⚡</div>
        <div className="crypto-symbol">Ⓐ</div>
        <div className="crypto-symbol">⛓️</div>
        <div className="crypto-symbol">🔄</div>
      </div>
      
      {/* Digital connection lines */}
      <div className="digital-connections">
        <div className="connection-line"></div>
        <div className="connection-line"></div>
        <div className="connection-line"></div>
        <div className="connection-line"></div>
        <div className="connection-line"></div>
        <div className="connection-line"></div>
      </div>
      
      {/* Pulse circle effects */}
      <div className="pulse-circle"></div>
      <div className="pulse-circle"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left side content */}
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Universal <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Crosschain</span> <br />
              Analytics
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-lg">
              Track bridging volume, transaction times, popular routes, and protocols across Espresso-integrated chains and the Arbitrum Orbit ecosystem.
            </p>
            <p className="text-gray-600 mb-10 max-w-lg">
              Our comprehensive dashboard provides real-time insights into cross-chain activity, helping you make informed decisions about bridge usage, gas efficiency, and emerging trends in the multi-chain landscape.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Explore Analytics
              </Link>
              <Link to="/" className="px-8 py-3 border border-purple-600 text-purple-600 font-medium rounded-md hover:bg-purple-50 transition-colors duration-300 shadow-sm hover:shadow transform hover:-translate-y-1">
                View Chains
              </Link>
            </div>
          </div>
          
          {/* Right side - Network Animation */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="network-visualization-container">
              <h3 className="text-xl font-semibold text-center mb-4 text-purple-700">Supported Chains</h3>
              
              <div className="chains-grid">
                {/* Layer 1 */}
                <div className="chain-node ethereum">
                  <div className="chain-icon">Ξ</div>
                  <span className="chain-name">Ethereum</span>
                </div>
                
                {/* Layer 2 & Specialized Chains */}
                <div className="chain-node cartesi">
                  <div className="chain-icon">C</div>
                  <span className="chain-name">Cartesi</span>
                </div>
                
                <div className="chain-node comet">
                  <div className="chain-icon">☄️</div>
                  <span className="chain-name">Comet</span>
                </div>
                
                <div className="chain-node cyber">
                  <div className="chain-icon">⚡</div>
                  <span className="chain-name">Cyber</span>
                </div>
                
                <div className="chain-node dca">
                  <div className="chain-icon">Đ</div>
                  <span className="chain-name">DCA Monster</span>
                </div>
                
                <div className="chain-node fhenix">
                  <div className="chain-icon">🔥</div>
                  <span className="chain-name">Fhenix</span>
                </div>
                
                <div className="chain-node fluent">
                  <div className="chain-icon">F</div>
                  <span className="chain-name">Fluent</span>
                </div>
                
                <div className="chain-node henez">
                  <div className="chain-icon">H</div>
                  <span className="chain-name">Henez</span>
                </div>
                
                <div className="chain-node injective">
                  <div className="chain-icon">I</div>
                  <span className="chain-name">Injective</span>
                </div>
                
                <div className="chain-node kinto">
                  <div className="chain-icon">K</div>
                  <span className="chain-name">Kinto</span>
                </div>
                
                <div className="chain-node mantis">
                  <div className="chain-icon">M</div>
                  <span className="chain-name">Mantis</span>
                </div>
                
                <div className="chain-node plume">
                  <div className="chain-icon">P</div>
                  <span className="chain-name">Plume</span>
                </div>
                
                <div className="chain-node rari">
                  <div className="chain-icon">R</div>
                  <span className="chain-name">Rari</span>
                </div>
                
                <div className="chain-node rollux">
                  <div className="chain-icon">R</div>
                  <span className="chain-name">Rollux</span>
                </div>
                
                <div className="chain-node specular">
                  <div className="chain-icon">S</div>
                  <span className="chain-name">Specular</span>
                </div>
                
                <div className="chain-node taiko">
                  <div className="chain-icon">T</div>
                  <span className="chain-name">Taiko</span>
                </div>
                
                <div className="chain-node treasure">
                  <div className="chain-icon">💎</div>
                  <span className="chain-name">Treasure</span>
                </div>
              </div>
              
              <div className="network-metrics mt-6">
                <div className="metric">
                  <span className="metric-value">17+</span>
                  <span className="metric-label">Chains</span>
                </div>
                <div className="metric">
                  <span className="metric-value">$2.1B</span>
                  <span className="metric-label">TVL</span>
                </div>
                <div className="metric">
                  <span className="metric-value">56</span>
                  <span className="metric-label">Bridges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient accent at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-indigo-100 to-transparent"></div>
    </div>
  )
}

export default Home