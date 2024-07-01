import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteConfirmId, setDeleteConfirmReplyId } from "../../states/modal/modalSlice";
import { RiErrorWarningFill } from 'react-icons/ri';
import PropTypes from 'prop-types';
import { deletePostAsync } from "../../states/posts/postThunk";
import { ImSpinner2 } from "react-icons/im";


const DeleteModal = ({ id, targetName, onDeleteData }) => {

    const { deleteConfirmId, deleteConfirmReplyId, loadingWhenDeleting } = useSelector((state) =>state.modal);
  const dispatch = useDispatch();
  return (
    <div
      className={`${
        deleteConfirmId === id || deleteConfirmReplyId === id ? "absolute -top-24 right-0" : "hidden"
      } bg-chineseBlack border shadow-xl text-white rounded-xl p-2 z-50 w-[300px]  `}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-center items-center gap-1">
          <p className="text-lg">
            <RiErrorWarningFill />
          </p>
          <p className="text-sm">Are you sure to delete this {targetName}?</p>
        </div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => dispatch(deleteConfirmReplyId ? setDeleteConfirmReplyId(null) : setDeleteConfirmId(null))}
            className={`bg-[#424242] rounded-full p-[3px] w-[70px] ${loadingWhenDeleting ? 'hover:cursor-not-allowed opacity-70' : 'opacity-100'}`}
            disabled={loadingWhenDeleting ? true : false}
          >
            Cancel
          </button>
          <button
            onClick={() => onDeleteData(id)}
            className={`${loadingWhenDeleting ? 'hover:cursor-not-allowed  bg-red-700' : 'bg-red-600'} rounded-full p-[3px] w-[100px] flex justify-center`}
            disabled={loadingWhenDeleting ? true : false}
          >
             {
          loadingWhenDeleting ? 
            <ImSpinner2 className="w-6 h-6 text-white animate-spin" /> : 
            'Yes, Delete!'

         }
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
    id: PropTypes.number,
    targetName: PropTypes.string,
    onDeleteData: PropTypes.instanceOf(Function),
  };
export default DeleteModal;
