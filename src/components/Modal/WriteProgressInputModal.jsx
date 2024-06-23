import React from 'react';
import WriteProgressInput from '../Input/WriteProgressInput';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function WriteProgressInputModal({ myProfile }) {
  const { loadingCurrentPost } = useSelector((state) => state.posts);
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full overflow-auto bg-black bg-opacity-70">
      <div>
        {loadingCurrentPost ? (
          <div className='h-[100vh] flex justify-center items-center'>
            Loading...
          </div>
        ) : <WriteProgressInput myProfile={myProfile} />}
      </div>
    </div>
  );
}

WriteProgressInputModal.propTypes = {
  myProfile: PropTypes.instanceOf(Object),
};
