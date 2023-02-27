import React from 'react'

import Header from '../../components/header';
import Footer from '../../components/footer';

const LaterPage: React.FC = () => {
  return (
    <>
      <Header active="watchlist" />

      <div className="App">
        'later'
      </div>

      <Footer />
    </>
  )
}

export default LaterPage
