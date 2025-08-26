import React from 'react'
import styles from "./Slider.module.css"
import SliderSlick from 'react-slick'
export default function Slider({imgs=[]}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
        <SliderSlick {...settings}>
        {imgs.map((img, i) => (
          <div key={i}>
          <img className='w-100' src={img} alt={`img slider ${i}`} /> 
          </div>
      ))}
        </SliderSlick>
  )
}
