import React from 'react';
import { Link } from 'react-router-dom';
import './TopNavigation.css';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import { IconButton } from '@material-ui/core';
import ProfileIcon from './../ProfileIcon/ProfileIcon';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useAuth } from './../../context/Auth';
function TopNavigation(){
    const { userData } = useAuth();

    return (
        <div className="navigation__container">
            <div className="navigation__wrapper">
                <Link to="/"><h1>Instaclone</h1></Link>
                <div>
                    <Link className="home" to="/">
                        <IconButton size="small">
                            <HomeIcon style={{ fontSize: 30 }} />
                        </IconButton>
                    </Link>
                    <Link className="upload" to="/upload">
                        <IconButton size="small">
                            <CameraAltIcon style={{ fontSize: 30 }} />
                        </IconButton>
                    </Link>
                    <Link className="explore" to="/explore">
                        <IconButton size="small">
                            <ExploreIcon style={{ fontSize: 30 }} />
                        </IconButton>
                    </Link>
                    <Link className="profile" to={"/profile/" + userData.username}>
                        <ProfileIcon imageLink={'/profile.jpg'}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TopNavigation;