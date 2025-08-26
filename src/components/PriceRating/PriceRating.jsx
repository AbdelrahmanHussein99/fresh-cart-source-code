import React from 'react'
import styles from "./PriceRating.module.css"
export default function PriceRating({price,rating}) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <p >{price} EGP</p>
      <p><i className='fa fa-star rating-color'></i>{ rating}</p>
    </div>
  )
}
