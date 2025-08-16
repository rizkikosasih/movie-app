import z404z from './../assets/svg/z404z.svg';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };

  return (
    <div className="flex flex-col items-center justify-center w-full" style={style}>
      <img src={z404z} alt={"No Image"} loading="lazy" className="w-60 h-60" />
      <p className="font-semibold text-red-500 my-3 ml-1">Page Not Found</p>
      <Link to="/" className="custom-btn ml-1">
        Home
      </Link>
    </div>
  );
};

export default PageNotFound;
