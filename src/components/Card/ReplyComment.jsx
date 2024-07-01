import React from "react";
import { formattedTime } from "../../utils";
import placeholderPhotoProfile from "../../assets/images/placeholderPhotoProfile.png";
import { Dropdown } from "flowbite-react";
import { IoIosMore } from "react-icons/io";
import DeleteModal from "../Modal/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteConfirmId,
  setDeleteConfirmReplyId,
} from "../../states/modal/modalSlice";
import {
  deleteCommentReplyAsync,
  getCommentReplyByIdAsync,
} from "../../states/comments/commentsThunk";
import { setCurrentComment, setStatusEditComment, setStatusEditCommentReply } from "../../states/comments/commentsSlice";
import CommentEditInputLoading from "../Loading/CommentEditInputLoading";
import CommentReplyEditInput from "../Input/CommentReplyEditInput";

const ReplyComment = ({ replyComment, myProfile, post_id }) => {
  const dispatch = useDispatch();
  const { deleteConfirmReplyId } = useSelector((state) => state.modal);
  const { editCommentReplyId, loadingCurrentCommentReply } = useSelector((state) => state.comments);
  const onDeleteData = (commentId) => {
    dispatch(deleteCommentReplyAsync({ id: commentId, postId: post_id }));
  };

  const onEditComment = (id) => {
    dispatch(getCommentReplyByIdAsync({ id }));
    dispatch(setStatusEditCommentReply(id));
    dispatch(setStatusEditComment(null));
    dispatch(setCurrentComment(null));
  };

  const onShowModalDelete = () => {
    dispatch(
      setDeleteConfirmReplyId(
        deleteConfirmReplyId === replyComment.id ? null : replyComment.id
      )
    );
    dispatch(setDeleteConfirmId(null));
  };
  return (
    <>
      {editCommentReplyId === replyComment.id ? (
       !loadingCurrentCommentReply ? (
        <CommentReplyEditInput myProfile={myProfile} postId={post_id}/>
       ) : (
        <CommentEditInputLoading />
       )
      ) : (
        <div className="relative pl-8 flex gap-1 mb-2 ">
          <img
            src={
              replyComment?.user?.photo_profile?.photo_profile ||
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
                    {replyComment.user.name}
                  </p>
                  <p className="text-xs text-[#7A7A7A]">•</p>
                  <p className="text-[10px] text-[#A9A9A9]">
                    {formattedTime(replyComment.created_at)}
                  </p>
                </div>
                <p className="text-[9px] font-medium text-textSecondary">
                  {replyComment.user.biodata?.role}
                </p>
              </div>
              <p className="text-xs whitespace-pre-wrap">
                {replyComment.content}
              </p>
            </div>
          </div>
          {myProfile.id === replyComment.user_id ? (
            <>
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
                    onClick={() => onEditComment(replyComment.id)}
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
                </Dropdown>
                <DeleteModal
                  id={replyComment.id}
                  targetName={"Comment"}
                  onDeleteData={onDeleteData}
                />
              </div>
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ReplyComment;
