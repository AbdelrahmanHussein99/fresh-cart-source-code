import React from 'react'
import styles from "./Brands.module.css"
import { useGetBrands } from '../../hooks/brandsHooks'
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert/ErrorAlert';
import { Link } from 'react-router-dom';
import ProductTitle from '../ProductTitle/ProductTitle';
import CategoriesBrandsCard from '../common/CategoriesBrandsCard/CategoriesBrandsCard';
export default function Brands() {
  const { data, isLoading, isError, error } = useGetBrands();
  if (isLoading) return <LoadingSpinner />;
    if (isError) {
      const message = error.response?.data?.message || error.message || "Something went wrong"
      return < ErrorAlert message={message}/>
    }
  return (
    <>
      <title>Brands</title>
      <div className="row">
        <div>
          <h2 className='my-3 heading-underline'>Categories</h2>
        </div>
        {
          data.map(brand => (
            <CategoriesBrandsCard key={brand._id} data={brand} title={"brand"} />
          ))
        }
    
      </div>
    </>
  )
}
