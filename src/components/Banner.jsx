import { useState, useLayoutEffect } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { generateUrl } from '../constants';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
  const [movies, setMovies] = useState([]);

  const getBannerList = async () => {
    const url = generateUrl({ s: 'star wars' });

    const response = await fetch(url);
    const json = await response.json();

    if (json.Search) {
      setMovies(json.Search);
    }
  };

  useLayoutEffect(() => {
    getBannerList();
  }, []);

  return (
    <>
      <Swiper
        loop={true}
        navigation={true}
        lazyPreloadPrevNext={true}
        className={'mySwiper'}
        grabCursor={true}
        slidesPerView={'auto'}
        spaceBetween={10}
        pagination={{
          type: 'progressbar'
        }}
        modules={[Pagination, Navigation]}>
        {movies.map((item) => {
          return (
            <SwiperSlide key={item.imdbID}>
              <img
                loading="lazy"
                alt=""
                src={item.Poster}
                className="rounded-md shadow-md"
              />
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Banner;
