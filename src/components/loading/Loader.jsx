import { RiseLoader } from 'react-spinners';

const Loader = ({size = 25}) => {
  const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };
  return (
    <div className="w-full relative z-[100]">
      <div style={style}>
        <RiseLoader color="#36d7b7" size={size} />
      </div>
    </div>
  );
};

export default Loader;
