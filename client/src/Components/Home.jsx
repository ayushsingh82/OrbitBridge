import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left side content */}
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              Secure, Collateralized <br />
              <span className="text-blue-600">Crypto Credit</span> <br />
              Solutions
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-lg">
              Access the power of decentralized finance with KYC-verified crypto collateral cards and instant payments on zkSync.
            </p>
            <p className="text-gray-600 mb-10 max-w-lg">
              Our revolutionary credit system uses World ID for privacy-preserving verification and zkSync for near-instant, low-cost transactions. Keep your assets secured through smart contracts while accessing the spending power you need.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard" className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300">
                Get Started
              </Link>
              <Link to="/pay" className="px-8 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors duration-300">
                Make a Payment
              </Link>
            </div>
          </div>
          
          {/* Right side - Credit Card Animation */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="credit-card-container">
              {/* Credit card particles */}
              <div className="card-particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
              </div>
              
              {/* Z symbols */}
              <div className="z-symbol">Z</div>
              <div className="z-symbol">Z</div>
              <div className="z-symbol">Z</div>
              <div className="z-symbol">Z</div>
              
              <div className="credit-card front">
                <div className="credit-card-header">
                  <div className="credit-card-logo">Credit Z</div>
                  <div className="credit-card-chip"></div>
                </div>
                <div className="credit-card-number">
                  <span>●●●●</span>
                  <span>●●●●</span>
                  <span>●●●●</span>
                  <span>3579</span>
                </div>
                <div className="credit-card-footer">
                  <div className="credit-card-holder">
                    <div className="label">Card Holder</div>
                    <div className="name">YOUR NAME</div>
                  </div>
                  <div className="credit-card-expires">
                    <div className="label">Expires</div>
                    <div className="date">12/28</div>
                  </div>
                </div>
              </div>
              <div className="credit-card back">
                <div className="credit-card-stripe"></div>
                <div className="credit-card-signature">
                  <div className="signature"></div>
                  <div className="cvv">CVV: 123</div>
                </div>
                <div className="credit-card-info">
                  Secured with zkSync Layer 2
                  <br />
                  Collateralized with crypto assets
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home