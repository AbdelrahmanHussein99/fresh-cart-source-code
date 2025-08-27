

import React from 'react'
import styles from "./WishlistBtn.module.css"
import { useAddToWishlist, useGetWishlist, useRemoveWishlist } from '../../../hooks/wishlistHooks'

export default function WishlistBtn({ productId }) {
  const { data } = useGetWishlist()
  const { mutate: addToWishlist, isPending: isAdding } = useAddToWishlist()
  const { mutate: removeItemWishlist, isPending: isRemoving } = useRemoveWishlist()

  const inWishlist = data?.data?.some(item => item.id === productId)

  const handleClick = () => {
    if (inWishlist) {
      removeItemWishlist(productId)
    } else {
      addToWishlist(productId)
    }
  }

  return (
    <div className={`position-absolute border-0 end-0 ${styles.wishlistBtn}`}>
      <button 
        disabled={isAdding || isRemoving} 
        onClick={handleClick} 
        className={`btn border-0 ${styles.wishlistBtn}`}
      >
        {isAdding || isRemoving ? (
          <i className="fs-5 text-muted fa fa-spinner fa-spin"></i>
        ) : inWishlist ? (
          <i className="fs-5 text-danger fa-solid fa-heart"></i>
        ) : (
          <i className="fs-5 text-main fa-regular fa-heart"></i>
        )}
      </button>
    </div>
  )
}
