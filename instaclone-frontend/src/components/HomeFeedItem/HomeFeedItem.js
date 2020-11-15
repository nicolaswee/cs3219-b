import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from './../ProfileIcon/ProfileIcon';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton } from '@material-ui/core';
import './HomeFeedItem.css';

function HomeFeedItem( { item, triggerFunction, index} ){
    const [triggerCount, setTriggerCount] = useState(triggerFunction ? 0 : 1);
    const useMountEffect = (func) => useEffect((func), []);

    const setObserver = () => {
        if (triggerFunction){
            let options = {
                root: null,
                rootMargin: '-150px',
                threshold: 0
            }
            let target = document.querySelector('.triggerClass');
            let observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && triggerCount < 1) {
                        setTriggerCount(1);
                        triggerFunction(item.nextTS);
                        observer.disconnect(target)
                    }
                });
            }, options);
            observer.observe(target);

            return () => {
                observer.unobserve(target);
            }
        }
    }

    useMountEffect(setObserver);

    return (
        <div className={triggerFunction ? 'triggerClass' : ''}>
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
                <img src={item.post_url} alt="" loading="lazy" />
            </div>
            <div className="homefeeditem__body">
                <span className="user">{item.username}</span>
                <span className="caption">{item.caption}</span>
                <span className="timestamp">{new Date(item.date).toString().substring(0,10)}</span>
            </div>
        </div>
        
    )
}

export default HomeFeedItem;