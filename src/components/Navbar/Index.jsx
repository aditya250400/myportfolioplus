import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoBrand from "../../assets/icons/logoBrand.png";
import { FiHome } from "react-icons/fi";
import { TfiPencilAlt } from "react-icons/tfi";
import { MdOutlinePostAdd } from "react-icons/md";
import PropTypes from "prop-types";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import placeholderPhotoProfile from "../../assets/images/placeholderPhotoProfile.png";
import { Dropdown } from "flowbite-react";
import { HiLogout } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { setModalPortfolio, setModalProgress } from "../../states/modal/modalSlice";
import { logoutUser } from "../../states/authUser/authUserThunk";

export default function Index({ myProfile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modalProgress, modalPortfolio } = useSelector((state) => state.modal);
  

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
                modalProgress ||
                modalPortfolio ||
                location.pathname !== "/"
                  ? ""
                  : "active"
              }`}
              to="/"
            >
              <FiHome title="Home" className="text-3xl lg:text-xl" />
              <p className="hidden lg:block">Home</p>
            </Link>
            <button
              className={`flex gap-3 text-base font-semibold transition-all duration-200 ease-out hover:opacity-80 ${
                modalProgress ? "active" : ""
              }`}
              onClick={() => dispatch(setModalProgress(true))}
            >
              <TfiPencilAlt
                title="Write Progress"
                className="text-2xl lg:text-xl"
              />
              <p className="hidden lg:block">Write Progress</p>
            </button>
            <button
              className={`flex gap-2 font-semibold transition-all duration-200 ease-out hover:opacity-80 ${
                modalPortfolio ? "active" : ""
              }`}
              onClick={() => dispatch(setModalPortfolio(true))}
            >
              <MdOutlinePostAdd
                title="Post Portfolio"
                className="text-4xl lg:text-2xl"
              />
              <p className="hidden mt-[2px] lg:block">Post Portfolio</p>
            </button>
            <button
              onClick={() => dispatch(logoutUser({ navigate }))}
              className="flex items-center gap-2 cursor-pointer"
            >
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

      {/* Navbar Bottom SM breakpoint */}
      <footer className="fixed bottom-0 z-50 w-full py-1 border-t border-[#424242] bg-navbar flex sm:hidden">
        <div className="container flex items-center justify-around py-3 text-textSecondary">
          <Link
            className={`transition-all duration-200 ease-out hover:opacity-80 ${
              modalProgress ||
              modalPortfolio ||
              location.pathname !== "/"
                ? ""
                : "active"
            }`}
            to="/"
          >
            <FiHome title="Home" className="text-2xl" />
          </Link>
          <button
            className={`flex gap-3 text-base font-semibold transition-all duration-200 ease-out hover:opacity-80 ${
              modalProgress ? "active" : ""
            }`}
            onClick={() => dispatch(setModalProgress(true))}
          >
            <TfiPencilAlt
              title="Write Progress"
              className="text-2xl lg:text-xl"
            />
          </button>
          <button
            className={`transition-all duration-200 ease-out hover:opacity-80 ${
              modalPortfolio ? "active" : ""
            }`}
            onClick={() => dispatch(setModalPortfolio(true))}
          >
            <MdOutlinePostAdd title="Post Portfolio" className="text-3xl" />
          </button>
          <div
            // onClick={logout}
            className="flex flex-col items-center transition-all duration-200 ease-out cursor-pointer hover:opacity-80"
          >
            <Dropdown
              className="bg-slate-900 transition-none text-white border-none duration-0"
              label=""
              dismissOnClick={false}
              placement="bottom"
              renderTrigger={() => (
                <img
                  src={
                    myProfile === null || myProfile.photo_profile === null
                      ? placeholderPhotoProfile
                      : myProfile.photo_profile.photo_profile
                  }
                  alt="avatar"
                  className="object-cover rounded-full w-7 h-7"
                />
              )}
            >
              <Dropdown.Header>
                <span className="block text-sm text-white hover:bg-slate-800">
                  {myProfile?.name}
                </span>
              </Dropdown.Header>
              <Link to="/profile/myProfile">
                <Dropdown.Item
                  icon={FaUser}
                  className="text-white  hover:bg-blue-800"
                >
                  My Profile
                </Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item
                icon={HiLogout}
                className="text-white  hover:bg-blue-800"
                onClick={() => dispatch(logoutUser({ navigate }))}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </footer>
    </>
  );
}

Index.propTypes = {
  openModalStudy: PropTypes.func,
  openModalPortfolio: PropTypes.func,
  modalProgress: PropTypes.bool,
  modalPortfolio: PropTypes.bool,
  logout: PropTypes.func,
  myProfile: PropTypes.instanceOf(Object),
};
