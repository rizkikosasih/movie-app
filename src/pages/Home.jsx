import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Modal from '../components/Modal'
import Movie from '../components/Movie'
import { generateUrl } from '../constants'
import SearchBox from '../components/SearchBox'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'

const Home = () => {
  const [showModal, setShowModal] = useState(null)
  const [modalId, setModalId] = useState(null)
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('spider')
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)

  const getMovieList = async (search = 'spider', page = 1) => {
    const url = generateUrl({ s: search, page: page })
    setIsLoading(true)
    const response = await fetch(url)
    const json = await response.json()
    setIsLoading(false)

    if (json.Search) {
      setMovies(json.Search)
      setPage(page)
      setTotalPages(Math.ceil(json.totalResults / 10))
    } else {
      setPage(page)
      setTotalPages(1)
      setMovies([])
    }
  }

  const handleClickDetail = evt => {
    if (showModal) {
      setModalId(null)
    } else {
      const { target: { dataset: { id } } } = evt
      setModalId(id)
    }
    setShowModal(!showModal)
  }

  useEffect(() => {
    getMovieList(search, page)
  }, [search, page])

  return (
    <>
      <Banner />

      <div className='max-container-home'>
        <SearchBox setSearch={setSearch} search={search} setPage={setPage} />

        {isLoading ? <Loader /> : <Movie movies={movies} handleClickDetail={handleClickDetail} />}

        <Pagination isLoading={isLoading} page={page} setPage={setPage} totalPages={totalPages} />
      </div>

      {
        showModal &&
        <Modal
          className='flex items-center justify-center'
          modalId={modalId}
          handleClickDetail={handleClickDetail}
          setShowModal={setShowModal}
        />
      }
    </>
  )
}

export default Home
