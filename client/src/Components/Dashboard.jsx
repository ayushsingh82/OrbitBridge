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
      <h1 className="text-3xl font-bold mb-6">Your Credit Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Account Overview</h2>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            KYC Verified via World ID
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-500">Total Credit Limit</p>
            <p className="text-2xl font-bold">7,000 USDC</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-500">Total Balance</p>
            <p className="text-2xl font-bold">7,500 USDC</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-500">Total Collateral</p>
            <p className="text-2xl font-bold">10,000 USDC</p>
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
      
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-medium">About our credit system:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>KYC verification through World ID ensures privacy and security</li>
          <li>All transactions are processed via zkSync for near-instant settlements</li>
          <li>Collateralized credit offers better rates and flexible credit limits</li>
          <li>Your assets remain secure through smart contracts</li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard