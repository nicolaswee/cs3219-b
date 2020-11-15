import React, {useEffect, useState} from 'react';
import './ExploreFeedItem.css'

function ExploreFeedItem( { index, item, big, long, showFunction, triggerFunction, small} ){

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
                        triggerFunction();
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

    const getClasses = () => {
        let cssclass = ""
        if (small){
            cssclass = "explore-feed-item"
        } else {
            cssclass = index % 11 === 1 ? "explore-feed-item large" : index % 11 === 6 ? "explore-feed-item long" : "explore-feed-item"
        }
        
        cssclass = triggerFunction ? cssclass + ' triggerClass' : cssclass
        return cssclass
    }
    const cssClass = getClasses()
    return (
        <div onClick={showFunction} className={cssClass} >
            <img src={item.image} alt="" loading="lazy" />
        </div>
    )
}

export default ExploreFeedItem;