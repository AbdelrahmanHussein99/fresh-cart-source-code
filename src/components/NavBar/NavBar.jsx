import React, { useContext } from 'react'
import styles from "./NavBar.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { tokenContext } from '../../context/tokenContext'
export default function NavBar() {
  const { token ,setToken} = useContext(tokenContext)
  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("userToken")
    setToken(null)
    navigate("/login")
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container">
    <Link className="navbar-brand" to="/">freshCart</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {token && 
      <ul className="navbar-nav fs-6 me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/brands">Brands</Link>
        </li>
      </ul>
      }

      
      

      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {token?
        <li className="nav-item">
          <button className="nav-link " aria-current="page"  onClick={handleLogout}>Log out</button>
        </li>:<>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/login">Login</Link>
        </li>
        </>
        }
      
        
      </ul>

    </div>
  </div>
</nav>
    </>
  )
}
