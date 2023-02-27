import React from 'react'

import Header from '../../components/header';
import Footer from '../../components/footer';
import Search from '../../components/search';

const SearchPage: React.FC = () => {
  return (
    <>
      <Header active="home" />

      <div className="App">
        <Search />
      </div>

      <Footer />
    </>
  )
}

export default SearchPage
