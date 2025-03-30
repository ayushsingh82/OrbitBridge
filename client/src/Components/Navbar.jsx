import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-xl flex items-center">
          <span className="mr-2">🔄</span>OrbitBridge
        </Link>
        <div className="space-x-4">
          <Link to="/volume" className="hover:text-indigo-200 transition-colors duration-200">Volume</Link>
          <Link to="/routes" className="hover:text-indigo-200 transition-colors duration-200">Routes</Link>
       
          <Link to="/rollups" className="hover:text-indigo-200 transition-colors duration-200">Leaderboard</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar