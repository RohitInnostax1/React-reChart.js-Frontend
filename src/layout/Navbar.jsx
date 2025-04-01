import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div>

<nav className="navbar navbar-expand-lg navbar-dark bg-warning">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">CRUD Application using react And SpringBoot</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  <Link className='btn btn-outline-light' to="/chartView">Plot View</Link>
  <Link className='btn btn-outline-light' to="/add/smartPhone">Add Data</Link>
  </div>
</nav>
    </div>

  )
}
