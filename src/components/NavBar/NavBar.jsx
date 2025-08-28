import React, { useContext } from 'react'
import styles from "./NavBar.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { tokenContext } from '../../context/tokenContext'
import { useGetCart } from './../../hooks/cartHooks';
import Badge from '../common/Badge/Badge';
import { useGetWishlist } from '../../hooks/wishlistHooks';
import freshcartLogo from "../../assets/images/freshcart-logo.svg";

export default function NavBar() {
  const { token, setToken } = useContext(tokenContext)
  const { data, isLoading } = useGetCart()
  const {data:WishlistData,isLoading:isLoadingWishlist}=useGetWishlist()
  
  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("userToken")
    setToken(null)
    navigate("/login")
  }
  return (
    <>
      <nav className="navbar shadow-sm navbar-expand-lg bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
          <img src={freshcartLogo} alt="Freshcart Logo" />
          </Link>
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
              {token ? <>
                <li className="nav-item">
                  <Link className="nav-link  " aria-current="page" to="/wishlist">
                    <span className="position-relative d-inline-block">
                      <i className=" cart text-success fa-solid fa-heart"></i>
                      {!isLoadingWishlist && WishlistData.count > 0 ?
                        <Badge numOfItems={WishlistData.count} /> : <Badge numOfItems={0} />}
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link  " aria-current="page" to="/cart">
                    <span className="position-relative d-inline-block">
                      <i className="cart text-success fa-solid fa-cart-shopping"></i>
                      {!isLoading && data?.numOfCartItems > 0 ?
                        <Badge numOfItems={data.numOfCartItems} /> : <Badge numOfItems={0} />
                      }
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn nav-link  " aria-current="page" onClick={handleLogout}>Log out</button>
                </li>
              </>
                : <>
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
