import React from "react";
import { formattedTime } from "../../utils";
import placeholderPhotoProfile from "../../assets/images/placeholderPhotoProfile.png";
import { IoIosMore } from "react-icons/io";
import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";
import DeleteModal from "../Modal/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteConfirmId,
  setDeleteConfirmReplyId,
} from "../../states/modal/modalSlice";
import {
  deleteCommentAsync,
  getCommentByIdAsync,
} from "../../states/comments/commentsThunk";
import { onRemoveComment } from "../../states/posts/postsSlice";
import { setCurrentCommentReply, setStatusEditComment, setStatusEditCommentReply } from "../../states/comments/commentsSlice";
import CommentEditInput from "../Input/CommentEditInput";
import CommentEditInputLoading from "../Loading/CommentEditInputLoading";

const Comment = ({
  comment,
  handleVotesCommentClick,
  onReplyHandler,
  myProfile,
  postId,
}) => {
  const { deleteConfirmId } = useSelector((state) => state.modal);
  const { editCommentId, loadingCurrentComment } = useSelector(
    (state) => state.comments
  );
  const dispatch = useDispatch();

  const onDeleteData = (commentId) => {
    dispatch(deleteCommentAsync({ id: commentId, postId }));
    dispatch(
      onRemoveComment({
        post_id: postId,
        comment_id: commentId,
        user_id: myProfile.id,
      })
    );
  };

  const onShowModalDelete = () => {
    dispatch(setDeleteConfirmReplyId(null));
    dispatch(
      setDeleteConfirmId(deleteConfirmId === comment.id ? null : comment.id)
    );
  };

  const onEditComment = (id) => {
    dispatch(getCommentByIdAsync({ id }));
    dispatch(setStatusEditComment(id));
    dispatch(setStatusEditCommentReply(null));
    dispatch(setCurrentCommentReply(null));
  };
  return (
    <>
      {editCommentId === comment.id ? (
        !loadingCurrentComment ? (
          <CommentEditInput myProfile={myProfile} />
        ) : (
          <CommentEditInputLoading />
        )
      ) : (
        <div className="flex gap-1 relative">
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
                    {formattedTime(comment.created_at)}
                  </p>
                </div>
                <p className="text-[9px] font-medium text-textSecondary">
                  {comment.user.biodata?.role}
                </p>
              </div>
              <p className="text-xs whitespace-pre-wrap">{comment.content}</p>
            </div>
            <div className="flex gap-1 my-2 text-xs text-textPrimary">
              <button onClick={() => handleVotesCommentClick(comment.id)}>
                Like
              </button>
              <p className="text-xs text-[#7A7A7A]">•</p>
              <p>{comment.comments_up_votes.length}</p>
              <p className="text-xs mx-2 text-[#eaeaea]">|</p>
              <button
                onClick={() =>
                  onReplyHandler({ id: comment.id, name: comment.user.name })
                }
              >
                Reply
              </button>
              <p className="text-xs text-[#7A7A7A]">•</p>
              <p>{comment.reply_comments.length}</p>
            </div>
          </div>
          {myProfile.id === comment.user_id ? (
            <div className="hover:cursor-pointer h-fit">
              <Dropdown
                className="relative"
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <button>
                    <IoIosMore />
                  </button>
                )}
              >
                <Dropdown.Item
                  className="text-white  hover:bg-blue-800"
                  onClick={() => onEditComment(comment.id)}
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="text-white  hover:bg-blue-800"
                  onClick={onShowModalDelete}
                >
                  Delete
                </Dropdown.Item>
                <DeleteModal
                  id={comment.id}
                  targetName={"Comment"}
                  onDeleteData={onDeleteData}
                />
              </Dropdown>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Comment;
