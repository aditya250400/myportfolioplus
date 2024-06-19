import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import EditSkillsProfileModal from '../Modal/EditSkillsProfileModal';
import PropTypes from 'prop-types';

export default function SkillsProfile({ myProfile, skills }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="px-3 py-5 my-3 sm:px-5 sm:my-5 lg:px-10 bg-eerieBlack sm:rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Skills</h1>
        <button
          onClick={() => setShowModal(true)}
          className="p-2 text-2xl transition-all duration-200 ease-out rounded-full hover:bg-fernGreen"
        >
          <MdAdd className="text-2xl" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 py-5 cursor-default">
        {myProfile === null || myProfile.biodata === null || myProfile.biodata.skills.length < 1
          ? "You don't have any skills, please add your skills"
          : myProfile.biodata.skills.map((skill, key) => {
              return (
                <span
                  key={key}
                  className="sm:px-5 sm:py-2 px-3 py-1 text-sm font-medium lowercase rounded-full bg-[#424242] text-textSecondary"
                >
                  {skill}
                </span>
              );
            })}
      </div>
      {showModal && (
        <EditSkillsProfileModal
          openModal={showModal}
          setOpenModal={setShowModal}
          skills={skills}
          myProfile={myProfile}
        />
      )}
    </section>
  );
}

SkillsProfile.propTypes = {
  myProfile: PropTypes.instanceOf(Object),
  skills: PropTypes.instanceOf(Array)
};
