import React, { useRef, useState } from "react";
import iconLove from "../../assets/icons/iconLove-outlined.png";
import iconLoveFilled from "../../assets/icons/iconLove-filled.png";
import iconComment from "../../assets/icons/messages.png";
import { IoIosSend } from "react-icons/io";
import PropTypes from "prop-types";
import "animate.css";
import { formattedDate, formattedTime } from "../../utils";
import placeholderPhotoProfile from "../../assets/images/placeholderPhotoProfile.png";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAsync } from "../../states/comments/commentsThunk";
import { onAddComment, setCurrentPostToNull, upVotesDetailPost } from "../../states/posts/postsSlice";
import { IoClose } from "react-icons/io5";
import { setPostModal } from "../../states/modal/modalSlice";
import { getDetailPostAsync, upVotesPostAsync } from "../../states/posts/postThunk";
import { ImSpinner2 } from "react-icons/im";

export default function PostDetail({
  id,
  image,
  content,
  user,
  created_at,
  updated_at,
  comments,
  post_up_votes,
  myProfile,
}) {
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(false);
  const commentInputRef = useRef(null);
  const desc = { __html: content };
  const dispatch = useDispatch();

  const {loadingWhenCreatingComment} = useSelector((state) => state.posts);

  const onCommentChangeHandler = (e) => {
    setComment(e.target.value);
  };

  const onFocusCommentInput = () => {
    commentInputRef.current.focus();
  };

  const onClickCommentHandler = () => {
    if(content !== "") {
      dispatch(createCommentAsync({ content: comment, post_id: id, setComment }));
      dispatch(onAddComment({post_id: id, user_id: myProfile.id, content: comment}));
      setCommentError(false);
    } else {
      setCommentError(true);
    }
  };

  const handleVotesClick = () => {
    dispatch(upVotesPostAsync({ id }));
    dispatch(
      upVotesDetailPost({
        user_id: myProfile.id,
        post_id: id,
      })
    );
  };

  const onCloseModal = () => {
    dispatch(setPostModal(false));
    dispatch(setCurrentPostToNull());
    setComment("");
  };

  return (
    <section
      className={`px-3 md:px-0 container flex h-[40rem] ${
        comments > 0 ? "h-[40rem]" : "h-fit"
      } w-96  ${
        image ? "sm:w-[70rem]" : ""
      }  rounded-md text-textPrimary bg-eerieBlack `}
    >
      <div className="flex min-w-full">
        {image !== null ? (
          <div className={`items-baseline w-full h-full`}>
            <img
              src={image}
              alt="post"
              className="object-contain w-full h-full md:px-2"
            />
          </div>
        ) : null}
        <div className="relative flex flex-col items-center w-full ">
          {/* button close modal */}
          <div className="absolute left-0 z-20 flex items-center w-full gap-3 px-1 md:px-4 py-2">
            <button
              className="absolute right-2 top-1 md:right-0 md:top-0"
              onClick={onCloseModal}
            >
              <IoClose className="text-3xl text-textSecondary" />
            </button>
            <img
              src={
                user?.photo_profile?.photo_profile || placeholderPhotoProfile
              }
              alt="img post"
              className="object-cover w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium text-textPrimary">
                {user?.name}
              </p>
              <p className="text-[10px] font-medium text-textSecondary">
                {user?.biodata?.role}
              </p>
            </div>
          </div>
          {/* content section */}
          <div className="w-full px-1 md:px-4 py-2 overflow-auto border-y border-[#262626] h-[25rem] mt-12">
            <div
              dangerouslySetInnerHTML={desc}
              className="text-[15px] text-textPrimary whitespace-pre-wrap"
            />
            {image !== null ? (
              <img
                src={image}
                alt="post"
                className="md:hidden object-contain w-full mt-1"
              />
            ) : null}
            <div className="flex gap-2 mt-2 text-[10px] font-medium">
              <p className="text-[#A9A9A9]">{formattedDate(created_at)}</p>
              <p className="text-[#7A7A7A]">•</p>
              <p className="text-[#A9A9A9]">{formattedTime(updated_at)}</p>
            </div>
            <p className="mt-5 text-xs font-medium text-textSecondary">
              {comments?.length} comments
            </p>
            <div className="h-[2px] mt-3 mb-5 bg-[#262626]" />

            {/* comment data section */}
            <div className="flex flex-col gap-5">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-1">
                    <img
                      src={
                        comment?.user?.photo_profile?.photo_profile ||
                        placeholderPhotoProfile
                      }
                      alt="img post"
                      className="object-cover w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="w-full px-3 py-2 rounded-md bg-searchInput">
                        <div className="flex flex-col mb-2">
                          <div className="flex items-baseline gap-2">
                            <p className="text-sm font-medium text-textPrimary">
                              {comment.user.name}
                            </p>
                            <p className="text-xs text-[#7A7A7A]">•</p>
                            <p className="text-[10px] text-[#A9A9A9]">
                              {formattedTime(comment.updated_at)}
                            </p>
                          </div>
                          <p className="text-[9px] font-medium text-textSecondary">
                            {comment.user.biodata?.role}
                          </p>
                        </div>
                        <p className="text-xs whitespace-pre-wrap">
                          {comment.content}
                        </p>
                      </div>
                      <div className="flex gap-1 my-2 text-xs text-textPrimary">
                        <button>Like</button>
                        <p className="text-xs text-[#7A7A7A]">•</p>
                        <p>{comment.comments_up_votes.length}</p>
                        <p className="text-xs mx-2 text-[#eaeaea]">|</p>
                        <button>Reply</button>
                        <p className="text-xs text-[#7A7A7A]">•</p>
                        <p>{comment.reply_comments.length}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-textSecondary">
                  There are no comments on this post.
                </p>
              )}
            </div>
          </div>

          {/* Like and comment button section */}
          <div className="flex flex-col gap-1 px-4 pb-2 text-xs">
            <div className="flex gap-5 my-3 text-textPrimary">
              <div className="flex items-center gap-1">
                <button onClick={handleVotesClick}>
                  <img
                    src={
                      post_up_votes.find(
                        (vote) => myProfile && vote.user_id === myProfile.id
                      )
                        ? iconLoveFilled
                        : iconLove
                    }
                    alt=""
                    className="w-7"
                  />
                </button>
                <p>{post_up_votes.length} Likes</p>
              </div>
              <div className="flex items-center gap-2 ">
                <button onClick={onFocusCommentInput}>
                  <img src={iconComment} alt="" className="w-6" />
                </button>
                <p>{comments.length}</p>
              </div>
            </div>
            <div className="flex items-center w-full gap-2 ">
              <img
                src={
                  myProfile === null || myProfile.photo_profile === null
                    ? placeholderPhotoProfile
                    : myProfile.photo_profile.photo_profile
                }
                alt="img post"
                className="object-cover rounded-full w-7 h-7"
              />
              <div className="flex gap-2">
                <textarea
                  ref={commentInputRef}
                  className={`py-2 px-3 w-[17rem] ${
                    image ? "md:w-72" : "md:w-64"
                  } text-[10px] bg-searchInput border border-[#262626] rounded-md text-textPrimary overflow-auto h-10 cursor-text text-sm  placeholder:text-textPrimary focus:border-[#2d2d2d] focus:outline focus:ring-0 `}
                  onChange={onCommentChangeHandler}
                  value={comment}
                ></textarea>
                <button
                  type="submit"
                  onClick={() => onClickCommentHandler()}
                  className={`${comment === "" || loadingWhenCreatingComment ? 'hover:cursor-not-allowed opacity-60' : "hover:text-ufoGreen transition-all duration-300 hover:shadow hover:bg-opacity-70"} bg-searchInput   right-0 px-3 me-10 w-auto rounded-md py-2 h-10 text-lg font-medium  text-[#A9A9A9] `}
                  disabled={comment === "" || loadingWhenCreatingComment ?  true : false}
                >
                  { loadingWhenCreatingComment ? <ImSpinner2 className="w-6 h-6 text-white animate-spin" /> : <IoIosSend title="Send" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

PostDetail.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  post_up_votes: PropTypes.arrayOf(PropTypes.object).isRequired,
  myProfile: PropTypes.instanceOf(Object).isRequired,
};
