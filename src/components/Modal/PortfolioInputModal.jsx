import React from 'react';
import PropTypes from 'prop-types';
import PortfolioInput from '../Input/PortfolioInput';

export default function PortfolioInputModal({ myProfile, closeModal, portfolio }) {
  return (
    <div className="fixed overflow-auto top-0 left-0 z-50 w-full h-full bg-black bg-opacity-70">
      <div>
        <PortfolioInput myProfile={myProfile} closeModal={closeModal} portfolio={portfolio} />
      </div>
    </div>
  );
}

PortfolioInputModal.propTypes = {
  myProfile: PropTypes.instanceOf(Object),
  portfolio: PropTypes.instanceOf(Object),
  closeModal: PropTypes.func.isRequired
};
