import React, { useEffect, useRef, useState } from 'react';
import { Button, FileInput } from 'flowbite-react';
import { IoAlertCircleSharp, IoClose } from 'react-icons/io5';
import PropTypes from 'prop-types';
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';
import { useDispatch } from 'react-redux';
import { createPortfolioAsync, portfoliosAsync } from '../../states/portfolios/portfoliosThunk';
import { myProfileAsync } from '../../states/myProfile/myProfileThunk';

export default function PortfolioInput({ closeModal: closeParentModal, myProfile }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [titleNotification, setTitleNotification] = useState('');
  const [linkNotification, setLinkNotification] = useState('');
  const [contentNotification, setContentNotification] = useState('');
  const [fileNotification, setFileNotification] = useState('');
  const [modalStatus, setModalStatus] = useState('open');

  const dispatch = useDispatch();
  const titleRef = useRef(null);

  const closeModal = () => {
    setModalStatus('closing');
  };

  const onTitleChangeHandler = (e) => {
    const newTitle = e.target.innerText;
    setTitle(newTitle);

    if (newTitle.trim() !== '') {
      setTitleNotification('');
    } else {
      setTitleNotification('Title must not be empty or space!');
    }
  };

  const onLinkChangeHandler = (e) => {
    const newLink = e.target.innerText;
    setLink(newLink);

    if (newLink.trim() !== '') {
      setLinkNotification('');
    } else {
      setLinkNotification('Link must not be empty or space!');
    }
  };

  const onContentChangeHandler = (e) => {
    const newContent = e.target.innerText;
    setContent(newContent);

    if (newContent.trim() !== '') {
      setContentNotification('');
    } else {
      setContentNotification('Content must not be empty or space!');
    }
  };

  const onFileChangeHandler = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);

    if (newFile) {
      setFileNotification('');
    } else {
      setFileNotification('Please upload an image!');
    }
  };

  const onShareClickHandler = async () => {
    const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (title.trim() === '' && content.trim() === '' && link.trim() === '') {
      setTitleNotification('Title must not be empty or space!');
      setLinkNotification('Link must not be empty or space!');
      setContentNotification('Content must not be empty or space!');
    } else if (!file) {
      setFileNotification('Please upload an image!');
    } else if (!fileTypes.includes(file.type)) {
      setFileNotification('Only JPG, JPEG, and PNG files are allowed!');
    } else {
      await dispatch(createPortfolioAsync({ title, description: content, image: file, link }));
      dispatch(portfoliosAsync());
      dispatch(myProfileAsync());
      closeModal();
    }
  };

  useEffect(() => {
    if (modalStatus === 'closing') {
      setTimeout(() => {
        closeModal();
        closeParentModal();
      }, 500);
    }
  }, [modalStatus, closeModal, closeParentModal]);

  useEffect(() => {
    if (modalStatus === 'open' && titleRef.current) {
      titleRef.current.focus();
    }
  }, [modalStatus]);

  return (
    <section
      className={`w-full h-full sm:w-[40rem] mx-auto sm:my-16 rounded-xl text-textPrimary bg-eerieBlack animate__animated ${
        modalStatus === 'open'
          ? 'animate__fadeInDown animate__faster'
          : 'animate__fadeOutUp animate__faster'
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
                {myProfile === null ? '' : myProfile.name}
              </p>
              <p className="text-[10px] font-medium text-textSecondary">
                {myProfile === null || myProfile.biodata == null ? '' : myProfile.biodata.role}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="p-1 text-2xl transition-all duration-200 ease-out rounded-full cursor-pointer hover:bg-fernGreen"
            onClick={closeModal}
            onKeyDown={() => {}}
            tabIndex={0}
            aria-label="Close"
          >
            <IoClose className="text-xl text-textSecondary" />
          </button>
        </div>
        <div className="flex flex-col gap-2 my-5">
          <div>
            <div
              ref={titleRef}
              className="h-12 p-3 px-5 overflow-auto border-none rounded-lg outline-none bg-searchInput"
              contentEditable
              onInput={onTitleChangeHandler}
              data-placeholder="Title..."
            />
            {titleNotification && (
              <div className="flex gap-1 mt-1">
                <IoAlertCircleSharp className="text-sm text-red-500" />
                <p className="text-xs font-medium text-red-400 ">{titleNotification}</p>
              </div>
            )}
          </div>
          <div>
            <div
              className="h-12 p-3 px-5 overflow-auto border-none rounded-lg outline-none bg-searchInput"
              contentEditable
              onInput={onLinkChangeHandler}
              data-placeholder="Link or URL..."
            />
            {linkNotification && (
              <div className="flex gap-1 mt-1">
                <IoAlertCircleSharp className="text-sm text-red-500" />
                <p className="text-xs font-medium text-red-400 ">{linkNotification}</p>
              </div>
            )}
          </div>
          <div>
            <div
              className="p-5 overflow-auto border-none rounded-lg outline-none h-52 bg-searchInput"
              contentEditable
              onInput={onContentChangeHandler}
              data-placeholder="Description..."
            />
            {contentNotification && (
              <div className="flex gap-1 mt-1">
                <IoAlertCircleSharp className="text-sm text-red-500" />
                <p className="text-xs font-medium text-red-400 ">{contentNotification}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-8">
          <div>
            <FileInput
              color="success"
              id="image-upload"
              onChange={onFileChangeHandler}
              className="bg-searchInput"
            />
            <p className="mt-2 text-xs font-medium text-[#A9A9A9]">PNG, JPG, or JPEG</p>
            {fileNotification && (
              <div className="flex w-full gap-1 mt-1">
                <IoAlertCircleSharp className="text-sm text-red-500" />
                <p className="text-xs font-medium text-red-400 ">{fileNotification}</p>
              </div>
            )}
          </div>
        </div>
        <Button
          type="submit"
          fullSized
          color=""
          onClick={() => onShareClickHandler()}
          className={`font-semibold bg-fernGreen active:outline-none active:ring-none hover:bg-opacity-80 ${!title && !link && !content && !file ? 'bg-opacity-100 hover:bg-opacity-100' : ''}`}
          disabled={!title || !link || !content || !file}
        >
          Post
        </Button>
      </div>
    </section>
  );
}

PortfolioInput.propTypes = {
  closeModal: PropTypes.func,
  myProfile: PropTypes.instanceOf(Object)
};
