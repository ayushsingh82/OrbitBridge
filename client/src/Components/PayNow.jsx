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
    { symbol: 'WEth', name: 'Wrapped Ethereum', icon: '⧫' },
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Make a Payment</h1>
          <p className="text-gray-500 mb-8">Fast, secure transactions on zkSync</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-8">
          {message && (
            <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
                Recipient Address
              </label>
              <div className="mt-1">
                <input
                  id="recipient"
                  name="recipient"
                  type="text"
                  required
                  value={paymentData.recipient}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="0x..."
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  required
                  value={paymentData.amount}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                Token
              </label>
              <select
                id="token"
                name="token"
                value={paymentData.token}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {tokens.map(token => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.icon} {token.name} ({token.symbol})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Send Payment'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="text-xs text-gray-500 text-center">
              Powered by zkSync Layer 2 • Transactions confirm in seconds with minimal fees
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayNow