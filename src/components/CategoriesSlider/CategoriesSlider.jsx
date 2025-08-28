import React from 'react'
import styles from "./CategoriesSlider.module.css"
import API from '../../api'
import { useQuery } from '@tanstack/react-query'
import SliderSlick from 'react-slick'
import { useGetCategories } from '../../hooks/categoriesHooks'
import { Link } from 'react-router-dom';

export default function CategoriesSlider() {
 const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
   autoplaySpeed: 3000,
    arrows:true
  };
  const { data } = useGetCategories()
  return (
    <div id='slider' className='mb-5 '>
      <h3 className='mb-3 heading-underline'>Shop Popular Categories</h3>
      <SliderSlick {...settings}>
        {data?.map((categ) => (
          <div key={categ._id}>
            <Link to={`/categoryDetails/${categ._id}`}>
              <img loading='lazy' height={200} className='w-100 mb-2' src={categ.image} alt={categ.name} />
              <p>{categ.name}</p>
            </Link>
          </div>
        ))}
      </SliderSlick>
    </div>
  )
}
