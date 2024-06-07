import React, { useState, useEffect, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

// import * as faceapi from 'face-api.js';

// import { FaceRecognitionProvider } from '../../faceUtils/FaceRecognitionContext';
// import FaceRecognition from '../faceExp/FaceRecognition';
// import ControlButtons from '../faceExp/ControlButtons';

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/logo.png";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // const videoRef = useRef()
    // const canvasRef = useRef()
    // useEffect(()=>{
    //     startVideo()
    //     videoRef && loadModels()
    
    //   },[]);
    

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        setMobileMenu(false);
    };
//////////////////////////////////////////////////////////////////////////////////////////////
    // const startVideo = ()=>{
    //     navigator.mediaDevices.getUserMedia({video:true})
    //     .then((currentStream)=>{
    //       videoRef.current.srcObject = currentStream
    //     })
    //     .catch((err)=>{
    //       console.log(err)
    //     })
    //   };
    //   // LOAD MODELS FROM FACE API
    
    //   const loadModels = ()=>{
    //     Promise.all([
    //       // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/MODELS DIRECTORY
    //       faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
    //       faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    //       faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
    //       faceapi.nets.faceExpressionNet.loadFromUri("./models")
    
    //       ]).then(()=>{
    //       faceMyDetect()
    //     })
    //   };
    
    //   const faceMyDetect = ()=>{
    //     setInterval(async()=>{
    //       const detections = await faceapi.detectAllFaces(videoRef.current,
    //         new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    
    //       // DRAW YOU FACE IN WEBCAM
    //       canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
    //       faceapi.matchDimensions(canvasRef.current,{
    //         width:940,
    //         height:650
    //       })
    
    //       const resized = faceapi.resizeResults(detections,{
    //          width:940,
    //         height:650
    //       })
    
    //       faceapi.draw.drawDetections(canvasRef.current,resized)
    //       faceapi.draw.drawFaceLandmarks(canvasRef.current,resized)
    //       faceapi.draw.drawFaceExpressions(canvasRef.current,resized)
    
    
    //     },1000)
    //   };
//////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/devmood/")}>
                    <img src={logo} alt="" />
                </div>
                {/* <video id="video" ref={videoRef} width="100" height="50" autoPlay muted></video>
                <canvas ref={canvasRef} width="100" height="50" className="appcanvas"/> */}
                {/* <FaceRecognitionProvider>
                    <div style={{ textAlign: 'center' }}>
                        <h1>Face Recognition App</h1>
                        <FaceRecognition />
                        <ControlButtons />
                    </div>
                </FaceRecognitionProvider> */}
                <ul className="menuItems">
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("movie")}
                    >
                        Movies
                    </li>
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("tv")}
                    >
                        TV Shows
                    </li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;
