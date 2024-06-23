import React, { useEffect } from 'react';
import LoginInput from '../components/Input/LoginInput';
import logoNoIcon from '../assets/icons/logoNoIcon.png';
import tagline from '../assets/images/tagline.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authUserAsync } from '../states/authUser/authUserThunk';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { searchPost, setPageToOne } from '../states/posts/postsSlice';
import { setPageUserToOne } from '../states/user/userSlice';
import { setDeleteConfirmId } from '../states/modal/modalSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const handleLogin = (e, { email, password }) => {
    e.preventDefault();
    dispatch(authUserAsync({ email, password }));
  };

  useEffect(() => {
    dispatch(searchPost(''));
    dispatch(setDeleteConfirmId(null))
    dispatch(setPageUserToOne());
    dispatch(setPageToOne());
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        theme="dark"
        pauseOnHover={false}
        autoClose={3000}
        pauseOnFocusLoss={false}
      />
      <div className="w-screen h-screen auth-page">
        <div className="justify-between lg:flex">
          <div className="absolute flex-1 h-screen p-5 sm:p-10 lg:static lg:block">
            <img src={logoNoIcon} alt="logo" className="w-36 sm:w-48 lg:w-32" />
            <div className="items-center justify-center hidden h-full lg:flex ">
              <img src={tagline} alt="tagline" className="w-64" />
            </div>
          </div>
          <div className="flex flex-1 flex-col h-screen w-full lg:border-s lg:border-s-fernGreen bg-[#0F0F13] bg-opacity-85 rounded-none lg:rounded-s-[2rem] items-center justify-center">
            <div className="relative w-full sm:w-auto">
              <LoginInput login={handleLogin} isLoading={status === 'loading'} />
              <div className="absolute p-5 text-sm font-medium sm:p-0 -bottom-10 text-chineseWhite">
                New User?{' '}
                <Link
                  to="/register"
                  className="font-bold cursor-pointer hover:underline text-fernGreen"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
