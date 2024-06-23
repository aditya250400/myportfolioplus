import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Index';
import Post from '../components/Card/Post';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PostDetailModal from '../components/Modal/PostDetailModal';
import { myProfileAsync } from '../states/myProfile/myProfileThunk';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../states/authUser/authUserThunk';
import { ToastContainer } from 'react-toastify';
import { skillsAsync } from '../states/skills/skillsThunk';
import { portfoliosAsync } from '../states/portfolios/portfoliosThunk';
import WriteProgressInputModal from '../components/Modal/WriteProgressInputModal';
import PortfolioInputModal from '../components/Modal/PortfolioInputModal';
import { getMyPostAsync, postsAsync } from '../states/posts/postThunk';
import { getUserIdAsync } from '../states/user/userThunk';
import HeadUserProfile from '../components/Card/HeadUserProfile';
import AboutUserProfile from '../components/Card/AboutUserProfile';
import SkillsUserProfile from '../components/Card/SkillsUserProfile';
import PortfolioUser from '../components/Card/PortfolioUser';
import { searchPost, setPageToOne } from '../states/posts/postsSlice';
import { setPageUserToOne } from '../states/user/userSlice';
import { setDeleteConfirmId } from '../states/modal/modalSlice';

export default function ProfileDetailPage() {
  const { myProfile } = useSelector((state) => state.myProfile);
  const { user } = useSelector((state) => state.users);
  const { currentPost } = useSelector((state) => state.posts);
  const {modalProgress , modalPortfolio, postModal} = useSelector((state) => state.modal);
  const [activeSession, setActiveSession] = useState('Portfolio');
  const dispatch = useDispatch();
  const { id } = useParams();


  const handlePostClick = (postId) => {    
    dispatch(getDetailPostAsync({id: postId}));
  };

  useEffect(() => {
    if (modalProgress || modalPortfolio) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalProgress, modalPortfolio]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(myProfileAsync());
    dispatch(getMyPostAsync({ page: 1, searchInput: '' }));
    dispatch(postsAsync({ page: 1, searchInput: '' }));
    dispatch(getUserIdAsync({ id }));
    dispatch(portfoliosAsync());
    dispatch(skillsAsync());
    dispatch(setPageToOne());
    dispatch(setPageUserToOne());
    dispatch(getMyPostAsync());
    dispatch(searchPost(''));
    dispatch(setDeleteConfirmId(null))
  }, []);
  return (
    <>
      <ToastContainer position="top-center" theme="dark" pauseOnHover={false} autoClose={3000} />
      <section className="text-textPrimary">
        <div className="sticky top-0 z-50">
          <Navbar
            myProfile={myProfile}
          />
        </div>
        <div className="container sm:mt-5 lg:px-52">
          <HeadUserProfile user={user} />
          <AboutUserProfile user={user} />
          <SkillsUserProfile user={user} />
          <div className="flex flex-col px-3 mt-10 mb-40 sm:px-5 lg:px-10">
            <div className="flex gap-10">
              <button
                type="button"
                className="p-0 border-gray-500 rounded-s-xl"
                onClick={() => setActiveSession('Portfolio')}
              >
                <h1
                  className={`text-xl font-medium cursor-pointer ${
                    activeSession === 'Portfolio' ? 'border-b-2 border-textSecondary' : ''
                  }`}
                >
                  Portfolio
                </h1>
              </button>
              <button
                type="button"
                className="p-0 rounded-e-xl"
                onClick={() => setActiveSession('Posts')}
              >
                <h1
                  className={`text-xl font-medium cursor-pointer ${
                    activeSession === 'Posts' ? 'border-b-2 border-textSecondary' : ''
                  }`}
                >
                  Posts
                </h1>
              </button>
            </div>
            <div className="my-5">
              {activeSession === 'Posts' ? (
                <div className="grid w-full gap-5 sm:grid-cols-2">
                  {user === null
                    ? ''
                    : user.posts.length > 0
                      ? user.posts.map((post) => (
                          <Post
                            key={post.id}
                            page={'/profile'}
                            {...post}
                            user={user}
                            handleClick={() => handlePostClick(post.id)}
                          />
                        ))
                      : ''}
                </div>
              ) : (
                <div className="grid w-full gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {user === null
                    ? ''
                    : user.portfolios.length > 0
                      ? user.portfolios.map((portfolio) => (
                          <PortfolioUser key={portfolio.id} {...portfolio} />
                        ))
                      : ''}
                </div>
              )}
            </div>
          </div>
        </div>
        {modalProgress && (
          <WriteProgressInputModal myProfile={myProfile} />
        )}
        {modalPortfolio && (
          <PortfolioInputModal myProfile={myProfile} />
        )}
        {postModal &&
        <PostDetailModal {...currentPost} />}
      </section>
    </>
  );
}
