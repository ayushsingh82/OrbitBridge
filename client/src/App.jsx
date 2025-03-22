import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
