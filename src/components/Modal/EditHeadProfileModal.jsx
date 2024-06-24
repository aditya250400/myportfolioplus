import React, { useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  createMyBiodataAsync,
  updateMyBiodataAsync,
} from "../../states/myProfile/myProfileThunk";
import { ImSpinner2 } from "react-icons/im";

export default function EditHeadProfileModal({
  myProfile,
  openModal,
  setOpenModal,
}) {
  const dispatch = useDispatch();
  const { loadingWhenCreatingBiodata } = useSelector(
    (state) => state.myProfile
  );
  const [name, setName] = useState(myProfile.name);
  const [role, setRole] = useState(
    myProfile === null ||
      myProfile.biodata === null ||
      myProfile.biodata.role === null
      ? ""
      : myProfile.biodata.role
  );
  const [headline, setHeadline] = useState(
    myProfile === null ||
      myProfile.biodata === null ||
      myProfile.biodata.headline === null
      ? ""
      : myProfile.biodata.headline
  );
  const [location, setLocation] = useState(
    myProfile === null ||
      myProfile.biodata === null ||
      myProfile.biodata.location === null
      ? ""
      : myProfile.biodata.location
  );
  const [skills, setSkills] = useState(
    myProfile === null ||
      myProfile.biodata === null ||
      myProfile.biodata.skills.length < 1
      ? []
      : myProfile.biodata.skills
  );
  const [linkedIn, setLinkedIn] = useState(
    myProfile === null ||
      myProfile.biodata === null ||
      myProfile.biodata.linkedIn === null
      ? null
      : myProfile.biodata.linkedIn
  );

  const [website, setWebsite] = useState(
    myProfile === null ||
      myProfile.biodata === null ||
      myProfile.biodata.website === null
      ? null
      : myProfile.biodata.website
  );

  const [about, setAbout] = useState(
    myProfile === null ||
      myProfile.biodata === null ||
      myProfile.biodata.about === null
      ? null
      : myProfile.biodata.about
  );

  const onSubmitBiodata = () => {
    dispatch(
      createMyBiodataAsync({
        name,
        role,
        headline,
        location,
        skills,
        linkedIn,
        website,
        about,
        email: myProfile.email,
        setOpenModal,
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
        skills,
        website,
        linkedIn,
        about,
        email: myProfile.email,
        id: myProfile.biodata.id,
        setOpenModal,
      })
    );
  };

  return (
    <section>
      <Modal
        show={openModal}
        position="center"
        className="font-medium bg-black bg-opacity-70"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="bg-eerieBlack">
          <span className="text-textPrimary">Edit Profile</span>
        </Modal.Header>
        <Modal.Body className="bg-eerieBlack">
          <div className="p-6 space-y-6 bg-eerieBlack">
            <div>
              <div className="mb-2 blocks">
                <Label
                  className="text-textPrimary"
                  htmlFor="name"
                  value="Your Name"
                />
              </div>
              <TextInput
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 blocks">
                <Label
                  className="text-textPrimary"
                  htmlFor="role"
                  value="Role"
                />
              </div>
              <TextInput
                id="role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 blocks">
                <Label
                  className="text-textPrimary"
                  htmlFor="headline"
                  value="Headline"
                />
              </div>
              <TextInput
                id="headline"
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 blocks">
                <Label
                  className="text-textPrimary"
                  htmlFor="location"
                  value="Location"
                />
              </div>
              <TextInput
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
            onClick={
              myProfile.biodata === null ? onSubmitBiodata : onEditBiodata
            }
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

EditHeadProfileModal.propTypes = {
  myProfile: PropTypes.instanceOf(Object),
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
};
