import React from 'react';
import PropTypes from 'prop-types';

export default function SkillsUserProfile({ user }) {
  return (
    <section className="px-3 py-5 my-3 sm:px-5 sm:my-5 lg:px-10 bg-eerieBlack sm:rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Skills</h1>
      </div>
      <div className="flex flex-wrap gap-2 py-5 cursor-default">
        {user === null
          ? ''
          : user.biodata === null || user.biodata.skills.length < 1
            ? "This user don't have any skills yet."
            : user.biodata.skills.map((skill, key) => {
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
    </section>
  );
}

SkillsUserProfile.propTypes = {
  user: PropTypes.instanceOf(Object)
};
