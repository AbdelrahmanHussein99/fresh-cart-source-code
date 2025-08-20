import React from 'react'
import styles from "./Home.module.css"
import FeaturePorducts from '../FeaturePorducts/FeaturePorducts'
export default function Home() {
  return (
    <>
      <div className="container py-5">

      <FeaturePorducts/>
      </div>
    </>
  )
}
