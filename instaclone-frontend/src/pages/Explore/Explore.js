import React, { useEffect, useRef, useState } from 'react';
import TopNavigation from './../../components/TopNavigation/TopNavigation';
import ExploreFeedItem from './../../components/ExploreFeedItem/ExploreFeedItem';
import IndividualImageModal from './../../components/IndividualImageModal/IndividualImageModal';
import './Explore.css';
import LoadingAnimation from './../../components/LoadingAnimation/LoadingAnimation';
import UseResizeObserver from './../../util/UseResizeObserver';
import { useAuth } from './../../context/Auth';

function Explore(){
    const containerRef = useRef();
    const [imageFeed, setImageFeed] = useState([])
    const [imageHeight, setImageHeight] = useState("0px");
    const dimensions = UseResizeObserver(containerRef);
    const useMountEffect = (func) => useEffect((func), []);
    const [loadingFeed, setLoadingFeed] = useState(false);
    const { userData } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [showItem, setShowItem] = useState({});
    
    const getImage = () => {
        setLoadingFeed(true);
        fetch(`${process.env.REACT_APP_API_BASE_URL}/post/all`,
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
            setImageFeed([...imageFeed, ...data.message])
            setLoadingFeed(false);
        }).catch(error => {
            console.log(error.message);
            setLoadingFeed(false);
        })
    }

    useEffect(() =>{
        if (!dimensions) return;
        setImageHeight((dimensions.width / 3) + 'px')
    },[dimensions])

    useMountEffect(getImage);

    const closeModal = () =>{
        setShowModal(false);
        setShowItem({});
    }

    const openModal = (item) => {
        setShowItem(item);
        setShowModal(true); 
    }

    return (
        <div className="app__screen screen__explore navbar__present">
            <TopNavigation />
            <IndividualImageModal display={showModal} hideFunction={closeModal} item={showItem} />
            <div className="content-container" ref={containerRef} style={{ "--num_of_items": imageFeed.length, "--num_of_rows" : Math.floor(imageFeed.length/3), "--row-height": imageHeight  }}>
                {imageFeed.map((item, index) => index === imageFeed.length - 1 ? 
                    <ExploreFeedItem key={index} index={index} item={item} showFunction={()=>openModal(item)} triggerFunction={getImage} /> :
                    <ExploreFeedItem key={index} index={index} item={item} showFunction={()=>openModal(item)}  />)
                }
            </div>
            { loadingFeed ? <LoadingAnimation dark={true} /> : ''}
        </div>
    )
}

export default Explore;