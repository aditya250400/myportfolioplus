/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import PropTypes from 'prop-types';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import EditAboutProfileModal from '../Modal/EditAboutProfileModal';
import { useSelector } from 'react-redux';

export default function AboutProfile({ myProfile }) {
  const [showModal, setShowModal] = useState(false);
  const { loading } = useSelector((state) => state.myProfile);

  return (
    <section className="px-3 py-5 mt-3 sm:px-5 sm:mt-5 lg:px-10 bg-eerieBlack sm:rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">About</h1>
        <button
          onClick={() => setShowModal(true)}
          className="p-2 text-2xl transition-all duration-200 ease-out rounded-full hover:bg-fernGreen"
        >
          <MdModeEdit />
        </button>
      </div>
      <div className="flex flex-col gap-8 py-5 lg:gap-10">
        <p className="text-sm text-justify text-textSecondary whitespace-pre-wrap leading-[25px]">
          {loading
            ? ''
            : myProfile.biodata === null || myProfile.biodata.about === null
              ? 'There is nothing about yourself yet, please add about yourself'
              : myProfile.biodata.about}
        </p>
        <div className="flex flex-col flex-wrap gap-3 mr-10">
          <div className="flex flex-col flex-wrap gap-2 w-72">
            {/*<h3 className='text-xl font-medium'>LinkedIn</h3>*/}
            {loading || myProfile.biodata === null || myProfile.biodata.linkedIn === null ? (
              ''
            ) : (
              <a
                href={myProfile.biodata.linkedIn}
                className="flex items-center gap-2 text-base break-all hover:underline text-textSecondary"
                target="_blank"
              >
                <BsLinkedin />
                My LinkedIn
              </a>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {/*<h3 className='text-xl'>Github</h3>*/}
            {loading || myProfile.biodata === null || myProfile.biodata.website === null ? (
              ''
            ) : (
              <a
                href={myProfile.biodata.website}
                className="flex items-center gap-2 text-base break-all hover:underline w-fit text-textSecondary"
                target="_blank"
              >
                <BsGithub />
                My Github
              </a>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <EditAboutProfileModal
          myProfile={myProfile}
          openModal={showModal}
          setOpenModal={setShowModal}
        />
      )}
    </section>
  );
}

AboutProfile.propTypes = {
  myProfile: PropTypes.instanceOf(Object)
};
