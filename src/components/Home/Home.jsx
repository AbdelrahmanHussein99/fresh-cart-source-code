import React from 'react'
import styles from "./Home.module.css"
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
export default function Home() {
  return (
    <>
      <title>Fresh cart</title>
      <div className=" py-5">
        <CategoriesSlider/>
        <FeatureProducts/>
      </div>
    </>
  )
}
