import React, { useEffect, useRef, useState } from "react";
import { Button, FileInput } from "flowbite-react";
import { IoAlertCircleSharp, IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import placeholderPhotoProfile from "../../assets/images/placeholderPhotoProfile.png";
import { useDispatch, useSelector } from "react-redux";
import {
  createPortfolioAsync,
  updatePortfolioAsync,
} from "../../states/portfolios/portfoliosThunk";
import { ImSpinner2 } from "react-icons/im";
import { setModalPortfolio } from "../../states/modal/modalSlice";
import { setEditPortfolioStatus } from "../../states/portfolios/portfoliosSlice";
import { FaRegImage } from "react-icons/fa6";

export default function PortfolioInput({ portfolio }) {
  const [title, setTitle] = useState(portfolio?.title || "");
  const [link, setLink] = useState(portfolio?.link || "");
  const [content, setContent] = useState(portfolio?.description || "");
  const [file, setFile] = useState(null);
  const [titleNotification, setTitleNotification] = useState("");
  const [linkNotification, setLinkNotification] = useState("");
  const [contentNotification, setContentNotification] = useState("");
  const [fileNotification, setFileNotification] = useState("");
  const [thumbnail, setThumbnail] = useState(portfolio?.image || null);
  const { loadingWhenCreatingPortfolio, editPortfolioStatus } = useSelector(
    (state) => state.portfolios
  );
  const { myProfile } = useSelector((state) => state.myProfile);
  const { modalPortfolio } = useSelector((state) => state.modal);

  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const fileInputRef = useRef(null);

  const onTitleChangeHandler = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    if (newTitle.trim() !== "") {
      setTitleNotification("");
    } else {
      setTitleNotification("Title must not be empty or space!");
    }
  };

  const onLinkChangeHandler = (e) => {
    const newLink = e.target.value;
    setLink(newLink);

    if (newLink.trim() !== "") {
      setLinkNotification("");
    } else {
      setLinkNotification("Link must not be empty or space!");
    }
  };

  const onContentChangeHandler = (e) => {
    const newContent = e.target.value;
    setContent(newContent);

    if (newContent.trim() !== "") {
      setContentNotification("");
    } else {
      setContentNotification("Content must not be empty or space!");
    }
  };

  const onFileChangeHandler = (e) => {
    const image = e.target.files[0];
    const fileTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!fileTypes.includes(image.type)) {
      setFileNotification("Only JPG, JPEG, and PNG files are allowed!");
    } else {
      const imageURL = URL.createObjectURL(image);
      setThumbnail(imageURL);
      setFileNotification("");
      setFile(image);
    }
  };

  const onShareClickHandler = async () => {
    if (title.trim() === "" && content.trim() === "" && link.trim() === "") {
      setTitleNotification("Title must not be empty or space!");
      setLinkNotification("Link must not be empty or space!");
      setContentNotification("Content must not be empty or space!");
    } else {
      dispatch(
        editPortfolioStatus
          ? updatePortfolioAsync({
              id: portfolio.id,
              title,
              link,
              description: content,
              image: file,
            })
          : createPortfolioAsync({
              title,
              description: content,
              image: file,
              link,
            })
      );
    }
  };

  const onClosePortfolioModal = () => {
    dispatch(setModalPortfolio(false));
    dispatch(setEditPortfolioStatus(false));
  };

  const onHandleRemoveImage = () => {
    setThumbnail(null);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (modalPortfolio && titleRef.current) {
      titleRef.current.focus();
    }
  }, [modalPortfolio]);

  return (
    <section
      className={`w-full h-full sm:w-[40rem] mx-auto sm:my-16 rounded-xl text-textPrimary bg-eerieBlack animate__animated ${
        modalPortfolio
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
            onClick={onClosePortfolioModal}
            onKeyDown={() => {}}
            tabIndex={0}
            aria-label="Close"
          >
            <IoClose className="text-xl text-textSecondary" />
          </button>
        </div>
        <div className="flex flex-col gap-2 my-3">
          <div>
            <input
              ref={titleRef}
              type="text"
              className="h-12 p-3 px-5 overflow-auto border-none rounded-lg outline-none bg-searchInput focus:outline-none focus:ring-0 w-full"
              onChange={onTitleChangeHandler}
              value={title}
              placeholder="Title..."
            />
            {titleNotification && (
              <div className="flex gap-1 mt-1">
                <IoAlertCircleSharp className="text-sm text-red-500" />
                <p className="text-xs font-medium text-red-400 ">
                  {titleNotification}
                </p>
              </div>
            )}
          </div>
          <div>
            <input
              type="url"
              className="h-12 p-3 px-5 overflow-auto border-none rounded-lg outline-none bg-searchInput w-full focus:outline-none focus:ring-0"
              onChange={onLinkChangeHandler}
              value={link}
              placeholder="Link or URL..."
            />
            {linkNotification && (
              <div className="flex gap-1 mt-1">
                <IoAlertCircleSharp className="text-sm text-red-500" />
                <p className="text-xs font-medium text-red-400 ">
                  {linkNotification}
                </p>
              </div>
            )}
          </div>
          <div>
            <textarea
              className="p-5 overflow-auto border-none rounded-lg outline-none h-52 bg-searchInput w-full resize-none focus:outline-none focus:ring-0"
              value={content}
              onChange={onContentChangeHandler}
              placeholder="Description..."
            />
            {contentNotification && (
              <div className="flex gap-1 mt-1">
                <IoAlertCircleSharp className="text-sm text-red-500" />
                <p className="text-xs font-medium text-red-400 ">
                  {contentNotification}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-8">
          <div>
            <div className="flex justify-between">
              <p className="font-bold text-base text-slate-300">Image</p>
              {thumbnail !== null ? (
                <button
                  type="button"
                  className="top-0 right-0 p-1 text-2xl transition-all duration-200 ease-out rounded-full cursor-pointer bg-gray-900 hover:bg-gray-800 mb-2"
                  onClick={onHandleRemoveImage}
                >
                  <IoClose className="text-xl text-textSecondary" />
                </button>
              ) : null}
            </div>
            {thumbnail !== null ? (
              <div className=" bg-scroll rounded-xl overflow-hidden">
                <div className="flex flex-col ">
                  <img
                    src={thumbnail}
                    className="object-fill w-full rounded-xl "
                  />
                </div>
              </div>
            ) : (
              <div className="my-2">
                <label
                  htmlFor="image-upload"
                  className="text-3xl hover:cursor-pointer"
                >
                  <FaRegImage />
                </label>
                <p className="mt-2 text-xs font-medium text-[#A9A9A9]">
                  PNG, JPG, or JPEG
                </p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              id="image-upload"
              onChange={onFileChangeHandler}
            />
            {fileNotification && (
              <div className="flex w-full gap-1 mt-1">
                <IoAlertCircleSharp className="text-sm text-red-500" />
                <p className="text-xs font-medium text-red-400 ">
                  {fileNotification}
                </p>
              </div>
            )}
          </div>
        </div>
        <Button
          type="submit"
          fullSized
          color=""
          onClick={() => onShareClickHandler()}
          className={`font-semibold bg-fernGreen active:outline-none active:ring-none hover:bg-opacity-80 ${
            !title && !link && !content && !file
              ? "bg-opacity-100 hover:bg-opacity-100"
              : ""
          }`}
          disabled={
            !title ||
            !link ||
            !content ||
            !thumbnail ||
            loadingWhenCreatingPortfolio
          }
        >
          {loadingWhenCreatingPortfolio ? (
            <ImSpinner2 className="text-center w-6 h-6 text-white animate-spin" />
          ) : editPortfolioStatus ? (
            "Edit"
          ) : (
            "Post"
          )}
        </Button>
      </div>
    </section>
  );
}

PortfolioInput.propTypes = {
  closeModal: PropTypes.func,
  myProfile: PropTypes.instanceOf(Object),
};
