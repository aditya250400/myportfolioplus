import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoIosSend } from "react-icons/io";
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';

const CommentInput = ({
  myProfile,
  commentInputRef,
  onCommentChangeHandler,
  comment,
  onClickCommentHandler,
  loadingWhenCreatingComment,
  image,
}) => {
  return (
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
          className={`${
            comment === "" || loadingWhenCreatingComment
              ? "hover:cursor-not-allowed opacity-60"
              : "hover:text-ufoGreen transition-all duration-300 hover:shadow hover:bg-opacity-70"
          } bg-searchInput   right-0 px-3 me-10 w-auto rounded-md py-2 h-10 text-lg font-medium  text-[#A9A9A9] `}
          disabled={comment === "" || loadingWhenCreatingComment ? true : false}
        >
          {loadingWhenCreatingComment ? (
            <ImSpinner2 className="w-6 h-6 text-white animate-spin" />
          ) : (
            <IoIosSend title="Send" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
