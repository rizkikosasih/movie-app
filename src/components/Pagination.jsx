import { useEffect, useState } from 'react';
import { getPageList } from '../constants';
import { IoArrowBackCircle, IoArrowForwardCircle } from 'react-icons/io5';
import { motion } from 'motion/react';

const Pagination = ({ isLoading, page, setPage, totalPages }) => {
  const [maxLength, setMaxLength] = useState(window.innerWidth < 480 ? 5 : 7);
  const pageList = getPageList(totalPages, page, maxLength);

  useEffect(() => {
    const handleResize = () => setMaxLength(window.innerWidth < 480 ? 5 : 7);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  return (
    <div
      className="flex justify-center mt-8"
      style={{ display: isLoading ? 'none' : 'flex' }}>
      <div className="join">
        {/* Prev */}
        <motion.button
          className="join-item btn btn-sm btn-circle"
          onClick={() => changePage(page - 1)}
          whileHover={page === 1 ? { y: -3 } : {}}
          disabled={page === 1}>
          <IoArrowBackCircle size={15} />
        </motion.button>

        {/* Numbered pages */}
        {pageList?.map((item, idx) => (
          <motion.button
            key={idx}
            className={`join-item btn btn-sm btn-circle ${page === item ? 'btn-primary' : ''}`}
            onClick={() => item && changePage(item)}
            whileHover={item ? { y: -3 } : {}}
            disabled={!item}>
            {item || '...'}
          </motion.button>
        ))}

        {/* Next */}
        <motion.button
          className="join-item btn btn-sm btn-circle"
          onClick={() => changePage(page + 1)}
          whileHover={page !== totalPages ? { y: -3 } : {}}
          disabled={page === totalPages}>
          <IoArrowForwardCircle size={15} />
        </motion.button>
      </div>
    </div>
  );
};

export default Pagination;
