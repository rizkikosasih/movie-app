const CardSkeleton = ({ length = 1, height = 'h-56', lines = 4, className = '' }) => {
  const data = Array.from({ length }, (_, i) => i);

  return (
    <>
      {data.map((item) => (
        <div key={item} className={`col ${className}`}>
          <div className="card w-full shadow-lg animate-pulse bg-base-100 overflow-hidden">
            {/* Card Header */}
            <div className={`${height} flex items-center justify-center bg-base-300`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-12 w-12 text-gray-500">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5
                  1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0
                  0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25
                  6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375
                  0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>

            {/* Card Body */}
            <div className="card-body">
              <div className="h-3 w-56 rounded-full bg-base-300 mb-4"></div>
              {[...Array(lines)].map((_, idx) => (
                <div key={idx} className="h-2 w-full rounded-full bg-base-300 mb-2"></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardSkeleton;
