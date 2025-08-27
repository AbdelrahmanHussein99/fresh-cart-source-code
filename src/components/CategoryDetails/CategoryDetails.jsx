import React from 'react'
import styles from "./CategoryDetails.module.css"
import { useGetCategoryById } from '../../hooks/categoriesHooks';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert/ErrorAlert';
import { useParams } from 'react-router-dom';
import ProductTitle from '../ProductTitle/ProductTitle';
import { useGetSubategoriesOnCategory } from '../../hooks/subcategoryHooks';
import { useGetProducts } from '../../hooks/productsHooks';
import ProductCard from '../common/ProductCard/ProductCard';
export default function CategoryDetails() {
  const {id}=useParams()
  
  const { data: category, isLoading, isError, error } = useGetCategoryById(id);
  const { data: subcategory = [] } = useGetSubategoriesOnCategory(id)
  const { data: products =[]} = useGetProducts();
  const fliterProductsByCategory = products.filter(product => product.category._id === id);
  console.log(fliterProductsByCategory);
  
    if (isLoading) return <LoadingSpinner />;
    if (isError) {
      const message = error.response?.data?.message || error.message || "Something went wrong"
      return < ErrorAlert message={message}/>
    }
  return (
    <>
      <div className="row mb-3  py-4  ">
        <div className="col-md-4 bg-secondary-subtle p-2 rounded">
          <img height={300} loading="lazy" src={category.image} className='w-100 rounded-3' alt={category.name} />
        </div>
        <div className="col-md-8 ">
          <ProductTitle title={category.name} limit={10} className="h2" />
          <p>Subcategories:</p>
          <ul className=' d-flex list-unstyled flex-wrap gap-2'>
            {subcategory.map(ele => (
              <li className=' bg-success rounded-3 px-3 py-2 text-white shadow-sm  ' key={ele._id} >{ele.name}</li>
            ))}
          </ul>
        </div>
      </div>
      {fliterProductsByCategory.length > 0 &&
        <div className="row ">
          <div>
            <h2 className='mb-3 heading-underline'>Products</h2>
          </div>
          {fliterProductsByCategory.map(product => <ProductCard key={product._id} product={product} />)}
        </div>}
    </>
  )
}
