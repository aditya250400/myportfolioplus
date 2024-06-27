import React from "react";
import { formattedTime } from "../../utils";
import placeholderPhotoProfile from "../../assets/images/placeholderPhotoProfile.png";
import { Dropdown } from "flowbite-react";
import { IoIosMore } from "react-icons/io";


const ReplyComment = ({ replyComment, myProfile }) => {
  return (
    <div key={replyComment.id} className="pl-8 flex gap-1 mb-2 relative">
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
          <p className="text-xs whitespace-pre-wrap">{replyComment.content}</p>
        </div>
      </div>
      {myProfile.id === replyComment.user_id ? (
        <div className="hover:cursor-pointer h-fit">
          <Dropdown
            className=""
            label=""
            dismissOnClick={false}
            renderTrigger={() => <button><IoIosMore /></button>}
          >
              <Dropdown.Item
                className="text-white  hover:bg-blue-800"
              >
                Edit
              </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              className="text-white  hover:bg-blue-800"
            >
              Delete
            </Dropdown.Item>
          </Dropdown>
        </div>
      ) : null}
    </div>
  );
};

export default ReplyComment;
