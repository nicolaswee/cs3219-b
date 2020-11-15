import React from 'react';
import './NewPostNavigation.css';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LoadingAnimation from './../LoadingAnimation/LoadingAnimation';

function TopNavigation( { backFunction, forwardFunction, loading} ){

    return (
        <div className="navigation__container newpost">
            <div className="navigation__wrapper">
                <div>
                    <IconButton size="small" onClick={() => backFunction(null)}>
                        <ArrowBackIcon style={{ fontSize: 30 }} />
                    </IconButton>
                    <span>New Post</span>
                </div>
                <span onClick={forwardFunction} className="share">{ loading ? <LoadingAnimation dark={true} /> : 'Share'}</span>
            </div>
        </div>
    )
}

export default TopNavigation;