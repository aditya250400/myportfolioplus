import React, { useState } from 'react';
import { Button, Label, Modal, Textarea, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createMyBiodataAsync, updateMyBiodataAsync } from '../../states/myProfile/myProfileThunk';
import { ImSpinner2 } from 'react-icons/im';

export default function EditAboutProfileModal({ myProfile, openModal, setOpenModal }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(myProfile.name);
  const {loadingWhenCreatingBiodata} = useSelector((state) => state.myProfile);
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

  const [skills, setSkills] = useState(
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
        skills,
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
        skills,
        email: myProfile.email,
        id: myProfile.biodata.id,
        setOpenModal
      })
    );
  };
  return (
    <section>
      <Modal
        show={openModal}
        position="center"
        className="font-medium bg-black bg-opacity-80"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="bg-eerieBlack">
          <span className="text-textPrimary">Edit About</span>
        </Modal.Header>
        <Modal.Body className="bg-eerieBlack border-y border-[#000000]">
          <div className="p-6 space-y-6 bg-eerieBlack">
            <div>
              <div className="mb-2 blocks">
                <Label className="text-textPrimary" htmlFor="about" value="Description" />
              </div>
              <Textarea
                contentEditable
                id="about"
                type="text"
                value={about}
                className="overflow-auto rounded-lg h-56"
                onChange={(e) => setAbout(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 blocks">
                <Label className="text-textPrimary" htmlFor="linkkedin" value="URL LinkedIn" />
              </div>
              <TextInput
                id="linkkedin"
                type="url"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 blocks">
                <Label className="text-textPrimary" htmlFor="github" value="URL Github" />
              </div>
              <TextInput
                id="github"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end bg-eerieBlack">
          <Button
            color=""
            size="sm"
            className="w-20 rounded-full bg-ufoGreen bg-opacity-80 text-textPrimary hover:bg-opacity-70"
            onClick={myProfile.biodata === null ? onSubmitBiodata : onEditBiodata}
            disabled={loadingWhenCreatingBiodata ? true : false}
          >
           {loadingWhenCreatingBiodata ? (
              <ImSpinner2 className="w-6 h-6 text-white animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

EditAboutProfileModal.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  myProfile: PropTypes.instanceOf(Object)
};
