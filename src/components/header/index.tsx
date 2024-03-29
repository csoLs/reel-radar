import React from 'react';
import { Link, NavLink } from "react-router-dom";

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
          <NavLink to="/reel-radar/">Home</NavLink>
          <NavLink to="/reel-radar/favorites">Favorites</NavLink>
          <NavLink to="/reel-radar/later">Watchlist</NavLink>
        </nav>
      </div>
    </div>
  </header>
)

export default Header
