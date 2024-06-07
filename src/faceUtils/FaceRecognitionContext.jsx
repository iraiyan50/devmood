
import React, { createContext, useState, useContext, useRef } from 'react';


const FaceRecognitionContext = createContext();

export const useFaceRecognition = () => useContext(FaceRecognitionContext);

export const FaceRecognitionProvider = ({ children }) => {

  const [videoPlaying, setVideoPlaying] = useState(false);
  const [detections, setDetections] = useState([]);
  const [results, setResults] = useState([]);
  const videoRef = useRef(null);

  const startVideo = () => {
    setVideoPlaying(true);
    setResults([]); // Clear previous results when starting new recognition
  };

  const stopVideo = () => {
    setVideoPlaying(false);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setResults(detections); // Store the latest detections as results
  };

  const updateDetections = (newDetections) => setDetections(newDetections);

  
  return (
    <FaceRecognitionContext.Provider
      value={{ videoPlaying, startVideo, stopVideo, detections, updateDetections, videoRef, results }}
    >
      {children}
    </FaceRecognitionContext.Provider>
  );
};
