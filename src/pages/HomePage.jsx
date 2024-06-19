import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Index';
import Profile from '../components/Card/Profile';
import SeePost from '../components/Card/SeePost';
import Post from '../components/Card/Post';
import Search from '../components/Input/SearchInput';
import SuggestedDeveloper from '../components/Card/SuggestedDeveloper';
import MostLikedPost from '../components/Card/MostLikedPost';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PostDetailModal from '../components/Modal/PostDetailModal';
import WriteProgressInputModal from '../components/Modal/WriteProgressInputModal';
import PortfolioInputModal from '../components/Modal/PortfolioInputModal';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../states/authUser/authUserThunk';
import Loading from '../components/Loading';
import { myProfileAsync } from '../states/myProfile/myProfileThunk';
import {
  getMyPostAsync,
  mostLikedPostsAsync,
  postsAsync,
  upVotesPostAsync
} from '../states/posts/postThunk';
import { getMostActiveUsers } from '../states/user/userThunk';
import { ToastContainer } from 'react-toastify';
import { searchPost, setPage, setPageToOne, upVotes } from '../states/posts/postsSlice';
import ButtonPaginate from '../components/Card/ButtonPaginate';
import PostLoading from '../components/Loading/PostLoading';
import ProfileHomePageLoading from '../components/Loading/ProfileHomePageLoading';
import { setPageUserToOne } from '../states/user/userSlice';

export default function HomePage() {
  const [openStudyModal, setOpenStudyModal] = useState(false);
  const [openPortfolioModal, setOpenPortfolioModal] = useState(false);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const { myProfile, loading } = useSelector((state) => state.myProfile);
  const { posts, searchInput, page, selectedPost, loadingPaginate, last_page, current_page } =
    useSelector((state) => state.posts);
  const loadingPosts = useSelector((state) => state.posts.loading);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const handleLogout = () => {
    dispatch(logoutUser({ navigate }));
  };

  const onCloseStudyModal = () => {
    setOpenStudyModal(!openStudyModal);
  };

  const onClosePortfolioModal = () => {
    setOpenPortfolioModal(!openPortfolioModal);
  };

  const isModalPostDetailOpen = location.pathname.startsWith('/api/posts/');

  const handlePostClick = (postId) => {
    navigate(`/api/posts/${postId}`);
  };

  const handleVotesClick = (postId) => {
    dispatch(upVotesPostAsync({ id: postId }));
    dispatch(mostLikedPostsAsync());
    dispatch(
      upVotes({
        user_id: myProfile.id,
        post_id: postId
      })
    );
  };

  const onSearchChange = (value) => {
    dispatch(searchPost(value));
    dispatch(setPageToOne());
  };

  const onPaginateExtend = () => {
    dispatch(setPage());
  };

  useEffect(() => {
    dispatch(
      selectedPost === 'All Posts'
        ? postsAsync({ searchInput, page })
        : getMyPostAsync({ searchInput, page })
    );
  }, [dispatch, searchInput, page, selectedPost]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(myProfileAsync());
    dispatch(setPageToOne());
    dispatch(setPageUserToOne());
    dispatch(mostLikedPostsAsync());
    dispatch(getMostActiveUsers({ page: 1 }));
    dispatch(getMyPostAsync({ page: 1, searchInput: '' }));
  }, []);

  useEffect(() => {
    if (openStudyModal || openPortfolioModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openStudyModal, openPortfolioModal]);

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        theme="dark"
        pauseOnHover={false}
        autoClose={3000}
        pauseOnFocusLoss={false}
      />
      {status === 'loading' && <Loading />}
      <div className="bg-chineseBlack">
        <div className="sticky top-0 z-50">
          <Navbar
            openModalStudy={onCloseStudyModal}
            isOpenModalStudyInput={openStudyModal}
            openModalPortfolio={onClosePortfolioModal}
            isOpenModalPortfolioInput={openPortfolioModal}
            logout={handleLogout}
            myProfile={myProfile}
          />
        </div>
        <div className="py-0 mb-20 sm:px-5 lg:container sm:py-5 lg:px-10 2xl:px-20">
          <div className="flex flex-col sm:flex-row">
            <div className="h-full sm:w-72 xl:w-70 sm:sticky top-28">
              {loading ? (
                <ProfileHomePageLoading />
              ) : (
                <Profile myProfile={myProfile} loading={loading}>
                  My Profile
                </Profile>
              )}
            </div>
            <div className="flex flex-col gap-2 mx-0 sm:flex-1 sm:gap-2 sm:mx-4 lg:mx-5 2xl:mx-10">
              <Search searchInput={searchInput} onSearchChange={onSearchChange} />
              <SeePost />
              {loadingPosts ? (
                <>
                  {/* <p className="text-center text-white">Working on it...</p> */}
                  <PostLoading />
                </>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <Post
                    key={post.id}
                    page={'/'}
                    {...post}
                    handleClick={() => handlePostClick(post.id)}
                    handleVotesClick={() => handleVotesClick(post.id)}
                  />
                ))
              ) : (
                <p className="text-center text-white">Post Not Found</p>
              )}

              <ButtonPaginate
                onPaginateExtend={onPaginateExtend}
                loadingPaginate={loadingPaginate}
                current_page={current_page}
                last_page={last_page}
                loading={loading}
              />
            </div>
            <div className="flex-col hidden gap-5 xl:flex">
              <SuggestedDeveloper />
              <MostLikedPost />
            </div>
          </div>
        </div>
        {openStudyModal && (
          <WriteProgressInputModal closeModal={onCloseStudyModal} myProfile={myProfile} />
        )}
        {openPortfolioModal && (
          <PortfolioInputModal myProfile={myProfile} closeModal={onClosePortfolioModal} />
        )}
        {isModalPostDetailOpen &&
          posts
            .filter((post) => post.id === +id)
            .map((post) => <PostDetailModal key={post.id} {...post} myProfile={myProfile} />)}
      </div>
    </>
  );
}
