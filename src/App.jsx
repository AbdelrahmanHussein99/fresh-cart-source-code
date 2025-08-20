import React, { useContext, useEffect } from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
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

export default function App() {
const{setToken}=useContext(tokenContext)
  useEffect(() => {
    localStorage.getItem("userToken")&& setToken(localStorage.getItem("userToken"))
  },[])
const routes=  createBrowserRouter([{
    path: "/", element: <Layout />, children: [
      
      { index:true, element:<ProtectedRoutes> <Home /></ProtectedRoutes> },
      { path: "home", element:<ProtectedRoutes> <Home /></ProtectedRoutes> },
      { path: "products", element:<ProtectedRoutes> <Products /></ProtectedRoutes> },
      { path: "categories", element:<ProtectedRoutes> <Categories /> </ProtectedRoutes>},
      { path: "cart", element:<ProtectedRoutes> <Cart /> </ProtectedRoutes>},
      { path: "brands", element:<ProtectedRoutes> <Brands /></ProtectedRoutes> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },





      { path: "*", element: <NotFound /> },
    ]
}])

  return (
    <RouterProvider router={routes}/>
  )
}
