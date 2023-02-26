import React from 'react'

import Header from './components/header';
import Footer from './components/footer';
import PopularMovies from './components/popular';
import Search from './components/search';

import './App.css'

const App: React.FC = () => {
  return (
    <>
      <Header />

      <div className="App">
        <Search />
        <PopularMovies />
      </div>

      <Footer />
    </>
  )
}

export default App
