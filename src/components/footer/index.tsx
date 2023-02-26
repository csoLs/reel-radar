import React from 'react';

import TMDBLogo from '../../assets/tmdb.svg';

import './footer.css'

const Footer: React.FC = () => (
  <footer>
    <h5>Powered by</h5>
    <a href="" target="_blank" rel='noreferrer noopener'>
      <img src={TMDBLogo} alt="The movie database logo" />
    </a>
  </footer>
)

export default Footer
