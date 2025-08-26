import React from 'react'
import styles from "./AddToCart.module.css"
import { useAddToCart } from '../../../hooks/cartHooks'
export default function AddToCart({productId}) {

const{isPending,mutate}=useAddToCart()
  return (
    < >
      <button disabled={isPending} onClick={()=>mutate(productId)} className='btn bg-main w-100 text-white'>{isPending ? "Adding..." : "Add to cart"}</button>
    </>
  )
}
