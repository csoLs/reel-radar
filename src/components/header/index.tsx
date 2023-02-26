import React from 'react';

import './header.css'

const Header: React.FC = () => (
  <header>
    <div>
      <a href="/">
        <img src="/favicon_io/android-chrome-192x192.png" className="logo" alt="ReelRadar logo" />
      </a>
      <div>
        <h1>ReelRadar</h1>
        <h3>Explore the world of movies</h3>
      </div>
    </div>
  </header>
)

export default Header
