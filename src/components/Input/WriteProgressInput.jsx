import React, { useEffect, useRef, useState } from 'react';
import 'animate.css';
import { IoClose, IoAlertCircleSharp } from 'react-icons/io5';
import { FileInput, Button } from 'flowbite-react';
import PropTypes from 'prop-types';
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAsync} from '../../states/posts/postThunk';
import { ImSpinner2 } from 'react-icons/im';
import { setModalProgress } from '../../states/modal/modalSlice';
import { useNavigate } from 'react-router-dom';

export default function WriteProgressInput({ myProfile }) {
  const [content, setContent] = useState('');
  const [contentNotification, setContentNotification] = useState('');
  const [fileNotification, setFileNotification] = useState('');
  const [file, setFile] = useState(null);
  const {loadingWhenCreatingPost} = useSelector((state) => state.posts);
  const {modalProgress} = useSelector((state) => state.modal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);


  const onContentChangeHandler = (e) => {
    setContent(e.target.innerText);
    if (e.target.innerText.trim() !== '') {
      setContentNotification('');
    } else {
      setContentNotification('Content must not be empty or space');
    }
  };

  const onFileChangeHandler = (e) => {
    setFile(e.target.files[0]);
    if (!e.target.files[0]) {
      setFileNotification('Please upload an image');
    } else {
      setFileNotification('');
    }
  };

  const onShareClickHandler = async () => {
    const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (content.trim() === '') {
      setContentNotification('Content must not be empty or space');
    } else if (!file) {
      setFileNotification('Please upload an image');
    } else if (!fileTypes.includes(file.type)) {
      setFileNotification('Only JPG, JPEG, and PNG files are allowed');
    } else {
      dispatch(createPostAsync({ content, image: file, navigate}));
    }
  };

  useEffect(() => {
    if (modalProgress&& inputRef.current) {
      inputRef.current.focus();
    }
  }, [modalProgress]);

  return (
    <section
      className={`w-full h-full sm:w-[40rem] mx-auto sm:my-16 rounded-xl text-textPrimary bg-eerieBlack animate__animated ${
        modalProgress
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
            onClick={() => dispatch(setModalProgress(false))}
            onKeyDown={() => {}}
            tabIndex={0}
            aria-label="Close"
          >
            <IoClose className="text-xl text-textSecondary" />
          </button>
        </div>
        <div className="mt-5 mb-3">
          <div
            ref={inputRef}
            className="p-5 overflow-auto focus:border-[#2d2d2d] focus:border rounded-lg outline-none h-52 bg-searchInput"
            contentEditable
            onInput={onContentChangeHandler}
            data-placeholder="Write your progress here..."
          >
            
          </div>
          {contentNotification && (
            <div className="flex gap-1 mt-1">
              <IoAlertCircleSharp className="text-sm text-red-500" />
              <p className="text-xs font-medium text-red-400 ">{contentNotification}</p>
            </div>
          )}
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
              <div className="flex gap-1 mt-1">
                <IoAlertCircleSharp className="text-sm text-red-500" />
                <p className="text-xs font-medium text-red-400 ">{fileNotification}</p>
              </div>
            )}
          </div>
        </div>
        <Button
          type="button"
          fullSized
          color=""
          onClick={onShareClickHandler}
          className={`font-semibold bg-fernGreen active:outline-none active:ring-none hover:bg-opacity-80 ${!content || !file ? 'bg-opacity-100 hover:bg-opacity-100' : ''}`}
          disabled={!content || !file || loadingWhenCreatingPost}
        >
         {
          loadingWhenCreatingPost ? 
            <ImSpinner2 className="text-center w-6 h-6 text-white animate-spin" /> : 
            'Share'

         }
        </Button>
      </div>
    </section>
  );
}

WriteProgressInput.propTypes = {
  myProfile: PropTypes.instanceOf(Object)
};
