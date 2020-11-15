import React, { useState, useEffect, useRef } from 'react';
import './UploadDetails.css';
import ProfileIcon from './../ProfileIcon/ProfileIcon';
import NewPostNavigation from './../NewPostNavigation/NewPostNavigation';
import UseResizeObserver from './../../util/UseResizeObserver';
import { useAuth } from './../../context/Auth';
import URIToBlob from './../../util/URIToBlob'
import { useHistory } from "react-router-dom";

function UploadDetails( { image, setImage } ) {
    const containerRef = useRef();
    const textAreaRef = useRef();
    const dimensions = UseResizeObserver(containerRef);
    const [imageHeight, setImageHeight] = useState("0px");
    const [isUploading, setIsUploading] = useState(false);
    //const [isError, setIsError] = useState(false);
    const { userData } = useAuth();
    const history = useHistory();

    const uploadImage = () => {
        setIsUploading(true);
        let formData = new FormData()
        formData.append("image", URIToBlob(image))
        formData.append("caption", textAreaRef.current.innerText)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/post/create`,
        {
            method: 'POST',
            headers: {
                'Authorization' : userData.token
            },
            body: formData
        }).then(response => response.json())
        .then(data => { 
            //console.log(data)
            setIsUploading(false);
            history.push("/");
        })

        
    }
    useEffect(() =>{
        if (!dimensions) return;
        setImageHeight((dimensions.width) + 'px')
    }, [dimensions])

    return (
        <>
        <NewPostNavigation backFunction={setImage} forwardFunction={uploadImage} loading={isUploading}/>
        <div className="upload-details__container" ref={containerRef}>
            <div className="upload-details__form">
                <ProfileIcon imageLink={'/profile.jpg'}/>
                <div className="upload-details__textarea" contentEditable="true" ref={textAreaRef}></div>
            </div>
            <img src={image} alt="Previously Captured" style={{ height: imageHeight}}/>
        </div>
        </>
    )
}

export default UploadDetails;