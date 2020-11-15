import React, { useState, useEffect, useCallback } from 'react';
import './ProfileFeedHeader.css';
import { useAuth } from './../../context/Auth';
import SubmitButton from './../SubmitButton/SubmitButton';
import { useParams } from "react-router";

function ProfileFeedHeader( { numOfPost } ){
    const { userData, setUserData } = useAuth();
    const { id } = useParams();
    const isSameUser = userData.username === id ? true : false
    const [displayData, setDisplayData] = useState({});
    const [alreadyFollowed, setAlreadyFollowed] = useState(false)

    const retrieveUserData = useCallback(() => {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/user/stats?username=${id}`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : userData.token
            }
        }).then((response) => {
            if (response.status === 200){
                return response.json();
            } else{
                throw Error("Unable to Retrieve User Data")
            }
        }).then(data => {
            //console.log(data)
            data.followers.forEach(item => {
                if( item === userData.username){
                    setAlreadyFollowed(true)
                }
            })
            setDisplayData(data);
        }).catch(error =>{
            console.log(error.message)
        })

        
    }, [id, userData.token, userData.username])

    const handleLogout = () => {
        setUserData(null)
    }

    const handleFollow = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/user/follow`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : userData.token
            },
            body: JSON.stringify({
                "following": id
            })
        }).then((response) => {
            if (response.status === 200){
                return response.json();
            } else{
                throw Error("Unable to Follow")
            }
        }).then(data => {
            //console.log(data)
            retrieveUserData();
        }).catch(error =>{
            console.log(error.message)
        })
    }

    useEffect(retrieveUserData, [id])
    return (
        <div className="profile__info-container">
            <div className="profile">
                <div className="profile-image">
                    <img src="/profile.jpg" alt="" />
                </div>
                <div className="profile-user-settings">
                    <h1>{displayData.username}</h1>
                    {isSameUser ? 
                        <SubmitButton text="Logout" clickHandler={handleLogout}></SubmitButton> 
                        : alreadyFollowed ? <SubmitButton text="Following" disabled={true} />:<SubmitButton text="Follow" clickHandler={handleFollow}></SubmitButton>}
                </div>

                <div className="profile-stats">
                    <ul>
                        <li><span className="profile-stat-count">{numOfPost}</span> posts</li>
                        <li><span className="profile-stat-count">{displayData.followers ? displayData.followers.length : 0}</span> followers</li>
                        <li><span className="profile-stat-count">{displayData.following}</span> following</li>
                    </ul>
                </div>

                <div className="profile-bio">
                    <p>
                        <b>{displayData.name}</b><br/>
                        {displayData.bio}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProfileFeedHeader;