import React, {useState, useRef, useEffect} from 'react';
import './IndividualImageModal.css';
import UseResizeObserver from './../../util/UseResizeObserver';
import { Link } from 'react-router-dom';
import ProfileIcon from './../ProfileIcon/ProfileIcon';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton } from '@material-ui/core';

function IndividualImageModal({ item , display, hideFunction}){
    const containerRef = useRef();
    const dimensions = UseResizeObserver(containerRef);
    const [imageHeight, setImageHeight] = useState("0px");

    useEffect(() =>{
        if (!dimensions) return;
        setImageHeight(dimensions.width + 'px')
    },[dimensions])

    return(
        <div ref={containerRef} className={display ? "image-modal__container" : "image-modal__container hidden"}>
            <div className="image-modal__shadow" onClick={hideFunction}></div>
            <div className="image-modal__content-container">
                <div className="image-modal__card" style={{ "--row-height": imageHeight  }}>
                    <div className="homefeeditem__header">
                        <div className="homefeeditem__user">
                            <ProfileIcon imageLink={"/profile.jpg"} />
                        <Link to={'/profile/' + item.username}>{item.username}</Link>
                        </div>
                        <IconButton size="small">
                            <MoreHorizIcon style={{fontSize: 25}} />
                        </IconButton>
                    </div>
                    <div className="homefeeditem__image">
                        <img src={item.image} alt="" loading="lazy" />
                    </div>
                    <div className="homefeeditem__body">
                        <span className="user">{item.username}</span>
                        <span className="caption">{item.caption}</span>
                        <span className="timestamp">{new Date(item.timestamp).toString().substring(0,10)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndividualImageModal