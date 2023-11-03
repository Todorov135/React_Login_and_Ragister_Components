import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './register_login_style.css'

    const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%])?.{8,16}$/;
    const NAME_REGEX = /^[A-Za-zА-Яа-я]{3,30}$/;
    const CITY_REGEX = /^[A-Za-zА-Яа-я]{3,50}$/;
    const ADDRESS_REGEX = /^.{5,}$/;
    const IBAN_REGEX = /^[A-Z]{2}\d{2}[A-Z\d]{1,40}$/;

    const BASE_URL = 'BASEURL';
    const API_ROUTE = '/api/Auth/Register';

const RegisterForm = () => {

    const userRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);


    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [city, setCity] = useState('');
    const [validCity, setValidCity] = useState(false);
    const [cityFocus, setCityFocus] = useState(false);

    const [address, setAddress] = useState('');
    const [validAddress, setValidAdress] = useState(false);
    const [addressFocus, setAddressFocus] = useState(false);

    const [iban, setIban] = useState('');

    const [err, setErr] = useState("");

    const [showContainer, setShowContainer] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = NAME_REGEX.test(firstName);
        setValidFirstName(result);
    }, [firstName])

    useEffect(() => {
        const result = NAME_REGEX.test(lastName);
        setValidLastName(result);
    }, [lastName])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);        
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const isMatched = pwd === matchPwd;
        setValidMatch(isMatched);
    },[pwd, matchPwd])

    useEffect(() => {
        const result = CITY_REGEX.test(city);        
        setValidCity(result);
    }, [city])

    useEffect(() => {
        const result = NAME_REGEX.test(city);        
        setValidCity(result);
    }, [city])

    useEffect(() => {
        const result = ADDRESS_REGEX.test(address);        
        setValidAdress(result);
    }, [address])

    useEffect(() => {
        const result = IBAN_REGEX.test(iban);        
        setValidCity(result);
    }, [iban])

    
    const isActiveBtn = !validEmail || !validPwd || !validMatch || !validFirstName || !validLastName;

    const userRegistration = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        pwd: pwd,
        matchPwd: matchPwd,
        city: city,
        address: address,
        IBAN: iban 
    }

    const payload ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
         body: JSON.stringify(userRegistration)
    }
        
    const isDataValid = validEmail && validPwd && validMatch && validFirstName && validLastName
    && email && pwd && matchPwd && firstName && lastName;
    
    function sendData(){   
        if(isDataValid){
            fetch(`${BASE_URL}${API_ROUTE}`, payload)
            .then(response => response.json())
            .then(data => {}) //Response handling
            .catch(error => {setErr(error)}) //Error handling
        }     
        
    };

    return (     
        <form className='formElements'> 
            <div className= {!showContainer ? 'cover' : 'cover hidden-left-container'}>
                <h2>REGISTER</h2>                
                <input
                        type="text"
                        placeholder='FIRST NAME'
                        id='firstName'
                        ref={userRef}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        aria-invalid={validFirstName ? "false" : "true"}
                        aria-describedby='firstnamenote'
                        onFocus={() => setFirstNameFocus(true)}
                        onBlur={() => setFirstNameFocus(false)}
                    />
                    <p id='firstnamenote' className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                        3 to 30 characters.<br />
                        Must contain uppercase and lowercase letters.<br />
                    </p>
                    <input
                        type="text"
                        placeholder='LAST NAME'
                        id='lastName'
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        aria-invalid={validLastName ? "false" : "true"}
                        aria-describedby='lastnamenote'
                        onFocus={() => setLastNameFocus(true)}
                        onBlur={() => setLastNameFocus(false)}
                    />
                    <p id='firstnamenote' className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                        3 to 30 characters.<br />
                        Must contain uppercase and lowercase letters.<br />
                    </p>
                    <input
                        type="text"
                        placeholder='EMAIL'
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                    <input 
                        type="password" 
                        id='confirmPwd'
                        placeholder='CONFIRM PASSWORD' 
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby='confirmed'
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmed" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        Password need to match.
                    </p>
                    <div 
                        className= { "register-btn" }
                        onClick={() => setShowContainer(true)}
                        >
                        Next &gt;&gt;
                    </div>
            </div>   
            <div className={showContainer ? 'cover cover-rebuild' : 'cover cover-rebuild hidden-left-container'}>      
               {/* <p className= {err ? "error-handler-hidden" : 'error-handler'}>Error</p>          */}
                <input
                    type="text"
                    placeholder='CITY'
                    id='city'
                    onChange={(e) => setCity(e.target.value)}
                    required
                    aria-invalid={validCity ? "false" : "true"}
                    aria-describedby='citynote'
                    onFocus={() => setCityFocus(true)}
                    onBlur={() => setCityFocus(false)}
                />
                <p id='citynote' className={cityFocus && city && !validCity ? "instructions" : "offscreen"}>
                    3 to 50 characters.<br />
                    Must contain uppercase and lowercase letters.<br />
                </p>
                <input
                    type="text"
                    placeholder='ADDRESS'
                    id='address'
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    aria-invalid={validAddress ? "false" : "true"}
                    aria-describedby='addressnote'
                    onFocus={() => setAddressFocus(true)}
                    onBlur={() => setAddressFocus(false)}
                />
                <p id='addressnote' className={addressFocus && address && !validAddress ? "instructions" : "offscreen"}>
                    Minimum 5 characters.<br />
                    Can contain letters and digits.<br />
                </p>
                <input
                    type="text"
                    placeholder='IBAN'
                    id='iban'
                    onChange={(e) => setIban(e.target.value)}
                />
                <div className='btns'>
                    <div className="register-btn"
                    onClick={() => setShowContainer(false)}>
                    &lt;&lt; Previous
                    </div>

                    <div disabled={isActiveBtn ? true : false}
                            className= {!isDataValid ? "inactive-registration-btn" : "register-btn" }
                            onClick={(e) =>{e.preventDefault;
                            sendData()} }>
                            Finalize
                    </div>
                </div>
            </div>     
        </form>        
        );    
}

export default RegisterForm;