import React from 'react'
import styles from "./Badge.module.css"
export default function Badge({ numOfItems }) {
  if(numOfItems===0) return null
  return (
    <span className=" position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >
    {numOfItems}
    </span>
  
  )
}
