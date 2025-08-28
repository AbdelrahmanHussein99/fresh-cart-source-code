import React, { useEffect, useState } from 'react'
import styles from "./Products.module.css"
import { useGetProducts } from '../../hooks/productsHooks'
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner'
import ErrorAlert from '../common/ErrorAlert/ErrorAlert'
import ProductCard from '../common/ProductCard/ProductCard'
import Pagination from '../Pagination/Pagination'
export default function Products() {
  const [page, setPage] = useState(1);
  const limit = 20;
  const { data, isLoading, isError, error } = useGetProducts(page,limit)
    if (isLoading) return <LoadingSpinner/>
  if (isError) {
    const message = error.response?.data?.message || error.message || "Something went wrong"
    return <ErrorAlert message={message} />
  }
  return (
    <>
      <title>Products</title>
      <div className="row">
        <div>
          <h2 className="my-3 heading-underline">Products</h2>
        </div>
        {
          data.data.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        }
      </div>
      <Pagination totalPages={data.metadata.numberOfPages} currentPage={page} onPageChange={setPage } />
    </>
  );
}
