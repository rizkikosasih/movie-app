import React, { useEffect, useRef } from 'react'
import { Input } from '@material-tailwind/react'

const SearchBox = ({ setSearch, setPage }) => {
  const handleSearch = evt => {
    const { target } = evt
    const { value } = target
    setPage(1)

    if (value) {
      setSearch(value)
    } else {
      setSearch('spider')
    }
  }

  return (
    <>
      <div className='w-full mb-4'>
        <Input size='lg' color='blue' label='Search Movie' onInput={handleSearch} autoFocus />
      </div>
    </>
  )
}

export default SearchBox
