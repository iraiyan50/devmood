
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
      {results.length > 0 && (
        // <div style={{ marginTop: '20px' }}>
        //   <h2>Detected Information</h2>
        //   {results.map((detection, index) => (
        //     <div key={index}>
        //       <p>Age: {Math.round(detection.age)}</p>
        //       <p>Gender: {detection.gender}</p>
        //       <p>
        //         Emotion: {Object.entries(detection.expressions).reduce((a, b) => (a[1] > b[1] ? a : b))[0]}
        //       </p>
        //     </div>
        //   ))}
        // </div>
        <hr />
      )}
    </div>
  );
};

export default ControlButtons;
