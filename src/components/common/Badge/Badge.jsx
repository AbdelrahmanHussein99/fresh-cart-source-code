import React from 'react'
import styles from "./Badge.module.css"
export default function Badge({numOfCartItems}) {
  return (
    <span className=" position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >
    {numOfCartItems}
    </span>
  
  )
}
