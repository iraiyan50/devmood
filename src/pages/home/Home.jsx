import React, { useState } from "react";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import ForY from "./forYou/ForY";

const Home = ({sendDetection}) => {

    const [detectedInfo, setDetectedInfo] = useState([]);
    const getDetection = (newInfo) => {
        setDetectedInfo(newInfo);
        sendDetection(detectedInfo);
        const emotion = Object.entries(newInfo.expressions).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
        // console.log(`${emotion}`);
    };

    return (
        <div className="homePage">
            <HeroBanner />
            <ForY sendDetectionF={getDetection} />
            <Trending />
            <Popular />
            <TopRated />
        </div>
    );
};

export default Home;
