import React, { useEffect } from 'react';
import RegisterInput from '../components/Input/RegisterInput';
import logoNoIcon from '../assets/icons/logoNoIcon.png';
import tagline from '../assets/images/tagline.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerAsync } from '../states/register/registerThunk';
import { ToastContainer } from 'react-toastify';
import { searchPost, setPageToOne } from '../states/posts/postsSlice';
import { setPageUserToOne } from '../states/user/userSlice';

export default function RegisterPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { loading, status } = useSelector((state) => state.register);

  const handleRegister = async (e, { name, email, password, password_confirmation }) => {
    e.preventDefault();
    dispatch(registerAsync({ name, email, password, password_confirmation }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/');
    }
  }, [status, navigate]);

  useEffect(() => {
    dispatch(setPageToOne());
    dispatch(setPageUserToOne());
    dispatch(searchPost(''));
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
            <div className="items-center justify-center hidden h-full lg:flex">
              <img src={tagline} alt="tagline" className="w-64" />
            </div>
          </div>
          <div className="flex flex-1 flex-col h-screen w-full lg:border-s lg:border-s-fernGreen bg-[#0F0F13] bg-opacity-85 rounded-none lg:rounded-s-[2rem] items-center justify-center">
            <div className="relative w-full sm:w-auto">
              <RegisterInput register={handleRegister} isLoading={loading} />
              <div className="absolute p-5 text-sm font-medium sm:p-0 -bottom-10 text-chineseWhite">
                Have an Account?{' '}
                <Link to="/" className="font-bold cursor-pointer hover:underline text-fernGreen">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
