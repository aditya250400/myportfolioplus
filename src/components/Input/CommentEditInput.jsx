import React, { useEffect, useRef, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentComment, setStatusEditComment } from "../../states/comments/commentsSlice";
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';
import { updateCommentAsync } from "../../states/comments/commentsThunk";

const CommentEditInput = ({
  myProfile}) => {
    const {currentComment, loadingWhenUpdatingComment} = useSelector((state) => state.comments);
    const [content, setContent] = useState(currentComment?.content || "");
    const [_, setCommentError] = useState(false);
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const onEdit = () => {
      if (content !== "") {
        dispatch(
          updateCommentAsync({
            content: content,
            setContent,
            post_id: currentComment.post_id,
            id: currentComment.id
          })
        );
        setCommentError(false);
      } else {
        setCommentError(true);
      }
    };
  
    
    const onCancelEdit = () => {
      dispatch(setStatusEditComment(null)); 
      dispatch(setCurrentComment());
    }


    useEffect(() => {
      inputRef.current.focus();
    }, [])
  return (
   <div className="flex flex-col gap-1 mb-2">
     <div className="flex w-full gap-2">
      <img
        src={
          myProfile === null || myProfile.photo_profile === null
            ? placeholderPhotoProfile
            : myProfile.photo_profile.photo_profile
        }
        alt="img post"
        className="object-cover rounded-full w-8 h-8"
      />
      <div className="flex gap-2">
        <textarea
          ref={inputRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`py-2 px-3 w-56 text-[10px] bg-searchInput border border-[#262626] rounded-md text-textPrimary overflow-auto h-[70px] cursor-text text-sm  placeholder:text-textPrimary focus:border-[#2d2d2d] focus:outline focus:ring-0 `}
        ></textarea>
        <button
          type="submit"
          onClick={onEdit}
          className={`${
            content === "" || loadingWhenUpdatingComment
              ? "hover:cursor-not-allowed opacity-60"
              : "hover:text-ufoGreen transition-all duration-300 hover:shadow hover:bg-opacity-70"
          } bg-searchInput   right-0 px-3 me-10 w-auto rounded-md py-2 h-10 text-lg font-medium  text-[#A9A9A9] `}
          disabled={content === "" || loadingWhenUpdatingComment ? true : false}
        >
          {loadingWhenUpdatingComment ? (
            <ImSpinner2 className="w-6 h-6 text-white animate-spin" />
          ) : (
            <IoIosSend title="Send" />
          )}
        </button>
      </div>
    </div>
    <div>
      <button onClick={onCancelEdit} className="text-blue-500 font-semibold text-sm">Cancel</button>
    </div>
   </div>
  );
};

export default CommentEditInput;
