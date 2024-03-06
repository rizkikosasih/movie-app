import React, { useLayoutEffect, useState } from 'react'
import { generateUrl } from '../constants'
import noImage from './../assets/svg/noImage.svg'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react"
import Loader from './Loader'

const Modal = ({ modalId, setShowModal, handleClickDetail }) => {
  const [movie, setMovie] = useState(null)
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getMovie = async () => {
    const url = generateUrl({ i: modalId, plot: 'full' })
    setIsLoading(true)
    const response = await fetch(url)
    const json = await response.json()
    setIsLoading(false)

    if (!json.Error) {
      setMovie(json)
      setOpen(true)
    } else {
      console.info(json.Error)
      setOpen(false)
      setShowModal(false)
    }
  }

  useLayoutEffect(() => {
    getMovie()
  }, [])

  return (
    <>
      {isLoading ?
        <Loader /> :
        <Dialog
          open={open}
          size={'lg'}
          handler={handleClickDetail}
        >
          <DialogHeader>Movie Detail</DialogHeader>
          <DialogBody className='dialog-body'>
            <div className='movie-detail'>
              <div className='w-1/2 flex justify-center'>
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : noImage}
                  className="poster-image"
                  loading='lazy'
                />
              </div>

              <div className='w-1/2 flex flex-col justify-center'>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  {movie.Title}
                </Typography>

                <table>
                  <tbody>
                    <tr>
                      <td>Released</td>
                      <td>{':'}</td>
                      <td>{movie.Released}</td>
                    </tr>
                    <tr>
                      <td>Language</td>
                      <td>{':'}</td>
                      <td>{movie.Language}</td>
                    </tr>
                    <tr>
                      <td>Country</td>
                      <td>{':'}</td>
                      <td>{movie.Country}</td>
                    </tr>
                    <tr>
                      <td>Runtime</td>
                      <td>{':'}</td>
                      <td>{movie.Runtime}</td>
                    </tr>
                    <tr>
                      <td>Type</td>
                      <td>{':'}</td>
                      <td>{movie.Type}</td>
                    </tr>
                    <tr>
                      <td>Genre</td>
                      <td>{':'}</td>
                      <td>{movie.Genre}</td>
                    </tr>
                    <tr>
                      <td>Director</td>
                      <td>{':'}</td>
                      <td>{movie.Director}</td>
                    </tr>
                    <tr>
                      <td>Actors</td>
                      <td>{':'}</td>
                      <td>{movie.Actors}</td>
                    </tr>
                    <tr>
                      <td>Writer</td>
                      <td>{':'}</td>
                      <td>{movie.Writer}</td>
                    </tr>
                    <tr>
                      <td>Awards</td>
                      <td>{':'}</td>
                      <td>{movie.Awards}</td>
                    </tr>
                  </tbody>
                </table>

              </div>

              <div className='w-10/12 mt-4 mx-auto'>
                <div>
                  <Typography className='font-semibold text-black-500'>
                    Plot :
                  </Typography>

                  <Typography className="font-normal text-black-500">
                    {movie.Plot}
                  </Typography>
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="gradient"
              color="red"
              onClick={handleClickDetail}
              className="mr-1"
            >
              <span>Close</span>
            </Button>
          </DialogFooter>
        </Dialog>
      }
    </>
  )
}

export default Modal
