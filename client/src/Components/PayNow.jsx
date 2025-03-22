import React, { useState } from 'react'

function PayNow() {
  const [paymentData, setPaymentData] = useState({
    recipient: '',
    amount: '',
    token: 'USDC'
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  
  // Available tokens
  const tokens = [
    { symbol: 'USDC', name: 'USD Coin', icon: '💵' },
    { symbol: 'ETH', name: 'Ethereum', icon: '⧫' },
    { symbol: 'DAI', name: 'Dai Stablecoin', icon: '🔶' }
  ]
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setPaymentData({
      ...paymentData,
      [name]: value
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)
    
    try {
      // Here you would integrate with your payment processing logic
      // For now, we'll just simulate a successful payment after a delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setMessage({
        type: 'success',
        text: `Payment of ${paymentData.amount} ${paymentData.token} sent to ${paymentData.recipient} successfully!`
      })
      
      // Reset form
      setPaymentData({
        recipient: '',
        amount: '',
        token: 'USDC'
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: `Payment failed: ${error.message}`
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Make a Payment</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-xl mx-auto">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <p className="text-gray-600 text-sm">
            Send funds instantly using zkSync for near-instant settlements with minimal fees.
          </p>
        </div>
        
        {message && (
          <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="recipient" className="block text-gray-700 font-medium mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              id="recipient"
              name="recipient"
              value={paymentData.recipient}
              onChange={handleChange}
              placeholder="0x..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Enter the wallet address of the recipient</p>
          </div>
          
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
              Amount
            </label>
            <div className="flex">
              <input
                type="number"
                id="amount"
                name="amount"
                value={paymentData.amount}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                name="token"
                value={paymentData.token}
                onChange={handleChange}
                className="px-4 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md focus:outline-none"
              >
                {tokens.map(token => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.icon} {token.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Estimated fee: 0.0001 ETH (~$0.25)
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium rounded-md transition-colors duration-300`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Make Payment'}
          </button>
        </form>
      </div>
      
      <div className="max-w-xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-medium">Payment Information:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>All payments are processed via zkSync for near-instant confirmations</li>
          <li>Transaction fees are minimized through Layer 2 technology</li>
          <li>Always double-check recipient addresses before sending</li>
          <li>Your transaction will be verifiable on-chain and private with zero-knowledge proofs</li>
        </ul>
      </div>
    </div>
  )
}

export default PayNow