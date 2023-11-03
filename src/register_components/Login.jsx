import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './register_login_style.css'

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(.{8,16})$/;

const BASE_URL = 'BASEURL';
const API_ROUTE = '/api/Auth/Login'
 
const LoginForm = () => {
    const userRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);


    useEffect(() => userRef.current.focus(), [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
    },[pwd])

    function sendData(){
        const user = {
            email,
            pwd
        }

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        fetch(`${BASE_URL}${API_ROUTE}`, payload)
            .then(response => response.json())
            .then(data => {}) //Handling response
            .catch(err => {}) //Handling error
    }

    return (        
        <form className='cover'>
            <h2>Login</h2>
            <input 
                type="text" 
                placeholder='EMAIL' 
                id='email'
                ref={userRef}
                required
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby='emailnote'
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
            />
            <p id='emailnote' className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                Please, enter valid email.
            </p>
            <input 
                type="password" 
                id='password'
                placeholder='PASSWORD'
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-disabled="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
             />
             <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                8 to 16 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
             </p>
           <div className="register-btn"
                onClick={(e) =>{ e.preventDefault;
                 sendData();}}>
            LOGIN
            </div>
        </form>        
        );
    
}

export default LoginForm;