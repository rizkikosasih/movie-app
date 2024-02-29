import React from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import generateParams from '../hooks/generateParams'

const Banner = () => {
  console.info(generateParams({
    q: 'dogs',
    act: 'find',
    type: ['good', 'beautiful', 'husky'],
    v: 2
  }))

  return (
    <>
      <Swiper
        loop={true}
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
      </Swiper>
    </>
  )
}

export default Banner
