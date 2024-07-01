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
import {
  createCommentAsync,
  createReplyCommentAsync,
} from "../../states/comments/commentsThunk";
import {
  onAddComment,
  setCurrentPostToNull,
  upVotesComment,
  upVotesDetailPost,
} from "../../states/posts/postsSlice";
import { IoClose } from "react-icons/io5";
import { setDeleteConfirmId, setDeleteConfirmReplyId, setPostModal } from "../../states/modal/modalSlice";
import {
  getDetailPostAsync,
  upVotesCommentAsync,
  upVotesPostAsync,
} from "../../states/posts/postThunk";
import { ImSpinner2 } from "react-icons/im";
import Comment from "./Comment";
import ReplyComment from "./ReplyComment";
import CommentInput from "../Input/CommentInput";
import CommentReplyInput from "../Input/CommentReplyInput";
import { ToastContainer } from "react-toastify";
import { setStatusEditComment, setStatusEditCommentReply } from "../../states/comments/commentsSlice";

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
  const [commentReply, setCommentReply] = useState("");
  const [commentError, setCommentError] = useState(false);
  const [commentReplyError, setCommentReplyError] = useState(false);
  const [commentDetailForReply, setCommentDetailForReply] = useState(null);
  const [paginateReplyComment, setPaginateReplyComment] = useState(2);
  const [commentDetailForPagination, setCommentDetailForPagination] = useState(
    null
  );
  const [replyCommentLength, setReplyCommentLength] = useState(null);
  const commentInputRef = useRef(null);
  const commentReplyInputRef = useRef(null);
  const desc = { __html: content };
  const dispatch = useDispatch();
  const {
    loadingWhenCreatingComment,
    loadingWhenCreatingCommentReply,
  } = useSelector((state) => state.posts);

  const onCommentChangeHandler = (e) => {
    setComment(e.target.value);
  };
  const onCommentReplyChangeHandler = (e) => {
    setCommentReply(e.target.value);
  };

  const onFocusCommentInput = () => {
    commentInputRef.current.focus();
  };

  const onClickCommentHandler = () => {
    if (comment !== "") {
      dispatch(
        createCommentAsync({ content: comment, post_id: id, setComment })
      );
      dispatch(
        onAddComment({ post_id: id, user_id: myProfile.id, content: comment })
      );
      setCommentError(false);
    } else {
      setCommentError(true);
    }
  };

  const onClickCommentReplyHandler = () => {
    if (commentReply !== "") {
      dispatch(
        createReplyCommentAsync({
          content: commentReply,
          comment_id: commentDetailForReply.id,
          setCommentReply,
          post_id: id,
        })
      );
      setPaginateReplyComment(
        paginateReplyComment > 2
          ? paginateReplyComment + 1
          : paginateReplyComment
      );
      setCommentReplyError(false);
    } else {
      setCommentReplyError(true);
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

  const handleVotesCommentClick = (commentId) => {
    dispatch(upVotesCommentAsync({ id: commentId }));
    dispatch(
      upVotesComment({
        user_id: myProfile.id,
        comment_id: commentId,
      })
    );
  };

  const onCloseModal = () => {
    dispatch(setPostModal(false));
    dispatch(setCurrentPostToNull());
    dispatch(setDeleteConfirmReplyId(null));
    dispatch(setDeleteConfirmId(null));
    setComment("");
  };

  const onReplyHandler = (commentDetail) => {
    if (
      commentDetailForReply !== null &&
      commentDetail?.id === commentDetailForReply.id
    ) {
      setCommentDetailForReply(null);
    } else {
      setCommentDetailForReply(commentDetail);
      setTimeout(() => commentReplyInputRef.current.focus(), 500);
    }
  };

  const onCommentPaginate = ({ commentId, replyLength }) => {
    setCommentDetailForPagination(commentId);
    setReplyCommentLength(replyLength);
    setPaginateReplyComment(replyLength);
  };

  return (
    <>
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
              <div className="flex flex-col gap-2">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <>
                      <Comment
                        comment={comment}
                        key={comment.id}
                        handleVotesCommentClick={handleVotesCommentClick}
                        onReplyHandler={onReplyHandler}
                        myProfile={myProfile}
                        postId={id}
                      />
                      {comment.reply_comments.length > 0
                        ? comment.reply_comments
                            .slice(
                              0,
                              commentDetailForPagination === comment.id
                                ? paginateReplyComment
                                : 2
                            )
                            .map((replyComment) => (
                              <ReplyComment
                                myProfile={myProfile}
                                replyComment={replyComment}
                                key={replyComment.id}
                                post_id={id}
                              />
                            ))
                        : ""}
                      {comment.reply_comments.length > 2 ? (
                        comment.reply_comments.length ===
                          paginateReplyComment &&
                        commentDetailForPagination === comment.id ? (
                          <div className="flex justify-end pr-4 ">
                            <button
                              onClick={() => setPaginateReplyComment(2)}
                              className="mb-5 text-[12px] font-bold text-slate-300"
                            >
                              Show Less
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end pr-4 ">
                            <button
                              onClick={() =>
                                onCommentPaginate({
                                  commentId: comment.id,
                                  replyLength: comment.reply_comments.length,
                                })
                              }
                              className="mb-5 text-[12px] font-bold text-slate-300"
                            >
                              {comment.reply_comments.length} Replies
                            </button>
                          </div>
                        )
                      ) : (
                        ""
                      )}
                      {comment.id === commentDetailForReply?.id ? (
                        <CommentReplyInput
                          myProfile={myProfile}
                          commentReplyInputRef={commentReplyInputRef}
                          onCommentReplyChangeHandler={
                            onCommentReplyChangeHandler
                          }
                          commentReply={commentReply}
                          onClickCommentReplyHandler={
                            onClickCommentReplyHandler
                          }
                          loadingWhenCreatingCommentReply={
                            loadingWhenCreatingCommentReply
                          }
                          image={image}
                        />
                      ) : null}
                    </>
                  ))
                ) : (
                  <p className="text-sm text-textSecondary">
                    There are no comments on this post.
                  </p>
                )}
              </div>
            </div>

            {/* Footer Comment Section */}
            <div className="flex flex-col gap-1 px-4 pb-2 text-xs">
              {/* Like and comment Button */}
              <div className="flex gap-5 my-3 text-textPrimary">
                <div className="flex items-center gap-1">
                  <button onClick={() => handleVotesClick(id)}>
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
              {/* Create Comment Input */}
              <CommentInput
                myProfile={myProfile}
                commentInputRef={commentInputRef}
                onCommentChangeHandler={onCommentChangeHandler}
                comment={comment}
                onClickCommentHandler={onClickCommentHandler}
                loadingWhenCreatingComment={loadingWhenCreatingComment}
                image={image}
              />
            </div>
          </div>
        </div>
      </section>
    </>
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
