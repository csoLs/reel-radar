import React from 'react';

import TMDBLogo from '../../assets/tmdb.svg';

import './footer.css'

const Footer: React.FC = () => (
  <footer>
    <h5>Powered by</h5>
    <a href="https://www.themoviedb.org" target="_blank" rel='noreferrer noopener'>
      <img src={TMDBLogo} alt="The movie database logo" />
    </a>
    <p>ReelRadar uses the TMDb API but is not endorsed or certified by TMDb.</p>
  </footer>
)

export default Footer
