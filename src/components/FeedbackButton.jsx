import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MdOutlineFeedback } from "react-icons/md";
import FeedbackModal from './FeedbackModal';

const FloatingButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        className="fixed flex items-center z-50 bottom-0 right-1 bg-gray-600 text-white rounded-full p-2"
        onClick={() => setShowModal(true)}
      >
        <MdOutlineFeedback/> 
      </button>
      <CSSTransition
        in={showModal}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <FeedbackModal onClose={() => setShowModal(false)} />
      </CSSTransition>
    </>
  );
};

export default FloatingButton;
