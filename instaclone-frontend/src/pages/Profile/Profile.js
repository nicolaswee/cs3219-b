import React, { useRef, useEffect, useState, useCallback}from 'react';
import TopNavigation from './../../components/TopNavigation/TopNavigation';
import './Profile.css';
import ProfileFeedHeader from '../../components/ProfileFeedHeader/ProfileFeedHeader';
import ExploreFeedItem from '../../components/ExploreFeedItem/ExploreFeedItem';
import UseResizeObserver from './../../util/UseResizeObserver';
import LoadingAnimation from './../../components/LoadingAnimation/LoadingAnimation';
import { useAuth } from './../../context/Auth';
import { useParams } from "react-router";
import IndividualImageModal from './../../components/IndividualImageModal/IndividualImageModal';

function Profile(){
    const containerRef = useRef();
    const dimensions = UseResizeObserver(containerRef);
    const [imageFeed, setImageFeed] = useState([])
    const [imageHeight, setImageHeight] = useState("0px");
    const [loadingFeed, setLoadingFeed] = useState(false);
    const { userData } = useAuth();
    const { id } = useParams();

    const [showModal, setShowModal] = useState(false);
    const [showItem, setShowItem] = useState({});

    const getImage = useCallback(() => {
        setLoadingFeed(true);
        fetch(`${process.env.REACT_APP_API_BASE_URL}/post/personal?username=${id}`,
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
                throw Error("Unable to Retrieve Feed")
            }
        }).then(data => {
            //console.log(data)
            setImageFeed(data.message.map(item => { item.image = item.post_url; return item}))
            setLoadingFeed(false);
        }).catch(error =>{
            console.log(error.message)
            setLoadingFeed(false);
        })
    }, [userData.token, id]);

    useEffect(() =>{
        if (!dimensions) return;
        setImageHeight((dimensions.width / 3) + 'px')
    },[dimensions])

    useEffect(getImage, [id]);

    const closeModal = () =>{
        setShowModal(false);
        setShowItem({});
    }

    const openModal = (item) => {
        item.username = id
        item.timestamp = item.date
        setShowItem(item);
        setShowModal(true); 
    }

    return (
    <div className="app__screen screen__profile navbar__present">
        <TopNavigation />
        <IndividualImageModal display={showModal} hideFunction={closeModal} item={showItem} />
        <div className="profile-container" ref={containerRef} style={{ "--num_of_items": imageFeed.length, "--num_of_rows" : Math.floor(imageFeed.length/3), "--row-height": imageHeight  }}>
            <ProfileFeedHeader numOfPost={imageFeed.length}></ProfileFeedHeader>
            {imageFeed.map((item, index) => <ExploreFeedItem key={index} index={index} item={item} showFunction={()=>openModal(item)} small={true} />)}
        </div>
        { loadingFeed ? <LoadingAnimation dark={true} /> : ''}
    </div> 
    )
}
export default Profile;