import React from 'react';
import './LoadingAnimation.css';

function LoadingAnimation( { dark } ){
    return (
        <div className={ dark ? "lds-spinner dark" : "lds-spinner"}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}

export default LoadingAnimation;