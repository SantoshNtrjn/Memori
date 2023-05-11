import React, { useState } from 'react';
import PomodoroTimer from './PomodoroTimer';
import logo from './notes.svg';
import { MdOutlineTimer } from "react-icons/md";
import { MdPostAdd} from "react-icons/md";
import { MdOutlineDeleteOutline} from "react-icons/md";
import MyModal from './modal';
import Chatmodal from './modal2';
import TextToSpeech from './elevenlabs';
import Chatbot from './chatbot';


const Sidebar = ({
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
  }) => {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
    const [showTimer, setShowTimer] = useState(true);

    const handleCloseTimer = () => {
      setShowTimer(false);
    };

    return (
      <div className="app-sidebar">
        <div className="app-sidebar-header">
          <h1>
          <img src={logo} className="App-logo" alt="logo" />
          </h1>
        
          <MyModal component={TextToSpeech} />
          <Chatmodal component={Chatbot}/>
              <div style={{bottom:"10px",right:"11px"}}>  
          {showTimer && <PomodoroTimer onClose={handleCloseTimer} />}
      <button onClick={() => setShowTimer(true)}><MdOutlineTimer size = '2rem'/></button>
      </div> 
      <div style={{bottom:"10px"}}>
          <button onClick={onAddNote}><MdPostAdd size='2rem'/></button>
        </div>
        </div>
        <div className="app-sidebar-notes">
          {sortedNotes.map(({ id, title, body, lastModified }, i) => (

            <div
              className={`app-sidebar-note ${id === activeNote && "active"}`}
              onClick={() => setActiveNote(id)}
            >
             
              <div className="sidebar-note-title">
                <strong>{title}</strong>
                <button onClick={(e) => onDeleteNote(id)}><MdOutlineDeleteOutline size='2rem'/></button>
              </div>
              <p>{body && body.substr(0, 100) + "..."}</p>
              <small className="note-meta">
                Last Modified{" "}
                {new Date(lastModified).toLocaleDateString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
             
            </div>
          ))}
           
        </div>
      </div>
    );
  };
  
  export default Sidebar;