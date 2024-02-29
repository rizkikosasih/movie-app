import React from 'react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <>
      <Banner />
      <div className='max-container'>
        <div className='font-semibold text-2xl'>Hello World</div>
      </div>
    </>
  )
}

export default Home
