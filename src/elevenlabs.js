import React, { useState } from 'react';
import { MdAutoFixHigh} from "react-icons/md";
import Playbox from './player';
import './fancy.css';

function TextToSpeech() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleClick = async () => {
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
        method: 'POST',
        headers: {
          'accept': 'audio/mpeg',
          'xi-api-key': '4d89e7b7f11c5be25be9bf27dd73fbc6', // Enter ElevenLabs API Key
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'text': text,
          'voice_settings': {
            'stability': 0,
            'similarity_boost': 0
          }
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } else {
        console.error(`Failed to fetch audio: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(`An error occurred while fetching audio: ${error}`);
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div style={{ position: 'fixed', top: '95px', right: '260px', backgroundColor: '#fff', padding: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', borderRadius: '5px' }}>
    <div class="container" style={{width:'1000px',height:'600px'}}>
      <textarea class="text-area" value={text} onChange={handleTextChange} />
      <button class="button"  onClick={handleClick}><MdAutoFixHigh size="2rem"/></button>
      <div class="space"></div>
      {audioUrl && <Playbox class="audio-player"controls src={audioUrl} />}
    </div>
    </div>
  );
}

export default TextToSpeech;