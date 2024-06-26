import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailPostAsync, postsAsync, upVotesPostAsync } from '../../states/posts/postThunk';
import PostDetail from '../Card/PostDetail';
import Loading from '../Loading';
import { ToastContainer } from 'react-toastify';

export default function PostDetailModal() {
  const { currentPost, loading, loadingCurrentPost } = useSelector((state) => state.posts);
  const { myProfile } = useSelector((state) => state.myProfile);

  const dispatch = useDispatch();

  const onVotesClickHandler = (postId) => {
    dispatch(upVotesPostAsync({ id: postId }));
    dispatch(getDetailPostAsync({ id: postId }));
    dispatch(postsAsync({ searchInput: '', page: currentPost }));
  };

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
    <>
    
    <div className="fixed top-0 left-0 z-50 flex items-center overflow-auto justify-center w-full h-full bg-black bg-opacity-70 text-textPrimary">
      {!loadingCurrentPost ? (
        <PostDetail
          {...currentPost}
          handleVotesClick={onVotesClickHandler}
          myProfile={myProfile}
        />
      ) : 'Loading'}
    </div>
    </>
  );
}
