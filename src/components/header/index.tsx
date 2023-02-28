import React from 'react';

import './header.css'

const Header: React.FC<{active?: 'favorites' | 'home' | 'watchlist'}> = ({ active }) => (
  <header>
    <div className="container">
      <a href="/">
        <img src="/favicon_io/android-chrome-192x192.png" className="logo" alt="ReelRadar logo" />
      </a>
      <div>
        <h1>ReelRadar</h1>
        <h3>Explore the world of movies</h3>

        <nav>
          <a href="/reel-radar/" className={active === 'home' ? 'active' : ''}>Home</a>
          <a href="/reel-radar/favorites" className={active === 'favorites' ? 'active' : ''}>Favorites</a>
          <a href="/reel-radar/later" className={active === 'watchlist' ? 'active' : ''}>Watchlist</a>
        </nav>
      </div>
    </div>
  </header>
)

export default Header
