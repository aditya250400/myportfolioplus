import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailPostAsync, postsAsync, upVotesPostAsync } from '../../states/posts/postThunk';
import PostDetail from '../Card/PostDetail';
import Loading from '../Loading';
import { upVotes } from '../../states/posts/postsSlice';

export default function PostDetailModal() {
  const [previousUrl, setPreviousUrl] = useState('/');
  const { currentPost, loading } = useSelector((state) => state.posts);
  const { myProfile } = useSelector((state) => state.myProfile);
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const closeModal = () => {
    if (previousUrl.includes('/profile')) {
      navigate(`/profile/myProfile`);
    } else {
      navigate('/');
    }
  };

  const onVotesClickHandler = (postId) => {
    dispatch(upVotesPostAsync({ id: postId }));
    dispatch(getDetailPostAsync({ id: postId }));
    dispatch(postsAsync({ searchInput: '', page: currentPost }));
  };

  useEffect(() => {
    if (!previousUrl) {
      setPreviousUrl(location.pathname);
    }
  }, [location.pathname, previousUrl]);

  useEffect(() => {
    dispatch(getDetailPostAsync({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (loading === true) {
    return <Loading />;
  }

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-70 text-textPrimary">
      {currentPost && (
        <PostDetail
          key={currentPost.id}
          {...currentPost}
          handleVotesClick={() => onVotesClickHandler(currentPost.id)}
          myProfile={myProfile}
        />
      )}
      <button className="absolute right-5 top-5" onClick={closeModal}>
        <IoClose className="text-3xl text-textSecondary" />
      </button>
    </div>
  );
}
