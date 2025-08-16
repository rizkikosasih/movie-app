import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Movie from '../components/movie/Movie.jsx';
import { generateUrl } from '../constants';
import SearchBox from '../components/SearchBox';
import Pagination from '../components/Pagination';
import MovieDetail from '../components/movie/MovieDetail.jsx';
import Loader from '../components/loading/Loader.jsx';
import DynamicModal from '../components/global/DynamicModal.jsx';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('spider');
  const [isLoading, setisLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const getMovieList = async (search = 'spider', page = 1) => {
    const url = generateUrl({ s: search, page: page });
    setisLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const response = await fetch(url).then((res) => res.json());
    setisLoading(false);

    if (response.Search) {
      setMovies(response.Search);
      setPage(page);
      setTotalPages(Math.ceil(response.totalResults / 10));
    } else {
      setPage(page);
      setTotalPages(1);
      setMovies([]);
    }
  };

  const handleClickDetail = async (id) => {
    setLoading(true);
    try {
      const url = generateUrl({ i: id, plot: 'full' });
      const response = await fetch(url);
      const data = await response.json();

      setDetail(data);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setDetail(null), 200);
  };

  useEffect(() => {
    getMovieList(search, page);
  }, [search, page]);

  return (
    <>
      <Banner />

      <div className="max-container-home">
        <SearchBox setSearch={setSearch} search={search} setPage={setPage} />

        <div className="head-text mb-3">Movie</div>
        <div className="movie-wrapper">
          <Movie
            movies={movies}
            isLoading={isLoading}
            handleClickDetail={handleClickDetail}
          />
        </div>

        <Pagination
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>

      {loading && <Loader />}

      <DynamicModal
        id="movie-modal"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={detail?.Title}>
        {detail && <MovieDetail movie={detail} />}
      </DynamicModal>
    </>
  );
};

export default Home;
