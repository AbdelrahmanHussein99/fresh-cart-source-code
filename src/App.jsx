import React, { useContext, useEffect } from 'react'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { tokenContext } from './context/tokenContext';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import AuthProtectedRoutes from './components/AuthProtectedRoutes/AuthProtectedRoutes';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { Toaster } from 'react-hot-toast';
import Wishlist from './components/Wishlist/Wishlist';
import CategoryDetails from './components/CategoryDetails/CategoryDetails';
import BrandDetails from './components/BrandDetails/BrandDetails';
import UserAddress from './components/UserAddress/UserAddress';
import AllOrders from './components/AllOrders/AllOrders';
import CashUserAddress from './components/CashUserAddress/CashUserAddress';
import ErrorPage from './components/ErrorPage/ErrorPage';

export default function App() {
const{setToken}=useContext(tokenContext)
  useEffect(() => {
    localStorage.getItem("userToken")&& setToken(localStorage.getItem("userToken"))
  },[])
const routes=  createBrowserRouter([{
    path: "/", element: <Layout />,errorElement: <ErrorPage />, children: [
      
      { index:true, element:<ProtectedRoutes> <Home /></ProtectedRoutes> },
      { path: "home", element:<ProtectedRoutes> <Home /></ProtectedRoutes> },
      { path: "products", element:<ProtectedRoutes> <Products /></ProtectedRoutes> },
      { path: "productDetails/:id", element:<ProtectedRoutes> <ProductDetails /></ProtectedRoutes> },
      { path: "categoryDetails/:id", element:<ProtectedRoutes> <CategoryDetails /></ProtectedRoutes> },
      { path: "brandDetails/:id", element:<ProtectedRoutes> <BrandDetails /></ProtectedRoutes> },
      { path: "categories", element:<ProtectedRoutes> <Categories /> </ProtectedRoutes>},
      { path: "cart", element:<ProtectedRoutes> <Cart /> </ProtectedRoutes>},
      { path: "wishlist", element:<ProtectedRoutes> <Wishlist /> </ProtectedRoutes>},
      { path: "userAddress", element:<ProtectedRoutes> <UserAddress /> </ProtectedRoutes>},
      { path: "cashUserAddress", element:<ProtectedRoutes> <CashUserAddress /> </ProtectedRoutes>},
      { path: "allorders", element:<ProtectedRoutes> <AllOrders /> </ProtectedRoutes>},
    { path: "brands", element: <ProtectedRoutes> <Brands /></ProtectedRoutes> },
      

      { path: "login", element:<AuthProtectedRoutes> <Login /></AuthProtectedRoutes> },
      { path: "register", element:<AuthProtectedRoutes> <Register /> </AuthProtectedRoutes>},





      { path: "*", element: <NotFound /> },
    ]
}])

  return (
    <>
    <RouterProvider router={routes} />
      <Toaster position="top-right" reverseOrder={false} />
      </>
  )
}
