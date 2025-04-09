import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="container">
    <Sidebar />
    <main className="content">
      <Header />
      {children}
    </main>
  </div>
)

export default Layout
