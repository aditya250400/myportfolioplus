import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';
import { HiMail } from 'react-icons/hi';
import { IoMdLock } from 'react-icons/io';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Button } from 'flowbite-react';
import { ImSpinner2 } from 'react-icons/im';

export default function LoginInput({ login, isLoading }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-10 w-full p-5 sm:p-0 sm:w-[28rem]">
      <h1 className="text-3xl font-bold sm:text-4xl text-chineseWhite">Please Login !</h1>
      <form onSubmit={(e) => login(e, { email, password })} className="flex flex-col gap-6">
        <div>
          <div className="mb-2">
            <label htmlFor="email" className="text-lg text-chineseWhite">
              Email Address
            </label>
          </div>
          <div className="relative">
            <HiMail className="absolute text-white top-[1px] left-0 z-10 mt-3 mx-5 text-2xl" />
            <input
              type="email"
              id="email"
              className="w-full py-3 border border-[#424750] text-chineseWhite rounded-full ps-14 bg-eerieBlack focus:ring-0 focus:border-[#424750]  placeholder:text-[#A9A9A9]"
              value={email}
              onChange={onEmailChange}
              placeholder="johndoe@example.com"
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
            <IoMdLock className="absolute text-chineseWhite top-[1px] left-0 z-10 mt-3 mx-5 text-2xl" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full py-3 border border-[#424750] focus:ring-0 focus:border-[#424750] rounded-full px-14 bg-eerieBlack text-chineseWhite placeholder:text-[#A9A9A9]"
              value={password}
              onChange={onPasswordChange}
              placeholder="••••••"
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
        <Button
          color=""
          type="submit"
          size="sm"
          className={`mt-5 bg-fernGreen rounded-full text-textPrimary hover:opacity-90 focus:opacity-90 ${!email || !password || isLoading ? 'opacity-70 hover:opacity-70' : ''}`}
          disabled={!email || !password || isLoading}
        >
          <span className="gap-2 text-lg font-semibold ">
            {isLoading ? <ImSpinner2 className="w-6 h-6 text-white animate-spin" /> : 'Login'}
          </span>
        </Button>
      </form>
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};
