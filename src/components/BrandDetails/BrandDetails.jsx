import React, { useState } from 'react'
import styles from "./BrandDetails.module.css"
import { useParams } from 'react-router-dom'
import { useGetBrandById } from '../../hooks/brandsHooks'
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner'
import ErrorAlert from '../common/ErrorAlert/ErrorAlert'
import { useGetProducts } from '../../hooks/productsHooks'
import ProductCard from '../common/ProductCard/ProductCard'
import ProductTitle from '../ProductTitle/ProductTitle'
import Pagination from '../Pagination/Pagination'
export default function BrandDetails() {
  const { id } = useParams()
    const [page, setPage] = useState(1);
    const limit = 40
  const { data: brand, isLoading, isError, error } = useGetBrandById(id)
  const { data: productsData = [] } = useGetProducts(page, limit)
  const products = productsData?.data || [];
  const filterProductsByBrand=products.filter(product=>product.brand._id===id)
  if (isLoading) return <LoadingSpinner />;
  
  if (isError) {
    const message = error.response?.data?.message || error.message || "Something went wrong"
    return < ErrorAlert message={message} />;
  };
  return (
    < >
      <div className="row mb-3  py-4  ">
        <div className="col-md-4 bg-secondary-subtle p-2 rounded">
          <img height={300} loading="lazy" src={brand.image} className='w-100 rounded-3' alt={brand.name} />
        </div>
        <div className="col-md-8 ">
          <ProductTitle title={brand.name} limit={10} className="h2" />
        </div>
      </div>
      {filterProductsByBrand.length > 0 ? <>
        <div className="row ">
          <div>
            <h2 className='mb-3 heading-underline'>Products</h2>
          </div>
          {filterProductsByBrand.map(product => <ProductCard key={product._id} product={product} />)}
        </div>
        <Pagination totalPages={productsData.metadata.numberOfPages} currentPage={page} onPageChange={setPage} />
      </> : <h2 className=' h1 dropShadow text-center text-main fw-bolder'>Products coming soon</h2>}
    </>
  )
}
