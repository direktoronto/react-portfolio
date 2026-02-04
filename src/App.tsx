import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'

export default function App(): JSX.Element {
  return (
    <div className="app">
      <header className="header">
        <h1>EventFinder</h1>
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
