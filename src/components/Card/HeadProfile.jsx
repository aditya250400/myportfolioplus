import React, { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { MdModeEdit } from 'react-icons/md';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import PropTypes from 'prop-types';
import EditHeadProfileModal from '../Modal/EditHeadProfileModal';
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';
import bgCardProfile from '../../assets/images/bgCardProfile.jpg';
import {
  createMyBackgroundProfileAsync,
  createMyPhotoProfileAsync,
  updateMyBackgroundPhotoProfileAsync,
  updateMyPhotoProfileAsync
} from '../../states/myProfile/myProfileThunk';
import { useDispatch, useSelector } from 'react-redux';

export default function HeadProfile({ myProfile }) {
  const dispatch = useDispatch();
  const { loading, loadingPhotoProfile, loadingBackground } = useSelector(
    (state) => state.myProfile
  );
  const [showModal, setShowModal] = useState(false);

  const onSubmitPhotoProfileChange = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append('photo_profile', file);

      dispatch(createMyPhotoProfileAsync(formData));
    }

    return;
  };

  const onEditPhotoProfileChange = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append('photo_profile', file);
      formData.append('_method', 'PUT');

      dispatch(updateMyPhotoProfileAsync({ formData, id: myProfile.photo_profile.id }));
    }

    return;
  };

  const onSubmitBackgroundProfileChange = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append('background_photo', file);

      dispatch(createMyBackgroundProfileAsync(formData));
    }

    return;
  };

  const onEditBackgroundProfileChange = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append('background_photo', file);
      formData.append('_method', 'PUT');

      dispatch(
        updateMyBackgroundPhotoProfileAsync({ formData, id: myProfile.background_photo.id })
      );
    }

    return;
  };

  return (
    <section>
      {/* Background Photo Start */}
      <div className="relative group">
        <img
          src={
            loadingBackground || myProfile.background_photo === null
              ? bgCardProfile
              : myProfile.background_photo.background_photo
          }
          alt="bg card"
          className={`${loadingBackground ? 'animate-pulse' : ''} object-cover w-full h-56 sm:rounded-t-xl`}
        />
        <label
          htmlFor="backgroundImage"
          className="absolute p-1 text-2xl font-bold rounded-full opacity-0 right-5 top-4 bg-slate-900 group-hover:opacity-100 text-slate-200 hover:cursor-pointer"
        >
          {' '}
          <MdOutlineAddPhotoAlternate />
        </label>
      </div>
      {/* Background Photo End */}
      <div className="flex items-start justify-between px-3 pb-5 lg:px-10 bg-eerieBlack sm:rounded-b-xl">
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Photo Profile Start */}
          <div className="relative rounded-full group h-36 w-52 -top-20 sm:-top-14">
            <img
              src={
                loadingPhotoProfile || myProfile.photo_profile === null
                  ? placeholderPhotoProfile
                  : myProfile.photo_profile.photo_profile
              }
              alt="avatar profile"
              className={`${
                loadingPhotoProfile ? 'animate-pulse' : ''
              } relative object-cover border-4 rounded-full h-36 w-36 border-eerieBlack`}
            />
            <label
              htmlFor="image"
              className="hover:cursor-pointer bg-slate-900 rounded-full absolute text-2xl opacity-0 group-hover:opacity-100 font-bold right-3 p-[3px] bottom-3 text-slate-200"
            >
              {' '}
              <MdModeEdit />
            </label>
          </div>
          <div className="flex flex-col w-full gap-2 -mt-20 sm:mt-2">
            <div className="flex flex-col">
              <p className="text-2xl font-medium w-fit">{loading ? '' : myProfile.name}</p>
              <p className="text-xs text-textSecondary w-fit">{`${
                loading || myProfile.biodata === null || myProfile.biodata.role === null
                  ? ''
                  : myProfile.biodata.role
              }`}</p>
            </div>
            <p className="text-sm md:text-lg text-textPrimary">
              {loading || myProfile.biodata === null ? '' : myProfile.biodata.headline}
            </p>
            <p className="flex items-center gap-1 mt-2 text-sm text-textSecondary">
              {loading || myProfile.biodata === null || myProfile.biodata.location === null ? (
                ''
              ) : (
                <>
                  <FaLocationDot className="text-red-600" /> {myProfile.biodata.location}
                </>
              )}
            </p>
          </div>
        </div>
        {/* Photo Profile End */}
        <button
          onClick={() => setShowModal(true)}
          className="p-2 mt-3 text-2xl transition-all duration-200 ease-out rounded-full hover:bg-fernGreen"
        >
          <MdModeEdit />
        </button>
      </div>
      {showModal && (
        <EditHeadProfileModal
          openModal={showModal}
          setOpenModal={setShowModal}
          myProfile={myProfile}
        />
      )}

      {/* Input Photo Profile */}
      <input
        type="file"
        hidden
        accept="image/*"
        id="image"
        onChange={
          myProfile === null ||
          myProfile.photo_profile === null ||
          myProfile.photo_profile.photo_profile === null
            ? onSubmitPhotoProfileChange
            : onEditPhotoProfileChange
        }
      />
      {/* Input Photo Profile End */}
      {/* Input Photo Profile */}
      <input
        type="file"
        hidden
        accept="image/*"
        id="backgroundImage"
        onChange={
          myProfile === null ||
          myProfile.background_photo === null ||
          myProfile.background_photo.background_photo === null
            ? onSubmitBackgroundProfileChange
            : onEditBackgroundProfileChange
        }
      />
      {/* Input Photo Profile End */}
    </section>
  );
}

HeadProfile.propTypes = {
  myProfile: PropTypes.instanceOf(Object),
  userProfile: PropTypes.instanceOf(Object)
};
