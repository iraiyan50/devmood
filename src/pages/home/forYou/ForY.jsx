import React, { useState } from 'react';

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";

import { FaceRecognitionProvider } from '../../../faceUtils/FaceRecognitionContext';
import FaceRecognition from '../../../components/faceExp/FaceRecognition';
import ControlButtons from '../../../components/faceExp/ControlButtons';

import homeMap from '../../../faceUtils/homeMap';

const ForY = ({sendDetectionF}) => {
    const [endpoint, setEndpoint] = useState("movie");

    const [genrePoint, setGenrePoint] = useState("popular");
    
    const { data, loading } = useFetch(`/${endpoint}/${genrePoint}`);


    const [detectedInfo, setDetectedInfo] = useState([]);
    const [gender, setGender] = useState("female");

  
    const updateDetectedInfo = (newInfo) => {
        setDetectedInfo(newInfo);
        if(detectedInfo.length > 0) {
                const detection = detectedInfo.reduce((max, detection) => max.confidence > detection.confidence ? max : detection);// Select the first detection

                // console.log('Detection with Highest Confidence:');
                // console.log(`Age: ${Math.round(detection.age)}`);
                // console.log(`Gender: ${detection.gender}`);
                // const emotion = Object.entries(detection.expressions).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
                // console.log(`Emotion: ${emotion}`);
                // console.log('--------------------');

                setGender(`${detection.gender}`);

                const genre = homeMap[gender];
                setGenrePoint(`${genre}`);
                sendDetectionF(detection);
        }
    };

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
        
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">For You</span>
                <FaceRecognitionProvider>
                    <div>
                        <FaceRecognition />
                        <ControlButtons onRecognitionStop={updateDetectedInfo}/>
                    </div>
                </FaceRecognitionProvider>
                <SwitchTabs
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                />
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </div>
    );
};

export default ForY;
