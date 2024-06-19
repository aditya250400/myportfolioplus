import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoBrand from '../../assets/icons/logoBrand.png';
import { FiHome } from 'react-icons/fi';
import { TfiPencilAlt } from 'react-icons/tfi';
import { MdOutlinePostAdd } from 'react-icons/md';
import PropTypes from 'prop-types';
import { IoIosLogOut } from 'react-icons/io';
import { useSelector } from 'react-redux';
import placeholderPhotoProfile from '../../assets/images/placeholderPhotoProfile.png';
import Loading from '../Loading';
export default function Index({
  openModalStudy,
  openModalPortfolio,
  isOpenModalStudyInput,
  isOpenModalPortfolioInput,
  logout,
  myProfile
}) {
  const location = useLocation();
  const { status } = useSelector((state) => state.auth);

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <>
      <header className="lg:px-10 px-5 hidden sm:block border-b border-[#424242] bg-navbar">
        <div className="flex justify-between lg:container">
          <Link to="/">
            <img src={logoBrand} alt="logo brand" className="relative -top-3" />
          </Link>
          <nav className="flex items-center gap-10 px-6 text-textSecondary">
            <Link
              className={`flex items-start gap-2 text-base font-semibold transition-all duration-200 ease-out hover:opacity-80 ${
                isOpenModalStudyInput || isOpenModalPortfolioInput || location.pathname !== '/'
                  ? ''
                  : 'active'
              }`}
              to="/"
            >
              <FiHome title="Home" className="text-3xl lg:text-xl" />
              <p className="hidden lg:block">Home</p>
            </Link>
            <button
              className={`flex gap-3 text-base font-semibold transition-all duration-200 ease-out hover:opacity-80 ${
                isOpenModalStudyInput ? 'active' : ''
              }`}
              onClick={() => {
                openModalStudy(true);
              }}
            >
              <TfiPencilAlt title="Write Progress" className="text-2xl lg:text-xl" />
              <p className="hidden lg:block">Write Progress</p>
            </button>
            <button
              className={`flex gap-2 font-semibold transition-all duration-200 ease-out hover:opacity-80 ${
                isOpenModalPortfolioInput ? 'active' : ''
              }`}
              onClick={() => {
                openModalPortfolio(true);
              }}
            >
              <MdOutlinePostAdd title="Post Portfolio" className="text-4xl lg:text-2xl" />
              <p className="hidden mt-[2px] lg:block">Post Portfolio</p>
            </button>
            <button onClick={() => logout()} className="flex items-center gap-2 cursor-pointer">
              <img
                src={
                  myProfile === null || myProfile.photo_profile === null
                    ? placeholderPhotoProfile
                    : myProfile.photo_profile.photo_profile
                }
                alt="avatar"
                className="object-cover w-10 h-10 transition-all duration-200 ease-out rounded-full lg:w-7 lg:h-7 hover:opacity-80"
              />
              <p className="text-xl lg:text-base">Me</p>
              <IoIosLogOut className="text-xl" />
            </button>
          </nav>
        </div>
      </header>
      <footer className="fixed bottom-0 z-50 w-full py-1 border-t border-[#424242] bg-navbar flex sm:hidden">
        <div className="container flex items-center justify-around py-3 text-textSecondary">
          <Link
            className={`transition-all duration-200 ease-out hover:opacity-80 ${
              isOpenModalStudyInput || isOpenModalPortfolioInput || location.pathname !== '/'
                ? ''
                : 'active'
            }`}
            to="/"
          >
            <FiHome title="Home" className="text-2xl" />
          </Link>
          <button
            className={`flex gap-3 text-base font-semibold transition-all duration-200 ease-out hover:opacity-80 ${
              isOpenModalStudyInput ? 'active' : ''
            }`}
            onClick={() => {
              openModalStudy(true);
            }}
          >
            <TfiPencilAlt title="Write Progress" className="text-2xl lg:text-xl" />
          </button>
          <button
            className={`transition-all duration-200 ease-out hover:opacity-80 ${
              isOpenModalPortfolioInput ? 'active' : ''
            }`}
            onClick={() => {
              openModalPortfolio(true);
            }}
          >
            <MdOutlinePostAdd title="Post Portfolio" className="text-3xl" />
          </button>
          <button
            onClick={logout}
            className="flex flex-col items-center transition-all duration-200 ease-out cursor-pointer hover:opacity-80"
          >
            <img
              src={
                myProfile === null || myProfile.photo_profile === null
                  ? placeholderPhotoProfile
                  : myProfile.photo_profile.photo_profile
              }
              alt="avatar"
              className="object-cover rounded-full w-7 h-7"
            />
          </button>
        </div>
      </footer>
    </>
  );
}

Index.propTypes = {
  openModalStudy: PropTypes.func,
  openModalPortfolio: PropTypes.func,
  isOpenModalStudyInput: PropTypes.bool,
  isOpenModalPortfolioInput: PropTypes.bool,
  logout: PropTypes.func,
  myProfile: PropTypes.instanceOf(Object)
};
