import React from 'react'
import styles from "./ProductDetails.module.css"
import { useParams } from 'react-router-dom'
import API from '../../api'
import { useQuery } from '@tanstack/react-query'
import AddToCart from '../common/AddToCart/AddToCart'
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner'
import PriceRating from '../PriceRating/PriceRating'
import ErrorAlert from '../common/ErrorAlert/ErrorAlert'
import ProductTitle from './../ProductTitle/ProductTitle';
import Slider from '../Slider/Slider'
export default function ProductDetails() {
  const { id } = useParams()
  
  async function getProductById(){
      const { data } = await API.get(`/products/${id}`)
      return data.data
  }
  const { data,isLoading,isError,error } = useQuery({
    queryKey: ["product", id],
    queryFn: getProductById,
    staleTime: 1000 * 60 * 5,
    gcTime:1000*60*10
  })
  if (isLoading) {
    return <LoadingSpinner/>
  }
  
  if (isError) {
    const message = error.response?.data?.message || error.message || "Something went wrong"
    return <ErrorAlert message={message}/>
  }
  return (
    <>
      <div className="row  py-4 align-items-center">
        <div className="col-md-4">
          <Slider imgs={ data.images}  />
          {/* <img className='w-100' src={data.imageCover} alt={data.title} /> */}
        </div>
        <div className="col-md-8 ">
          <ProductTitle title={data.title} limit={10} className="h2" />
          <p className='text-muted'>{data.description}</p>
          <p>{data.category.name}</p>
          <PriceRating price={data.price} rating={data.ratingsAverage}/>
          <AddToCart/>
        </div>
      </div>
    </>
  )
}
