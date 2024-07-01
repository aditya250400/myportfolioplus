import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoIosSend } from "react-icons/io";
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';
import { useSelector } from "react-redux";

const CommentEditInputLoading = () => {
  const {myProfile} = useSelector((state) => state.myProfile);
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
          placeholder="Loading..."
          className={`py-2 px-3 w-64 text-[10px] bg-searchInput border border-[#262626] rounded-md overflow-auto h-[70px] animate-pulse `}
        />
        <button
          type="submit"
          className={`hover:cursor-not-allowed opacity-60 hover:text-ufoGreen transition-all duration-300 hover:shadow hover:bg-opacity-70 bg-searchInput   right-0 px-3 me-10 w-auto rounded-md py-2 h-10 text-lg font-medium  text-[#A9A9A9] animate-pulse`}
          disabled={true}
        >
            <IoIosSend title="Send" />
        </button>
      </div>
    </div>
   </div>
  );
};

export default CommentEditInputLoading;
