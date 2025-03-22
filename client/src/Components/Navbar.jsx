import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-xl">Your App Name</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          {/* Add more navigation links as needed */}
          {/* <Link to="/about" className="hover:text-gray-300">About</Link> */}
          {/* <Link to="/contact" className="hover:text-gray-300">Contact</Link> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar