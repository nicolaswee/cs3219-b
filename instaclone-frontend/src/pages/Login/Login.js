import React, { useState, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FormTextBox from './../../components/FormTextBox/FormTextBox';
import SubmitButton from './../../components/SubmitButton/SubmitButton';
import './Login.css';
import { useAuth } from './../../context/Auth';
import SetExpiration from './../../util/SetExpiration';

function Login(){
    const usernameInput = useRef();
    const passwordInput = useRef();
    
    const { userData, setUserData } = useAuth();

    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(userData ? true : false);
    const [isError, setIsError] = useState("");

    const handleLogin = async ( event ) => {
        event.preventDefault();
        setIsLoggingIn(true);
        fetch(`${process.env.REACT_APP_API_BASE_URL}/user/login`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "username": usernameInput.current.value,
                    "password": passwordInput.current.value
                }
            )
        }).then((response) => {
            if (response.status === 200){
                return response.json();
            } else{
                throw Error("Unable to Login")
            }
        }).then(data => {
            data.ts = SetExpiration(600000 * 2)
            setUserData(data);
            setLoggedIn(true)
            setIsLoggingIn(false);
        }).catch( error => {
            setIsError(error.message);
            setIsLoggingIn(false);
            setUserData(null);
            setLoggedIn(false);
        });
    }

    if (isLoggedIn){
        return <Redirect to="/" />;
    }

    return (
        <div className="app__screen screen__login">
            <form onSubmit={handleLogin}>
                <h1>Instaclone</h1>
                <FormTextBox id="username" type="text" placeholder="Username" reference={usernameInput} />
                <FormTextBox id="password" type="password" placeholder="Password" reference={passwordInput} />
                <Link to='#'>Forgot password?</Link>
                <SubmitButton text="Log In" loading={isLoggingIn} />
                {isError ? <span className="error-text">{isError}</span> :''}
                <span className="login__separator"><span>OR</span></span>
                
                <span className="register-text">Don't have an account? <Link id="register" to="/register">Sign up</Link></span>
            </form>
        </div>
    )
}

export default Login;