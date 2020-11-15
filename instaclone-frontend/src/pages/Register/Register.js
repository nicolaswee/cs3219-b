import React, { useState, useRef } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import FormTextBox from './../../components/FormTextBox/FormTextBox';
import SubmitButton from './../../components/SubmitButton/SubmitButton';

function Register(){
    const usernameInput = useRef();
    const passwordInput = useRef();
    const emailInput = useRef();
    const nameInput = useRef();

    const [isError, setIsError] = useState("");
    const [isSuccess, setIsSuccess] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegister = ( event ) =>{
        event.preventDefault();
        if (usernameInput.current.value === "" || passwordInput.current.value === "" ||  nameInput.current.value === "" ||  emailInput.current.value === "") {
            setIsError("Empty fields");
            return;
        }
        setIsRegistering(true);
        setIsError("");
        setIsSuccess("");
        fetch(`${process.env.REACT_APP_API_BASE_URL}/user/register`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "username": usernameInput.current.value,
                    "password": passwordInput.current.value,
                    "name": nameInput.current.value,
                    "email": emailInput.current.value,
                    "display_pic":"",
                    "bio":"About myself",
                    "is_celebrity":false,
                }
            )
        }).then((response) => {
            if (response.status === 201){
                return response.json();
            } else{
                throw Error("Account registration failed.")
            }
        }).then(data => {
            setIsSuccess("Account successfully registered.");
            setIsRegistering(false);
        }).catch( error => {
            setIsRegistering(false);
            setIsError(error.message)
        });

    }
    return (
        <div className="app__screen screen__login">
            <form onSubmit={handleRegister}>
                <h1>Instaclone</h1>
                <p>Sign up to see photos and videos from your friends.</p>
                <FormTextBox id="Email" type="text" placeholder="Email" reference={emailInput} />
                <FormTextBox id="FullName" type="text" placeholder="Full Name" reference={nameInput} />
                <FormTextBox id="Username" type="text" placeholder="Username" reference={usernameInput} />
                <FormTextBox id="Password" type="password" placeholder="Password" reference={passwordInput} />

                <SubmitButton text="Sign up" loading={isRegistering} />
                {isError ? <span className="error-text">{isError}</span> :''}
                {isSuccess ? <span className="success-text">{isSuccess}</span> :''}
                <span className="login__separator"><span>OR</span></span>
                
                <span className="register-text">Have an account? <Link to="/login">Log in</Link></span>
            </form>
            
        </div>
    )
}

export default Register;