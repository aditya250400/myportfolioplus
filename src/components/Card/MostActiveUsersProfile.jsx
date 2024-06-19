import React from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import bgCardProfile from '../../assets/images/bgCardProfile.jpg';
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function MostActiveUsersProfile({ userProfile, children, loading }) {
  const { myProfile } = useSelector((state) => state.myProfile);
  return (
    <article className={`pb-5 w-full sm:rounded-xl bg-eerieBlack border`}>
      <img
        src={
          userProfile.background_photo === null
            ? bgCardProfile
            : userProfile.background_photo.background_photo
        }
        alt="bg card"
        className="object-cover w-full h-32 rounded-t-xl sm:rounded-t-xl"
      />
      <div className="flex flex-col px-2 sm:px-4">
        <div className="flex gap-2 mb-2 h-fit">
          <img
            src={
              userProfile.photo_profile === null
                ? placeholderPhotoProfile
                : userProfile.photo_profile.photo_profile
            }
            alt={`${loading ? '' : userProfile.name} avatar`}
            className="relative object-cover border-4 rounded-full h-14 w-14 -top-3 border-eerieBlack"
          />
          <div className="flex flex-col pt-1">
            <p className="text-base font-medium text-textPrimary">{userProfile.name}</p>
            <p className="text-[10px] font-medium text-textSecondary">
              {userProfile.biodata === null ? '' : userProfile.biodata.role}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-2 text-sm font-medium text-textPrimary">
          <p>
            {userProfile.posts_count} <span className="text-[#A9A9A9] ">Post</span>
          </p>
          <p>|</p>
          <p>
            {userProfile.portfolios_count} <span className="text-[#A9A9A9]">Portfolio</span>
          </p>
        </div>
        <Link to={`/profile/${userProfile.id === myProfile.id ? 'myProfile' : userProfile.id}`}>
          <Button
            color=""
            size="sm"
            className="w-full mt-5 transition-all duration-300 ease-out text-textPrimary hover:bg-opacity-80 bg-fernGreen"
          >
            {children}
          </Button>
        </Link>
      </div>
    </article>
  );
}

MostActiveUsersProfile.propTypes = {
  userProfile: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool
};
