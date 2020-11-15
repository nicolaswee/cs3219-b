import React, { useEffect, useState, useRef } from 'react';
import HomeFeedItem from './../../components/HomeFeedItem/HomeFeedItem';
import TopNavigation from './../../components/TopNavigation/TopNavigation';
import LoadingAnimation from './../../components/LoadingAnimation/LoadingAnimation';
import UseResizeObserver from './../../util/UseResizeObserver';
import { useAuth } from './../../context/Auth';
import './Home.css';
import FetchWithTimeout from './../../util/FetchWithTimeout';
import { useHistory } from "react-router-dom";

function Home(){
    const containerRef = useRef();
    const [imageFeed, setImageFeed] = useState([]);
    const [shownCache, setShownCache] = useState(false);
    const [loadingFeed, setLoadingFeed] = useState(false);
    const [imageHeight, setImageHeight] = useState("0px");
    const dimensions = UseResizeObserver(containerRef);
    const useMountEffect = (func) => useEffect((func), []);
    const { userData } = useAuth();
    const history = useHistory();
    const [savedTimestamp, setSavedTimestamp] = useState("");

    const returnEarlier = (a, b) => {
        let A = new Date(a)
        let B = new Date(b)
        if (A < B){
            return a
        }else{
            return b
        }
    }

    const getImage = (ts) => {
        setLoadingFeed(true);
        let params = ts ? 'timestamp=' + ts : '';
        FetchWithTimeout(`${process.env.REACT_APP_API_BASE_URL}/post/get?${params}`,
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
            //console.log(data.message);
            if (data.message.length === 0){
                if (params === ''){
                    history.push("/explore");
                }
                console.log('end of feed')
            } else {
                let allDate = []
                for (const post of data.message){
                    allDate.push({
                        ts: post.date,
                        date: new Date(post.date)
                    })
                }
                allDate.sort(function(a,b){
                    return  a.date - b.date
                });
                setSavedTimestamp(savedTimestamp ? returnEarlier(savedTimestamp, allDate[0].ts) : allDate[0].ts)
                let dataWithTimestamp = data.message.map(item => {item.nextTS = savedTimestamp ? returnEarlier(savedTimestamp, allDate[0].ts) : allDate[0].ts; return item})
                setImageFeed([...imageFeed, ...dataWithTimestamp])
                localStorage.setItem('userImageCache', JSON.stringify([...imageFeed, ...dataWithTimestamp].splice(0, 5)));
            }
            setLoadingFeed(false);
        }).catch(error =>{
            console.log(error.message);
            if (!shownCache){
                setShownCache(true);
                console.log('display from cache')
                let cacheData = JSON.parse(localStorage.getItem('userImageCache'));
                if (cacheData !== [] && cacheData !== null){
                    setImageFeed([...imageFeed, ...cacheData])
                }
            }
            setLoadingFeed(false);
        });
    };

    useEffect(() =>{
        if (!dimensions) return;
        setImageHeight((dimensions.width + 'px'))
    },[dimensions])

    useMountEffect(getImage);
    
    return (
        <div className="app__screen screen__home navbar__present">
            <TopNavigation />
            <div ref={containerRef} className="content-container" style={{ "--image-height": imageHeight  }}>
                {imageFeed.map((item, index) => index === imageFeed.length - 1 ? 
                    <HomeFeedItem key={index} index={index} item={item} triggerFunction={getImage} /> :
                    <HomeFeedItem key={index} index={index} item={item}  />)
                }
            </div>
            { loadingFeed ? <LoadingAnimation dark={true} /> : ''}
        </div>
    )
}

export default Home;