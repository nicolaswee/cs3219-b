import React, { useState } from 'react';
import Camera, {  IMAGE_TYPES, FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import TopNavigation from './../../components/TopNavigation/TopNavigation';
import UploadDetails from './../../components/UploadDetails/UploadDetails';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './Upload.css';
import { Link } from 'react-router-dom';
function Upload(){

    const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;
    const [ photo, setPhoto ] = useState(null);
    const [ cameraFace, setCameraFace ] = useState(FACING_MODES.ENVIRONMENT);

    return (
        <div className={isMobile ? "app__screen screen__upload mobile" : "app__screen screen__upload"}>
            {isMobile || photo ? "" : <TopNavigation />}
            { photo ? <UploadDetails image={photo} setImage={setPhoto} /> : 
                <div className={isMobile ? "camera__container mobile" : "camera__container"}>
                    {isMobile ? <div className="camera-control__container">
                        <div className="camera-control__wrapper">
                            <Link to="/">
                                <IconButton size="small" >
                                    <ArrowBackIcon style={{ fontSize: 30 }}  />
                                </IconButton>
                            </Link>
                            <IconButton size="small" onClick={() => setCameraFace(cameraFace === FACING_MODES.USER ? FACING_MODES.ENVIRONMENT : FACING_MODES.USER)}>
                                <FlipCameraAndroidIcon style={{ fontSize: 30 }} />
                            </IconButton>
                        </div>
                    </div> : "" }
                    <Camera 
                        onTakePhotoAnimationDone ={data => setPhoto(data)}
                        imageType = {IMAGE_TYPES.JPG}
                        isMaxResolution = {true}
                        isImageMirror = {false}
                        isFullscreen={isMobile}
                        idealFacingMode={cameraFace}
                    />
                </div>
            }
        </div>
    )
}

export default Upload;