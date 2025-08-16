import React from 'react';

const SearchBox = ({ setSearch, setPage }) => {
  const handleSearch = (evt) => {
    const { value } = evt.target;
    setPage(1);

    if (value) {
      setSearch(value);
    } else {
      setSearch('spider');
    }
  };

  return (
    <div className="w-full mb-4">
      <label className="input input-xl w-full">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          className="grow"
          placeholder="Search"
          onInput={handleSearch}
          autoFocus
        />
      </label>
    </div>
  );
};

export default SearchBox;
