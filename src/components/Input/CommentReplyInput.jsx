import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoIosSend } from "react-icons/io";
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';

const CommentReplyInput = ({
  myProfile,
  commentReplyInputRef,
  onCommentReplyChangeHandler,
  commentReply,
  onClickCommentReplyHandler,
  loadingWhenCreatingCommentReply,
  image
}) => {
  return (
    <div className="pl-8 flex items-center gap-2 mb-10">
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
          ref={commentReplyInputRef}
          className={`py-2 px-3 w-48 md:w-56 ${image === null ? 'lg:w-56' : 'lg:w-72'} text-[10px] bg-searchInput border border-[#262626] rounded-md text-textPrimary overflow-auto h-16 cursor-text text-sm  placeholder:text-slate-300 placeholder:text-sm focus:border-[#2d2d2d] focus:outline focus:ring-0`}
          onChange={onCommentReplyChangeHandler}
          placeholder="Reply a Comment here..."
          value={commentReply}
        ></textarea>
        <button
          type="submit"
          onClick={() => onClickCommentReplyHandler()}
          className={`${
            commentReply === "" || loadingWhenCreatingCommentReply
              ? "hover:cursor-not-allowed opacity-60"
              : "hover:text-ufoGreen transition-all duration-300 hover:shadow hover:bg-opacity-70"
          } bg-searchInput   right-0 px-3 me-10 w-auto rounded-md py-2 h-10 text-lg font-medium  text-[#A9A9A9] `}
          disabled={
            commentReply === "" || loadingWhenCreatingCommentReply ? true : false
          }
        >
          {loadingWhenCreatingCommentReply ? (
            <ImSpinner2 className="w-6 h-6 text-white animate-spin" />
          ) : (
            <IoIosSend title="Send" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CommentReplyInput;
