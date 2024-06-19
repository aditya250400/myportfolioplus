import React from 'react';
import iconLove from '../../assets/icons/iconLove-outlined.png';
import iconLoveFilled from '../../assets/icons/iconLove-filled.png';
import iconComment from '../../assets/icons/messages.png';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useExpand } from '../../hooks/useExpand';
import { formattedDate, formattedTime } from '../../utils';
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';
import { Popover } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function Post({
  id,
  content,
  image,
  post_up_votes,
  comments,
  user,
  created_at,
  updated_at,
  handleClick,
  handleVotesClick,
  page
}) {
  const { isExpanded, isTruncated, textRef, toggleExpanded } = useExpand();
  const navigate = useNavigate();
  const desc = { __html: content };
  const { myProfile } = useSelector((state) => state.myProfile);

  const handleToggleExpanded = () => {
    if (page === '/') {
      toggleExpanded(!isExpanded);
    } else if (page === `/profile`) {
      navigate(`/profile/api/post/${id}`);
    } else if (page === `/profileDetail`) {
      navigate(`/profileDetail/api/post/${id}`);
    }
  };

  const contentPopOver = (
    <div className="w-64 p-3 bg-searchInput text-textPrimary">
      <div className="flex items-center justify-between mb-2">
        <img
          className="object-cover w-10 h-10 rounded-full"
          src={
            user.photo_profile === null ? placeholderPhotoProfile : user.photo_profile.photo_profile
          }
          alt={user.name}
        />
        <Link to={`/profile/${user?.id === myProfile?.id ? 'myProfile' : user?.id}`}>
          <button
            type="button"
            className="px-4 py-1.5 text-xs font-medium transition-all border-none rounded-full bg-fernGreen hover:bg-opacity-85 text-textPrimary"
          >
            Profile
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-2 my-2">
        <p id="profile-popover" className="text-base font-semibold leading-none text-textPrimary">
          {user.name}
        </p>
        <p className="text-[10px] font-medium text-textSecondary">
          ({user.biodata == null ? '' : user.biodata.role})
        </p>
      </div>
      <ul className="flex text-sm">
        <li className="flex gap-2 me-2">
          <span className="font-semibold text-textPrimary">{user.posts_count}</span>
          <span>Post</span>
        </li>
        <div>|</div>
        <li className="flex gap-2 ms-2">
          <span className="font-semibold text-textPrimary">{user.portfolios_count}</span>
          <span>Portfolio</span>
        </li>
      </ul>
    </div>
  );

  return (
    <section className="w-auto py-3 rounded-md h-fit sm:p-4 bg-eerieBlack sm:rounded-xl">
      <div className="flex items-center gap-3 px-2 sm:px-0">
        <Popover
          className="border-4 border-[#262626] rounded-xl"
          aria-labelledby="profile-popover"
          content={contentPopOver}
          trigger="hover"
        >
          <img
            src={
              user.photo_profile === null
                ? placeholderPhotoProfile
                : user.photo_profile.photo_profile
            }
            alt="img post"
            className="object-cover w-10 h-10 rounded-full cursor-pointer"
          />
        </Popover>
        <div>
          <p className="text-base font-medium text-textPrimary">{user.name}</p>
          <p className="text-[10px] font-medium text-textSecondary">
            {user.biodata == null ? '' : user.biodata.role}
          </p>
        </div>
      </div>

      <div className="my-3">
        {image ? (
          <img src={image} className="rounded-none lg:w-full lg:h-full sm:rounded-lg" alt="" />
        ) : (
          ''
        )}
        <div className="flex gap-2 px-2 my-3 sm:px-0">
          <p className="text-[12px] font-medium text-[#A9A9A9]">{formattedDate(created_at)}</p>
          <p className="text-[12px] font-medium text-[#7A7A7A]">•</p>
          <p className="text-[12px] font-medium text-[#A9A9A9]">{formattedTime(updated_at)}</p>
        </div>
        <div
          dangerouslySetInnerHTML={desc}
          ref={textRef}
          className={`text-sm text-[#eaeaea] leading-5 px-2 sm:px-0 ${
            isExpanded ? '' : 'line-clamp-2'
          }`}
        />
        {isTruncated && (
          <button
            onClick={handleToggleExpanded}
            className="text-[#A9A9A9] text-sm px-2 sm:px-0 font-normal"
          >
            {isExpanded ? 'See less' : '...See more'}
          </button>
        )}
      </div>

      <div className="w-full h-[2px] bg-[#262626]" />

      <div className="flex gap-5 px-2 my-2 sm:px-0 text-textPrimary">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleVotesClick(id)}
            className={
              post_up_votes.find((vote) => myProfile && vote.user_id === myProfile.id)
                ? 'hover:cursor-not-allowed'
                : ''
            }
            disabled={
              post_up_votes.find((vote) => myProfile && vote.user_id === myProfile.id)
                ? true
                : false
            }
          >
            <img
              src={
                post_up_votes.find((vote) => myProfile && vote.user_id === myProfile.id)
                  ? iconLoveFilled
                  : iconLove
              }
              alt=""
              className="w-7"
            />
          </button>
          <p>{post_up_votes.length}</p>
        </div>
        <button type="button" className="flex items-center gap-2" onClick={() => handleClick(id)}>
          <img src={iconComment} alt="" className="w-6" />
          <p>{comments.length}</p>
        </button>
      </div>
    </section>
  );
}

Post.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  content: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  post_up_votes: PropTypes.instanceOf(Array).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleVotesClick: PropTypes.func.isRequired
};
