import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';
import SuggestedDeveloperLoading from '../Loading/SuggestedDeveloperLoading';
import PropTypes from 'prop-types';

export default function SuggestedDeveloper() {
  const { mostActiveUsers, loading } = useSelector((state) => state.users);
  const { myProfile } = useSelector((state) => state.myProfile);
  return (
    <section className="flex flex-col gap-3 p-5 w-96 h-fit bg-eerieBlack rounded-xl">
      {loading ? (
        <div className="w-1/2 h-4 rounded-lg animate-pulse bg-slate-300" />
      ) : (
        <h2 className="mb-2 text-lg font-semibold text-textPrimary">Most Active Users</h2>
      )}
      {loading ? (
        <SuggestedDeveloperLoading />
      ) : mostActiveUsers.length > 0 ? (
        mostActiveUsers.slice(0, 5).map((userProfile) => (
          <div key={userProfile?.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={
                    userProfile.photo_profile === null
                      ? placeholderPhotoProfile
                      : userProfile.photo_profile.photo_profile
                  }
                  alt=""
                  className="object-cover w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-textPrimary">{userProfile.name}</p>
                  <p className="text-xs font-medium text-textSecondary">
                    {userProfile.biodata === null || userProfile.biodata.role === null
                      ? ''
                      : userProfile.biodata.role}
                  </p>
                </div>
              </div>
              <Link
                to={`/profile/${userProfile.id === myProfile.id ? 'myProfile' : userProfile.id}`}
              >
                <Button
                  color=""
                  size="xs"
                  className="font-medium transition-all duration-300 border border-textPrimary text-textPrimary hover:bg-ufoGreen hover:border-ufoGreen focus:ring-0"
                >
                  See Profile
                </Button>
              </Link>
            </div>
            <div className="w-full h-[2px] bg-[#262626]" />
          </div>
        ))
      ) : (
        ''
      )}

      {loading ? (
        <div className="w-1/4 h-4 rounded-lg animate-pulse bg-slate-300" />
      ) : (
        <Link
          to="/most-active-users/all"
          className="flex items-center gap-2 font-medium text-textPrimary hover:text-textSecondary w-fit"
        >
          See more <HiArrowNarrowRight />
        </Link>
      )}
    </section>
  );
}

SuggestedDeveloper.propTypes = {
  user: PropTypes.instanceOf(Object)
};
