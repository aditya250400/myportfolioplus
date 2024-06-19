import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { MdModeEdit } from 'react-icons/md';
import PropTypes from 'prop-types';
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';
import bgCardProfile from '../../assets/images/bgCardProfile.jpg';
import { useSelector } from 'react-redux';

export default function HeadUserProfile({ user }) {
  const { loading } = useSelector((state) => state.users);

  return (
    <section>
      {/* Background Photo Start */}
      <div className="relative group">
        <img
          src={
            user === null || user.background_photo === null
              ? bgCardProfile
              : user.background_photo.background_photo
          }
          alt="bg card"
          className={`${loading ? 'animate-pulse' : ''} object-cover w-full h-40 sm:h-56 sm:rounded-t-xl`}
        />
      </div>
      {/* Background Photo End */}
      <div className="flex items-start justify-between px-3 pb-5 lg:px-10 bg-eerieBlack sm:rounded-b-xl">
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Photo Profile Start */}
          <div className="relative group rounded-full h-36 w-52 -top-20 sm:-top-14">
            <img
              src={
                user === null || user.photo_profile === null
                  ? placeholderPhotoProfile
                  : user.photo_profile.photo_profile
              }
              alt="avatar profile"
              className={`${
                loading ? 'animate-pulse' : ''
              } relative object-cover border-4 rounded-full h-36 w-36 border-eerieBlack`}
            />
          </div>
          <div className="flex flex-col w-full gap-2 -mt-20 sm:mt-2">
            <div className="flex flex-col">
              <p className="text-2xl font-medium w-fit">{user === null ? '' : user.name}</p>
              <p className="text-xs text-textSecondary w-fit">{`${
                user === null || user.biodata === null || user.biodata.role === null
                  ? ''
                  : user.biodata.role
              }`}</p>
            </div>
            <p className="text-sm md:text-lg text-textPrimary">
              {user === null || user.biodata === null ? '' : user.biodata.headline}
            </p>
            <p className="flex items-center gap-1 mt-2 text-sm text-textSecondary">
              {user === null || user.biodata === null || user.biodata.location === null ? (
                ''
              ) : (
                <>
                  <FaLocationDot className="text-red-600" /> {user.biodata.location}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

HeadUserProfile.propTypes = {
  user: PropTypes.instanceOf(Object)
};
