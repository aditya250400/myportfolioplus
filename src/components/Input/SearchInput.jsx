import React from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

export default function SearchInput({ searchInput, onSearchChange }) {
  return (
    <div className="sticky top-0 flex items-center w-auto mt-3 shadow-md shadow-eerieBlack sm:shadow-none sm:relative sm:mt-0">
      <input
        className="w-full py-3 border-none ps-10 sm:ps-12 text-textPrimary focus:ring-0  placeholder:text-[#A7A7A3] bg-searchInput rounded-none sm:rounded-xl"
        type="text"
        value={searchInput}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search post you want to see..."
      />
      <div className="absolute text-xl left-3 sm:left-5 text-textPrimary">
        <FiSearch />
      </div>
    </div>
  );
}

SearchInput.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  searchInput: PropTypes.string
};
