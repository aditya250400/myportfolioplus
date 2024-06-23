import React, { useEffect, useRef, useState } from "react";
import "animate.css";
import { IoClose, IoAlertCircleSharp } from "react-icons/io5";
import { FileInput, Button, Textarea } from "flowbite-react";
import PropTypes from "prop-types";
import placeholderPhotoProfile from "../../assets/images/placeholderPhotoProfile.png";
import { useDispatch, useSelector } from "react-redux";
import { createPostAsync, updatePostAsync } from "../../states/posts/postThunk";
import { ImSpinner2 } from "react-icons/im";
import { setModalProgress } from "../../states/modal/modalSlice";
import { useNavigate } from "react-router-dom";
import { FaRegImage } from "react-icons/fa6";
import { setCurrentPostToNull, setEditPostStatus } from "../../states/posts/postsSlice";

export default function WriteProgressInput({ myProfile }) {
  const { loadingWhenCreatingPost, currentPost, editPostStatus } = useSelector((state) => state.posts);
  const [content, setContent] = useState(currentPost?.content || "");
  const [file, setFile] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [contentNotification, setContentNotification] = useState("");
  const [fileNotification, setFileNotification] = useState("");
  const [thumbnail, setThumbnail] = useState(currentPost?.image || null);
  const { modalProgress } = useSelector((state) => state.modal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const onContentChangeHandler = (e) => {
    setContent(e.target.value);
    if (e.target.value.trim() !== "") {
      setContentNotification("");
    } else {
      setContentNotification("Content must not be empty or space");
    }
  };

  const onFileChangeHandler = (e) => {
    const image = e.target.files[0];
    const fileTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!fileTypes.includes(image.type)) {
      setFileNotification("Only JPG, JPEG, and PNG files are allowed");
    } else {
      const imageURL = URL.createObjectURL(image);
      setThumbnail(imageURL);
      setFileNotification("");
      setFile(image);
    }
  };

  const onShareClickHandler = async () => {
    if (content.trim() === "") {
      setContentNotification("Content must not be empty or space");
    } else {
      dispatch(editPostStatus ? updatePostAsync({content, image: file, id: currentPost.id, removeImage}) : createPostAsync({ content, image: file, navigate }));
    }
  };

  const onCloseModal = () => {
    dispatch(setModalProgress(false));
    dispatch(setEditPostStatus(false));
    dispatch(setCurrentPostToNull());
  }

  useEffect(() => {
    if (modalProgress && inputRef.current) {
      inputRef.current.focus();
    }
  }, [modalProgress]);


  return (
    <section
      className={`w-full  sm:w-[40rem] mx-auto sm:my-16 rounded-xl text-textPrimary bg-eerieBlack animate__animated ${
        modalProgress
          ? "animate__fadeInDown animate__faster"
          : "animate__fadeOutUp animate__faster"
      }`}
    >
      <div className="p-5">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <img
              src={
                myProfile === null || myProfile.photo_profile === null
                  ? placeholderPhotoProfile
                  : myProfile.photo_profile.photo_profile
              }
              alt="img post"
              className="object-cover w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-base font-medium text-textPrimary">
                {myProfile === null ? "" : myProfile.name}
              </p>
              <p className="text-[10px] font-medium text-textSecondary">
                {myProfile === null || myProfile.biodata == null
                  ? ""
                  : myProfile.biodata.role}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="p-1 text-2xl transition-all duration-200 ease-out rounded-full cursor-pointer hover:bg-fernGreen"
            onClick={onCloseModal}
            onKeyDown={() => {}}
            tabIndex={0}
            aria-label="Close"
          >
            <IoClose className="text-xl text-textSecondary" />
          </button>
        </div>
        <div className="mt-5 mb-3 rounded-lg bg-gray-700">
          <Textarea
            ref={inputRef}
            type="text"
            className="p-5 overflow-auto border-none h-48 bg-searchInput resize-none focus:outline-none border border-white focus:ring-0 placeholder:text-[#A9A9A9]"
            value={content}
            onChange={onContentChangeHandler}
            placeholder="Start typing what's on your mind"
          />
          {thumbnail !== null ? (
            <div className="relative bg-scroll rounded-xl overflow-hidden">
              <div className="flex flex-col p-2">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="top-0 right-0 p-1 text-2xl transition-all duration-200 ease-out rounded-full cursor-pointer bg-gray-900 mb-2"
                    onClick={() => {
                      setThumbnail(null);
                      setFile(null);
                      setRemoveImage(editPostStatus ? true : false);
                    }}
                  >
                    <IoClose className="text-xl text-textSecondary" />
                  </button>
                </div>
                <img
                  src={thumbnail}
                  className="object-fill  w-full rounded-xl "
                />
              </div>
            </div>
          ) : (
            <div className="p-2">
              <label htmlFor="image-upload" className="text-3xl">
                <FaRegImage />
              </label>
              <p className="mt-2 text-xs font-medium text-[#A9A9A9]">
              PNG, JPG, or JPEG
            </p>
            </div>
          )}

          {contentNotification && (
            <div className="flex gap-1 mt-1">
              <IoAlertCircleSharp className="text-sm text-red-500" />
              <p className="text-xs font-medium text-red-400 ">
                {contentNotification}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-8">
          <div>
            <input
              type="file"
              hidden
              accept="image/*"
              id="image-upload"
              onChange={onFileChangeHandler}
              className="bg-searchInput"
            />
           
            {fileNotification && (
              <div className="flex gap-1 mt-1">
                <IoAlertCircleSharp className="text-sm text-red-500" />
                <p className="text-xs font-medium text-red-400 ">
                  {fileNotification}
                </p>
              </div>
            )}
          </div>
        </div>
        <Button
          type="button"
          fullSized
          color=""
          onClick={onShareClickHandler}
          className={`font-semibold bg-fernGreen active:outline-none active:ring-none hover:bg-opacity-80 ${
            !content || !file ? "bg-opacity-100 hover:bg-opacity-100" : ""
          }`}
          disabled={!content || loadingWhenCreatingPost}
        >
          {loadingWhenCreatingPost ? (
            <ImSpinner2 className="text-center w-6 h-6 text-white animate-spin" />
          ) : editPostStatus ? 'Edit' : 'Share' 
          }
        </Button>
      </div>
    </section>
  );
}

WriteProgressInput.propTypes = {
  myProfile: PropTypes.instanceOf(Object),
};
