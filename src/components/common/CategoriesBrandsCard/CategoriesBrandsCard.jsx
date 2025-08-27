import React from 'react'
import styles from "./CategoriesBrandsCard.module.css"
import { Link } from 'react-router-dom'
import ProductTitle from '../../ProductTitle/ProductTitle'
export default function CategoriesBrandsCard({data,title}) {
  return (
    <div className=" col-md-3 col-sm-6 mb-4">
      <div className="product  bg-light cursor-pointer overflow-hidden px-2 py-2 rounded-3">
        <Link className="cursor-pointer" to={`/${title}Details/${data._id}`}>
          <div className=" mb-1">
            <img height={300} loading="lazy" src={data.image} className='w-100' alt={data.name} />
          </div>
          <ProductTitle title={data.name} className="h5 text-truncate" />
        </Link>
      </div>
    </div>
  )
}
