import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
const ButtonPaginate = ({
  onPaginateExtend,
  loadingPaginate,
  current_page,
  last_page,
  loading
}) => {
  return current_page === last_page || last_page === 1 || loading ? null : (
    <button
      className={`${loadingPaginate ? 'hover:cursor-not-allowed' : ''} p-1 text-white rounded-full bg-slate-800 w-full flex justify-center`}
      disabled={loadingPaginate ? true : false}
      onClick={onPaginateExtend}
    >
      {loadingPaginate ? (
        <ImSpinner2 className="text-center w-6 h-6 text-white animate-spin" />
      ) : (
        'See More'
      )}
    </button>
  );
};

export default ButtonPaginate;
