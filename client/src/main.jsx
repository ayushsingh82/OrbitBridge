import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home.jsx'
import Dashboard from './Components/Dashboard.jsx'
import PayNow from './Components/PayNow.jsx'
// Import any other components you want to route to
// For example:
// import About from './Components/About.jsx'
// import Contact from './Components/Contact.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pay" element={<PayNow />} />
          {/* Add more routes as needed, for example: */}
          {/* <Route path="about" element={<About />} /> */}
          {/* <Route path="contact" element={<Contact />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
