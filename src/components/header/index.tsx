import React from 'react';
import { Link } from "react-router-dom";

import './header.css'

const Header: React.FC<{active?: 'favorites' | 'home' | 'watchlist'}> = ({ active }) => (
  <header>
    <div className="container">
      <Link to="/reel-radar/">
        <img src="/reel-radar/favicon_io/android-chrome-192x192.png" className="logo" alt="ReelRadar logo" />
      </Link>
      <div>
        <h1>ReelRadar</h1>
        <h3>Explore the world of movies</h3>

        <nav>
          <Link to="/reel-radar/" className={active === 'home' ? 'active' : ''}>Home</Link>
          <Link to="/reel-radar/favorites" className={active === 'favorites' ? 'active' : ''}>Favorites</Link>
          <Link to="/reel-radar/later" className={active === 'watchlist' ? 'active' : ''}>Watchlist</Link>
        </nav>
      </div>
    </div>
  </header>
)

export default Header
