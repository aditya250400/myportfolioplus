import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HiMail } from 'react-icons/hi';
import { IoMdLock } from 'react-icons/io';
import useInput from '../../hooks/useInput';
import { Button } from 'flowbite-react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';

export default function RegisterInput({ register, isLoading }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [password_confirmation, onPasswordConfirmationChange] = useInput('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col gap-10 w-full p-5 sm:p-0 sm:w-[28rem]">
      <h1 className="text-3xl font-bold sm:text-4xl text-chineseWhite">Create an Account</h1>
      <form
        onSubmit={(e) => register(e, { name, email, password, password_confirmation })}
        className="flex flex-col gap-6"
      >
        <div>
          <div className="mb-2">
            <label htmlFor="name" className="text-lg text-chineseWhite">
              Name
            </label>
          </div>
          <div className="relative">
            <FaUserAlt className="absolute text-chineseWhite top-[1px] left-0 z-10 my-3 mx-5 text-xl" />
            <input
              type="text"
              id="name"
              className="w-full py-3 border border-[#424750] rounded-full ps-14 bg-eerieBlack text-chineseWhite focus:ring-0 focus:border-[#424750] placeholder:text-[#A9A9A9]"
              value={name}
              onChange={onNameChange}
              placeholder="John Doe"
              required
            />
          </div>
        </div>
        <div>
          <div className="mb-2">
            <label htmlFor="email" className="text-lg text-chineseWhite">
              Email Address
            </label>
          </div>
          <div className="relative">
            <HiMail className="absolute text-chineseWhite top-[1px] left-0 z-10 my-3 mx-5 text-2xl" />
            <input
              type="email"
              id="email"
              className="w-full py-3 border border-[#424750] focus:ring-0 focus:border-[#424750] rounded-full ps-14 bg-eerieBlack text-chineseWhite placeholder:text-[#A9A9A9]"
              value={email}
              onChange={onEmailChange}
              placeholder="johndoe@example.com"
              required
            />
          </div>
        </div>
        <div>
          <div className="block mb-2">
            <label htmlFor="password" className="text-lg text-chineseWhite">
              Password
            </label>
          </div>
          <div className="relative flex">
            <IoMdLock className="absolute top-[1px] left-0 z-10 my-3 mx-5 text-chineseWhite text-2xl" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full py-3 border rounded-full border-[#424750] focus:ring-0 focus:border-[#424750] px-14 bg-eerieBlack text-chineseWhite placeholder:text-[#A9A9A9]"
              value={password}
              onChange={onPasswordChange}
              placeholder="••••••"
              required
            />
            <Button
              color=""
              onClick={toggleShowPassword}
              tabIndex={-1}
              className="absolute top-[2px] right-0 rounded-none ring-0 focus:ring-0"
            >
              {showPassword ? (
                <BsEye className="text-2xl text-chineseWhite" />
              ) : (
                <BsEyeSlash className="text-2xl text-chineseWhite" />
              )}
            </Button>
          </div>
        </div>
        <div>
          <div className="block mb-2">
            <label htmlFor="password" className="text-lg text-chineseWhite">
              Confirm Password
            </label>
          </div>
          <div className="relative flex">
            <IoMdLock className="absolute top-[1px] text-chineseWhite left-0 z-10 my-3 mx-5 text-2xl" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              className="w-full py-3 border border-[#424750] focus:border-[#424750] focus:ring-0 rounded-full px-14 bg-eerieBlack text-chineseWhite placeholder:text-[#A9A9A9]"
              value={password_confirmation}
              onChange={onPasswordConfirmationChange}
              placeholder="••••••"
              required
            />
            <Button
              color=""
              onClick={toggleShowConfirmPassword}
              tabIndex={-1}
              className="absolute top-[2px] right-0 rounded-none ring-0 focus:ring-0"
            >
              {showConfirmPassword ? (
                <BsEye className="text-2xl text-chineseWhite" />
              ) : (
                <BsEyeSlash className="text-2xl text-chineseWhite" />
              )}
            </Button>
          </div>
        </div>
        <Button
          color=""
          type="submit"
          size="sm"
          className={`mt-5 rounded-full bg-fernGreen text-textPrimary hover:opacity-90 focus:opacity-90 ${!name || !email || !password || !password_confirmation || isLoading ? 'opacity-70 hover:opacity-70' : ''}`}
          disabled={!name || !email || !password || !password_confirmation || isLoading}
        >
          <span className="text-lg font-semibold">
            {isLoading ? <ImSpinner2 className="w-6 h-6 text-white animate-spin" /> : 'Register'}
          </span>
        </Button>
      </form>
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};
