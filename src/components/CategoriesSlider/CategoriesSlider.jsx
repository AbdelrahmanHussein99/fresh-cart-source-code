import React from 'react'
import styles from "./CategoriesSlider.module.css"
import API from '../../api'
import { useQuery } from '@tanstack/react-query'
import SliderSlick from 'react-slick'

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
  async function getCategories() {
    const { data=[] } = await API.get("/categories")
    return data.data
  }
  const { data } = useQuery({
    queryKey: ["categoiresSlider"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
    gcTime:1000 * 60 * 10,
  })
  console.log(data);
  
  return (
    <div id='slider' className='mb-5 '>
    <h3>Shop Popular Categories</h3>
    <SliderSlick {...settings}>
        {data?.map((categ) => (
          <div key={categ._id}>
          <img height={200} className='w-100 mb-2' src={categ.image} alt={categ.name} /> 
          <p>{categ.name}</p>
          </div>
      ))}
        </SliderSlick>
    </div>
  )
}
