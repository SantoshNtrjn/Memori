import React, { useState } from 'react';
import { MdOutlineFitbit} from "react-icons/md";
import { MdOutlineClose} from "react-icons/md";
function Chatmodal(props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen}><MdOutlineFitbit size="2rem"/></button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={handleClose}><MdOutlineClose size="2rem"/></button>
            <props.component />
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatmodal;
