import React from 'react';
import './ProfileIcon.css';
import { IconButton } from '@material-ui/core';

function ProfileIcon({ imageLink }){
    return (
        <IconButton size="small">
            <div className="icon__default">
                <img className="icon__image" src={imageLink} alt="Profile" loading="lazy"/>
            </div>
        </IconButton>
    )
}

export default ProfileIcon;