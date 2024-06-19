/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import { useSelector } from 'react-redux';

export default function AboutUserProfile({ user }) {
  const { loading } = useSelector((state) => state.users);

  return (
    <section className="px-3 py-5 mt-3 sm:px-5 sm:mt-5 lg:px-10 bg-eerieBlack sm:rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">About</h1>
      </div>
      <div className="flex flex-col gap-8 py-5 lg:gap-10">
        <p className="text-sm text-justify text-textSecondary whitespace-pre-wrap leading-[25px]">
          {user === null
            ? ''
            : user.biodata === null || user.biodata.about === null
              ? `${user.name} not add about himself/herself yet.`
              : user.biodata.about}
        </p>
        <div className="flex flex-col flex-wrap gap-3 mr-10">
          <div className="flex flex-col flex-wrap gap-2 w-72">
            {/*<h3 className='text-xl font-medium'>LinkedIn</h3>*/}
            {user === null || user.biodata === null || user.biodata.linkedIn === null ? (
              ''
            ) : (
              <a
                href={user.biodata.linkedIn}
                className="flex items-center gap-2 text-base break-all hover:underline text-textSecondary"
                target="_blank"
              >
                <BsLinkedin />
                My LinkedIn
              </a>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {/*<h3 className='text-xl'>Github</h3>*/}
            {user === null || user.biodata === null || user.biodata.website === null ? (
              ''
            ) : (
              <a
                href={user.biodata.website}
                className="flex items-center gap-2 text-base break-all hover:underline w-fit text-textSecondary"
                target="_blank"
              >
                <BsGithub />
                My Github
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

AboutUserProfile.propTypes = {
  user: PropTypes.instanceOf(Object)
};
