import React from 'react';
import WriteProgressInput from '../Input/WriteProgressInput';
import PropTypes from 'prop-types';

export default function WriteProgressInputModal({ myProfile }) {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-70">
      <div>
        <WriteProgressInput myProfile={myProfile} />
      </div>
    </div>
  );
}

WriteProgressInputModal.propTypes = {
  myProfile: PropTypes.instanceOf(Object),
  closeModal: PropTypes.func.isRequired
};
