import React from 'react'
import styles from "./ProductCard.module.css"
import ProductTitle from '../../ProductTitle/ProductTitle'
import PriceRating from '../../PriceRating/PriceRating'
import AddToCart from '../AddToCart/AddToCart'
import WishlistBtn from '../WishlistBtn/WishlistBtn'
import { Link } from 'react-router-dom'
export default function ProductCard({product}) {
  return (
    <div  className=" col-md-3 col-sm-6 mb-4">
      <div className="product position-relative bg-light cursor-pointer overflow-hidden px-2 py-2 rounded-3">
        <WishlistBtn productId={product._id} />
        <Link className="cursor-pointer" to={`/productDetails/${product._id}`}>
          <div className=" mb-1">
            <img loading="lazy" src={product.imageCover} className='w-100' alt={product.title} />
          </div>
          <p className='text-main'>{product.category.name}</p>
          {/* <h3 className="h5 text-truncate">{product.title.split(" ").slice(0,3).join(" ")}</h3> */}
          <ProductTitle title={product.title} className="h5 text-truncate" />
          <PriceRating price={product.price} rating={product.ratingsAverage} />
        </Link>
        <AddToCart productId={product._id} />
      </div>
    </div>
  )
}
