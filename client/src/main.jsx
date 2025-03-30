import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Home from './Components/Home.jsx'
import Volume from './Components/Volume.jsx'
import RoutesPage from './Components/Routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/volume" element={<Volume />} />
          <Route path="/routes" element={<RoutesPage />} />
        </Route>
      </RouterRoutes>
    </BrowserRouter>
  </React.StrictMode>
)
