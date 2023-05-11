import React from 'react';
import ReactH5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Playbox = ({ src }) => {
  return <ReactH5AudioPlayer src={src} autoPlay={false} controls={true} />;
};

export default Playbox;