import React from 'react'
import styles from "./WishlistBtn.module.css"
import { useAddToWishlist } from '../../../hooks/wishlistHooks'
export default function WishlistBtn({ productId}) {
  const {mutate:addToWishlist,isPending }=useAddToWishlist()
  return (
    <div className="position-absolute end-0 ">
      <button disabled={isPending} onClick={()=>addToWishlist(productId)}  className=" btn " >{isPending ? <i className=" fs-5 text-main fa-regular fa-heart"></i>  : <i className=" fs-5 text-main fa-regular fa-heart"></i> }</button>
    </div>
  )
}
