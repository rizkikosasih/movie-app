import { RiseLoader } from 'react-spinners';

const Loader = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };
  return (
    <div className='w-full relative z-[100]'>
      <div style={style}>
        <RiseLoader color='#36d7b7' size={25} />
      </div>
    </div>
  );
};

export default Loader;
