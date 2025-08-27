import React from 'react'
import styles from "./Products.module.css"
import { useGetProducts } from '../../hooks/productsHooks'
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner'
import ErrorAlert from '../common/ErrorAlert/ErrorAlert'
import ProductCard from '../common/ProductCard/ProductCard'
export default function Products() {
   const {data,isLoading,isError,error } =useGetProducts()
    if (isLoading) return <LoadingSpinner/>
  if (isError) {
    const message = error.response?.data?.message || error.message || "Something went wrong"
    return <ErrorAlert message={message} />
  }
  return (
    <div className="row">
      <div>
      <h2 className="my-3 heading-underline">Products</h2>
      </div>
      {
        data.map(product => (
          <ProductCard key={product._id} product={product} />
        ))
      }
    </div>
  )
}
