import React from 'react'
import styles from "./Categories.module.css"
import { useGetCategories } from '../../hooks/categoriesHooks'
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert/ErrorAlert';
import { Link } from 'react-router-dom';
import ProductTitle from '../ProductTitle/ProductTitle';
import CategoriesBrandsCard from '../common/CategoriesBrandsCard/CategoriesBrandsCard';
export default function Categories() {
  const { data, isLoading, isError, error } = useGetCategories();
  console.log(data);
  
  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    const message = error.response?.data?.message || error.message || "Something went wrong"
    return < ErrorAlert message={message}/>
  }
  return (
    <div className="row">
      <div>
        <h2 className='my-3 heading-underline'>Categories</h2>
      </div>
      {
        data.map(category => (
          <CategoriesBrandsCard key={category._id} data={category} title={"category"} />
        ))
      }
    </div>
  )
}
