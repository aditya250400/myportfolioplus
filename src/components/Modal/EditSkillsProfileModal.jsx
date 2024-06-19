import React, { useState } from 'react';
import { Button, Label, Modal } from 'flowbite-react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createMyBiodataAsync, updateMyBiodataAsync } from '../../states/myProfile/myProfileThunk';

export default function EditSkillsProfileModal(props) {
  const dispatch = useDispatch();
  const { skills, myProfile, openModal, setOpenModal } = props;

  const [name, setName] = useState(myProfile.name);

  const [role, setRole] = useState(
    myProfile === null || myProfile.biodata === null || myProfile.biodata.role === null
      ? ''
      : myProfile.biodata.role
  );

  const [headline, setHeadline] = useState(
    myProfile === null || myProfile.biodata === null || myProfile.biodata.headline === null
      ? ''
      : myProfile.biodata.headline
  );

  const [location, setLocation] = useState(
    myProfile === null || myProfile.biodata === null || myProfile.biodata.location === null
      ? ''
      : myProfile.biodata.location
  );

  const [about, setAbout] = useState(
    myProfile === null || myProfile.biodata === null || myProfile.biodata.about === null
      ? null
      : myProfile.biodata.about
  );

  const [linkedIn, setLinkedIn] = useState(
    myProfile === null || myProfile.biodata === null || myProfile.biodata.linkedIn === null
      ? null
      : myProfile.biodata.linkedIn
  );

  const [website, setWebsite] = useState(
    myProfile === null || myProfile.biodata === null || myProfile.biodata.website === null
      ? null
      : myProfile.biodata.website
  );

  const [mySkills, setMySkills] = useState(
    myProfile === null || myProfile.biodata === null || myProfile.biodata.skills.length < 1
      ? []
      : myProfile.biodata.skills
  );

  const onSubmitBiodata = () => {
    dispatch(
      createMyBiodataAsync({
        name,
        role,
        headline,
        location,
        about,
        linkedIn,
        website,
        skills: mySkills,
        email: myProfile.email,
        setOpenModal
      })
    );
  };

  const onEditBiodata = () => {
    dispatch(
      updateMyBiodataAsync({
        name,
        role,
        headline,
        location,
        about,
        linkedIn,
        website,
        skills: mySkills,
        email: myProfile.email,
        id: myProfile.biodata.id,
        setOpenModal
      })
    );
  };

  const options = [];
  for (let i = 0; i < skills.length; i++) {
    options.push({
      value: skills[i],
      label: skills[i]
    });
  }

  return (
    <section>
      <Modal
        show={openModal}
        position="center"
        className="font-medium bg-black bg-opacity-20"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="bg-eerieBlack">
          <span className="text-textPrimary">Add Skills</span>
        </Modal.Header>
        <Modal.Body className="bg-eerieBlack border-y border-[#000000]">
          <div className="p-6 space-y-6 bg-eerieBlack">
            <div>
              <div className="mb-2 blocks">
                <Label className="text-textPrimary" htmlFor="headline" value="Skill" />
              </div>
              <Select
                mode="tags"
                style={{
                  width: '100%'
                }}
                placeholder="Select or Create Your Skills Here"
                className="focus:outine-none focus:bg-red-500"
                onChange={(value) => setMySkills(value)}
                options={options}
                value={mySkills}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              color=""
              size="sm"
              className="w-20 mt-5 rounded-full bg-ufoGreen bg-opacity-80 text-textPrimary hover:bg-opacity-70"
              onClick={myProfile.biodata === null ? onSubmitBiodata : onEditBiodata}
            >
              Save
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

EditSkillsProfileModal.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  myProfile: PropTypes.instanceOf(Object),
  skills: PropTypes.instanceOf(Array)
};
