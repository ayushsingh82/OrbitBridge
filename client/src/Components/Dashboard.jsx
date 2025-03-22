import React, { useState } from 'react'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('cards')
  
  // Mock data - replace with actual data from your backend
  const cards = [
    { id: 1, name: 'Crypto Collateral Card', balance: '5000 USDC', limit: '4000 USDC', collateral: '6000 ETH' },
    { id: 2, name: 'Stablecoin Credit Card', balance: '2500 USDC', limit: '3000 USDC', collateral: '4000 DAI' }
  ]
  
  const payments = [
    { id: 1, date: '2023-05-15', amount: '500 USDC', status: 'Completed' },
    { id: 2, date: '2023-05-01', amount: '750 USDC', status: 'Completed' },
    { id: 3, date: '2023-04-15', amount: '620 USDC', status: 'Completed' }
  ]
  
  const collateral = [
    { id: 1, asset: 'ETH', amount: '2.5', valueUSDC: '6000' },
    { id: 2, asset: 'DAI', amount: '4000', valueUSDC: '4000' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Financial Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Account Overview</h2>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            KYC Verified via World ID
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-md text-white shadow-md">
            <p className="text-white/80 text-sm mb-1">Vault Balance</p>
            <p className="text-3xl font-bold">10,000 USDC</p>
            <div className="mt-2 flex items-center">
              <span className="bg-green-400/30 text-white text-xs px-2 py-1 rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                +2.5%
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-md text-white shadow-md">
            <p className="text-white/80 text-sm mb-1">Credit Score</p>
            <p className="text-3xl font-bold">785</p>
            <div className="mt-2">
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '78.5%' }}></div>
              </div>
              <p className="text-xs mt-1 text-white/80">Excellent</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 rounded-md text-white shadow-md">
            <p className="text-white/80 text-sm mb-1">Loan Limit</p>
            <p className="text-3xl font-bold">15,000 USDC</p>
            <div className="mt-2 flex items-center">
              <span className="text-xs text-white/80">
                50% of collateral value
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button 
            className={`px-6 py-3 font-medium ${activeTab === 'cards' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('cards')}
          >
            Your Cards
          </button>
          <button 
            className={`px-6 py-3 font-medium ${activeTab === 'payments' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('payments')}
          >
            Payment History
          </button>
          <button 
            className={`px-6 py-3 font-medium ${activeTab === 'collateral' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('collateral')}
          >
            Collateral
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'cards' && (
            <div>
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Your Credit Cards</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Add New Card</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map(card => (
                  <div key={card.id} className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex justify-between mb-8">
                      <div>
                        <p className="text-sm opacity-80">Credit Z</p>
                        <p className="text-xl font-bold">{card.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-80">Secured with zkSync</p>
                        <p className="text-sm">●●●● ●●●● ●●●● 3579</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="opacity-80">Balance</p>
                        <p className="font-bold">{card.balance}</p>
                      </div>
                      <div>
                        <p className="opacity-80">Limit</p>
                        <p className="font-bold">{card.limit}</p>
                      </div>
                      <div>
                        <p className="opacity-80">Collateral</p>
                        <p className="font-bold">{card.collateral}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'payments' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Payment History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map(payment => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{payment.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{payment.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-blue-600">View on zkSync</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'collateral' && (
            <div>
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Collateral Assets</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Add Collateral</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value (USDC)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {collateral.map(item => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full mr-2"></div>
                            {item.asset}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.valueUSDC}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">Add</button>
                          <button className="text-red-600 hover:text-red-800">Withdraw</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Active Loans</h3>
        
        <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden mb-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-800">Loan #38291</h4>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Active</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Started on May 12, 2023 • 30% LTV ratio</p>
          </div>
          
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Loan Amount</p>
                <p className="text-lg font-semibold">5,000 USDC</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Interest Rate</p>
                <p className="text-lg font-semibold">3.5% APR</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Loan Token</p>
                <p className="text-lg font-semibold flex items-center">
                  <span className="w-5 h-5 mr-1 bg-blue-100 rounded-full flex items-center justify-center text-xs">$</span>
                  USDC
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Collateral Token</p>
                <p className="text-lg font-semibold flex items-center">
                  <span className="w-5 h-5 mr-1 bg-blue-100 rounded-full flex items-center justify-center text-xs">Ξ</span>
                  ETH (2.5)
                </p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-sm text-gray-500">Repayment Progress</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">1,250 USDC paid</span>
                    <span className="mx-2 text-gray-500">of</span>
                    <span className="text-sm font-medium">5,175 USDC total</span>
                  </div>
                </div>
                <span className="text-sm font-medium text-blue-600">24%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-300">
                Repay Loan
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-800">Loan #27156</h4>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Active</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Started on March 3, 2023 • 25% LTV ratio</p>
          </div>
          
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Loan Amount</p>
                <p className="text-lg font-semibold">2,000 USDC</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Interest Rate</p>
                <p className="text-lg font-semibold">2.8% APR</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Loan Token</p>
                <p className="text-lg font-semibold flex items-center">
                  <span className="w-5 h-5 mr-1 bg-blue-100 rounded-full flex items-center justify-center text-xs">$</span>
                  USDC
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Collateral Token</p>
                <p className="text-lg font-semibold flex items-center">
                  <span className="w-5 h-5 mr-1 bg-yellow-100 rounded-full flex items-center justify-center text-xs">D</span>
                  DAI (2,400)
                </p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-sm text-gray-500">Repayment Progress</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">1,500 USDC paid</span>
                    <span className="mx-2 text-gray-500">of</span>
                    <span className="text-sm font-medium">2,056 USDC total</span>
                  </div>
                </div>
                <span className="text-sm font-medium text-blue-600">73%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '73%' }}></div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-300">
                Repay Loan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard