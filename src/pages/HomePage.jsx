import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Index";
import Profile from "../components/Card/Profile";
import SeePost from "../components/Card/SeePost";
import Post from "../components/Card/Post";
import Search from "../components/Input/SearchInput";
import SuggestedDeveloper from "../components/Card/SuggestedDeveloper";
import MostLikedPost from "../components/Card/MostLikedPost";
import { useNavigate } from "react-router-dom";
import PostDetailModal from "../components/Modal/PostDetailModal";
import WriteProgressInputModal from "../components/Modal/WriteProgressInputModal";
import PortfolioInputModal from "../components/Modal/PortfolioInputModal";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../states/authUser/authUserThunk";
import { myProfileAsync } from "../states/myProfile/myProfileThunk";
import {
  getMyPostAsync,
  mostLikedPostsAsync,
  postsAsync,
  upVotesPostAsync,
} from "../states/posts/postThunk";
import { getMostActiveUsers } from "../states/user/userThunk";
import { ToastContainer } from "react-toastify";
import {
  searchPost,
  setPage,
  setPageToOne,
  setSelectedPost,
  upVotes,
} from "../states/posts/postsSlice";
import ButtonPaginate from "../components/Card/ButtonPaginate";
import PostLoading from "../components/Loading/PostLoading";
import ProfileHomePageLoading from "../components/Loading/ProfileHomePageLoading";
import { setPageUserToOne } from "../states/user/userSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const { myProfile, loading } = useSelector((state) => state.myProfile);
  const {
    posts,
    searchInput,
    page,
    selectedPost,
    loadingPaginate,
    last_page,
    current_page,
    currentPost,
  } = useSelector((state) => state.posts);
  const loadingPosts = useSelector((state) => state.posts.loading);
  const {modalProgress, modalPortfolio, postModal} = useSelector((state) => state.modal);
  const navigate = useNavigate();


  const handleVotesClick = (postId) => {
    dispatch(upVotesPostAsync({ id: postId }));
    dispatch(mostLikedPostsAsync());
    dispatch(
      upVotes({
        user_id: myProfile.id,
        post_id: postId,
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
      selectedPost === "All Posts"
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
    dispatch(setSelectedPost('All Posts'));
    dispatch(postsAsync({ searchInput: "", page: 1 }));
    dispatch(getMostActiveUsers({ page: 1 }));
  }, []);

  useEffect(() => {
    if (modalProgress || modalPortfolio) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalProgress, modalPortfolio]);

  if (status === "failed") {
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
      <div className="bg-chineseBlack">
        <div className="sticky top-0 z-50">
          <Navbar
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
              <Search
                searchInput={searchInput}
                onSearchChange={onSearchChange}
              />
              <SeePost />
              {loadingPosts ? (
                <>
                  <PostLoading />
                </>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <Post
                    key={post.id}
                    page={"/"}
                    {...post}
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
        {modalProgress && (
          <WriteProgressInputModal
            myProfile={myProfile}
          />
        )}
        {modalPortfolio && (
          <PortfolioInputModal/>
        )}
        {postModal &&
              <PostDetailModal {...currentPost} myProfile={myProfile} />
        }
      </div>
    </>
  );
}
