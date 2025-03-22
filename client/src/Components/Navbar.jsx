import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-xl">Credit Z</Link>
        <div className="space-x-4">
     
          <Link to="/dashboard" className="hover:text-blue-100 transition-colors duration-200">Dashboard</Link>
          <Link to="/pay" className="hover:text-blue-100 transition-colors duration-200">Pay Now</Link>
          {/* Add more navigation links as needed */}
          {/* <Link to="/about" className="hover:text-gray-300">About</Link> */}
          {/* <Link to="/contact" className="hover:text-gray-300">Contact</Link> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar