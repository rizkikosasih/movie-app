import React, { useEffect, useState } from 'react'
import { getPageList } from '../constants'
import { IoArrowBackCircle, IoArrowForwardCircle } from 'react-icons/io5'
import { Button, IconButton } from '@material-tailwind/react'

const Pagination = ({ isLoading, page, setPage, totalPages }) => {
  const [maxLength, setMaxLength] = useState(window.innerWidth < 480 ? 5 : 7)
  const pageList = getPageList(totalPages, page, maxLength)

  useEffect(() => {
    const handleResize = () => setMaxLength(window.innerWidth < 480 ? 5 : 7)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [maxLength])

  const getItemProps = (index) => (
    {
      variant: page === index ? 'filled' : 'text',
      color: 'blue',
      onClick: () => {
        if (page !== index) {
          setPage(index)
        }
      },
      className: 'rounded-full',
    }
  )

  const next = () => {
    if (page === totalPages) return

    setPage(page + 1)
  };

  const prev = () => {
    if (page === 1) return

    setPage(page - 1)
  };

  return (
    <div className='justify-center mt-8' style={{ display: isLoading ? 'none' : 'flex' }}>
      <div className='movie-pagination'>
        <Button
          variant='text'
          color='blue'
          className='rounded-full p-1'
          onClick={prev}
          disabled={page === 1}
        >
          <IoArrowBackCircle className='wh-8' />
        </Button>

        <div className='flex items-center gap-2'>
          {pageList?.map((item, index) => {
            return (
              <IconButton key={index} {...getItemProps(item)} disabled={!item} >{item || '...'}</IconButton>
            )
          })}
        </div>

        <Button
          variant='text'
          color='blue'
          className='rounded-full p-1'
          onClick={next}
          disabled={page === totalPages}
        >
          <IoArrowForwardCircle className='wh-8' />
        </Button>
      </div>
    </div>
  )
}

export default Pagination
