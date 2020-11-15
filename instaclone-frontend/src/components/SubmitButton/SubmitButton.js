import React from 'react';
import './SubmitButton.css';
import LoadingAnimation from './../LoadingAnimation/LoadingAnimation';

function SubmitButton ( {text, loading, clickHandler, disabled} ) {
    return (
        <button className="submit-button" onClick={clickHandler} disabled={disabled}>{loading ? <LoadingAnimation /> : text}</button>
    )
}

export default SubmitButton;