import React from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import bgCardProfile from '../../assets/images/bgCardProfile.jpg';
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';
import PropTypes from 'prop-types';
import { getMyPostAsync } from '../../states/posts/postThunk';
import { useDispatch } from 'react-redux';

export default function Profile({ myProfile, children, loading }) {
  const dispatch = useDispatch();
  return (
    <article className={`pb-5 w-full sm:rounded-xl bg-eerieBlack `}>
      <img
        src={
          loading || myProfile.background_photo === null
            ? bgCardProfile
            : myProfile.background_photo.background_photo
        }
        alt="bg card"
        className="object-cover w-full h-32 rounded-t-xl sm:rounded-t-xl"
      />
      <div className="flex flex-col px-2 sm:px-4">
        <div className="flex gap-2 mb-2 h-fit">
          <img
            src={
              loading || myProfile.photo_profile === null
                ? placeholderPhotoProfile
                : myProfile.photo_profile.photo_profile
            }
            alt={`${loading ? '' : myProfile.name} avatar`}
            className="relative object-cover border-4 rounded-full h-14 w-14 -top-3 border-eerieBlack"
          />
          <div className="flex flex-col pt-1">
            <p className="text-base font-medium text-textPrimary">
              {loading ? '' : myProfile.name}
            </p>
            <p className="text-[10px] font-medium text-textSecondary">
              {loading || myProfile.biodata === null ? '' : myProfile.biodata.role}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-2 text-sm font-medium text-textPrimary">
          <p>
            {loading ? '' : myProfile.posts_count} <span className="text-[#A9A9A9] ">Post</span>
          </p>
          <p>|</p>
          <p>
            {loading ? '' : myProfile.portfolios_count}{' '}
            <span className="text-[#A9A9A9]">Portfolio</span>
          </p>
        </div>
        <Link to={`/profile/myProfile`}>
          <Button
            color=""
            size="sm"
            className="w-full mt-5 transition-all duration-300 ease-out text-textPrimary hover:bg-opacity-80 bg-fernGreen"
            onClick={() => dispatch(getMyPostAsync({ page: 1, searchInput: '' }))}
          >
            {children}
          </Button>
        </Link>
      </div>
    </article>
  );
}

Profile.propTypes = {
  myProfile: PropTypes.instanceOf(Object),
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool
};
