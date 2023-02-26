import { useState } from 'react'

import './App.css'

import PopularMovies from './components/popular';
import Search from './components/search';

function App() {
  return (
    <div className="App">
      <div>
        <a href="/">
          <img src="/favicon_io/android-chrome-192x192.png" className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>ReelRadar</h1>

      <Search />
      <PopularMovies />
    </div>
  )
}

export default App
