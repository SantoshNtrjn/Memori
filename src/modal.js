import React, { useState } from 'react';
import { MdPodcasts} from "react-icons/md";
import { MdOutlineClose} from "react-icons/md";
function MyModal(props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen}><MdPodcasts size="2rem"/></button>

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

export default MyModal;
