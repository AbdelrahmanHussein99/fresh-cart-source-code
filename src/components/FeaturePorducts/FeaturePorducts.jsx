import React, { useEffect, useState } from 'react'
import styles from "./FeaturePorducts.module.css"
import API from '../../api'
import { HashLoader  } from "react-spinners";
import { useQuery } from '@tanstack/react-query';
export default function FeaturePorducts() {
// const [products,setProducts]=useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [errorMessage, setErrorMessage] = useState('')
  
  // async function getProducts() {
  //   try {
  //     setErrorMessage("")
  //     const { data } = await API.get("/products")
  //     setProducts(data.data)
  //     console.log(data);
  //   } catch (error) {
  //     setErrorMessage(error.response?.data?.message || "Something went wrong");
  //   } finally {
  //     setIsLoading(false)
  //   }
    
  // }
  // useEffect(() => {
  //   getProducts()
  // },[])

  const {data,isLoading,isError,error} = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await API.get("/products")
      console.log(data.data);
      return data.data
    }
  })
  console.log(data);
  if (isLoading) {
    return <div className="d-flex justify-content-center align-items-center vh-100  ">
      <HashLoader color="#4fa94d" size={80} />
    </div>
  }
  if (isError) {
    const message = error.response?.data?.message || error.message || "Something went wrong"
    return <div className="alert alert-danger">{message}</div>

  }
  return (
    <>
      <div className="row">
        {
          data.map(product => (
            <div key={product._id} className=" col-md-3 col-sm-6 mb-2">
              <div className="product cursor-pointer overflow-hidden px-2 py-2 rounded-3">
                <div className="">
                  <img src={ product.imageCover} className='w-100' alt={product.title} />
                </div>
                <p className='text-main'>{product.category.name}</p>
                <h5>{product.title.split(" ").slice(0,4).join(" ")}</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <p >{product.price} EGP</p>
                  <p><i className='fa fa-star rating-color'></i>{ product.ratingsAverage}</p>
                </div>
                <button className='btn bg-main w-100 text-white'>Add to cart</button>
              </div>
          </div>
          ))
        }

        </div>



      {/* {errorMessage&& <div className="alert alert-danger">{errorMessage}</div>}
      {isLoading?  (<div className="d-flex justify-content-center align-items-center vh-100  "><HashLoader  color="#4fa94d" size={80} /></div> ):
      <div className="row">
        {
          products.map(product => (
            <div key={product._id} className=" col-md-3 col-sm-6 mb-2">
              <div className="product cursor-pointer overflow-hidden px-2 py-2 rounded-3">
                <div className="">
                  <img src={ product.imageCover} className='w-100' alt={product.title} />
                </div>
                <p className='text-main'>{product.category.name}</p>
                <h5>{product.title.split(" ").slice(0,4).join(" ")}</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <p >{product.price} EGP</p>
                  <p><i className='fa fa-star rating-color'></i>{ product.ratingsAverage}</p>
                </div>
                <button className='btn bg-main w-100 text-white'>Add to cart</button>
              </div>
          </div>
          ))
        }

        </div> */}
      {/* } */}
    </>
  )
}
