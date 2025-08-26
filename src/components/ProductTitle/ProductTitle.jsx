import React from 'react'
import styles from "./ProductTitle.module.css"
export default function ProductTitle({title,limit=3,className="h5"}) {
   const shortTitle = title.split(" ").slice(0, limit).join(" ");
  return <h2 className={className}>{shortTitle}</h2>;
}
