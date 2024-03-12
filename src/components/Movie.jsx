import React from 'react';
import noImage from './../assets/svg/noImage.svg';
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';

const Movie = ({ movies, handleClickDetail }) => {
  return (
    <>
      <div className="head-text mb-3">Movie</div>
      {movies.length ? (
        <div className="movie-wrapper">
          {movies.map((item) => {
            return (
              <div className="col" key={item.imdbID}>
                <Card className="w-full overflow-hidden">
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 rounded-none">
                    <img
                      loading="lazy"
                      className="movie-image cursor-pointer"
                      alt={item.Title}
                      src={item.Poster !== 'N/A' ? item.Poster : noImage}
                      data-id={item.imdbID}
                      onClick={handleClickDetail}
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="cursor-pointer"
                      data-id={item.imdbID}
                      onClick={handleClickDetail}>
                      {item.Title}
                    </Typography>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="font-semibold text-red-400 text-2xl">Not Found</div>
      )}
    </>
  );
};

export default Movie;
