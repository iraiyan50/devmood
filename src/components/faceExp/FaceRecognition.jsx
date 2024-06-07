
import React, { useEffect, useCallback, useRef } from 'react';
import * as faceapi from 'face-api.js';
import { useFaceRecognition } from '../../faceUtils/FaceRecognitionContext';

import "./FR.css";

const FaceRecognition = () => {
  const { videoPlaying, videoRef, updateDetections } = useFaceRecognition();
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
        faceapi.nets.faceExpressionNet.loadFromUri('./models'),
        faceapi.nets.ageGenderNet.loadFromUri('./models'),
      ]);
    };

    loadModels();
  }, []);

  const startVideoStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  }, [videoRef]);

  useEffect(() => {
    if (videoPlaying) {
      startVideoStream();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    }
  }, [videoPlaying, startVideoStream]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withAgeAndGender();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        // faceapi.draw.drawDetections(canvas, resizedDetections);
        // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        updateDetections(resizedDetections);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [videoPlaying, updateDetections]);

  return (
    <div className='bod'>
      <video  ref={videoRef} width={100} height={50} autoPlay muted style={{ display: videoPlaying ? 'block' : 'none' }} />
      <canvas className='can' ref={canvasRef} style={{ display: videoPlaying ? 'block' : 'none' }} />
    </div>
  );
};

export default FaceRecognition;
