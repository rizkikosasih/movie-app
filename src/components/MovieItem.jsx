import noImage from './../assets/svg/noImage.svg';
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';

const MovieItem = ({ imdbID, Title, Poster, handleClickDetail }) => {
  return (
    <div className="col" key={imdbID}>
      <Card className="w-full overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none">
          <img
            loading="lazy"
            className="movie-image cursor-pointer"
            alt={Title}
            src={Poster !== 'N/A' ? Poster : noImage}
            data-id={imdbID}
            onClick={handleClickDetail}
          />
        </CardHeader>
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="cursor-pointer"
            data-id={imdbID}
            onClick={handleClickDetail}>
            {Title}
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default MovieItem;
