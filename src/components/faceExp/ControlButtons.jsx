
import React, {useEffect} from 'react';
import { useFaceRecognition } from '../../faceUtils/FaceRecognitionContext';
// import ForY from '../../pages/home/forYou/ForY';

import "./CB.scss";

const ControlButtons = ({ onRecognitionStop }) => {
  const { videoPlaying, startVideo, stopVideo, results } = useFaceRecognition();
  
  

  useEffect(() => {
    if (!videoPlaying && results.length > 0) {
      onRecognitionStop(results);
    }
  }, [videoPlaying, results, onRecognitionStop]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>

      {!videoPlaying ? (
        <button onClick={startVideo}>Start</button>
      ) : (
        <button onClick= {() => {
          stopVideo();
          onRecognitionStop(results);
        }}>Stop</button>
      )}
      {results.length > 0 && (<hr />)}
    </div>
  );
};

export default ControlButtons;
