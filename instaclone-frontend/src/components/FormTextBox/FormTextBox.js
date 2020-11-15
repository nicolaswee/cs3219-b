import React from 'react';
import './FormTextBox.css';

function FormTextBox ( { id, type, placeholder, reference } ) {
    return (
        <div className="field">
            <input id={id} type={type} placeholder=' ' ref={reference} />
            <label>{placeholder}</label>
        </div>
    )
}

export default FormTextBox;