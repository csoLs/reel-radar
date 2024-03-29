import React from "react"
import { Outlet } from "react-router-dom"

import Header from './header'
import Footer from './footer'

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <div className="App">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout
