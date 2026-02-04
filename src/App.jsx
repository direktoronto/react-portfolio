import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>React Portfolio</h1>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}
