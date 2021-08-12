import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { authenticationService } from '../services/authenticationService';
import { NavLink } from 'react-router-dom';

interface Props {
    darkMode: boolean
}

export const Login = (props: Props) => {
    
    // credentials
    const [rememberMe, setRememberMe] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");



    const [errors, setErrors] = useState([]);
    // const [usersList, setUsersList] = useState([]);

    const toast = useRef<any>(null);

    useEffect(() => {
    }, [errors])

    const submitLogin = (e: any) => {
        e.preventDefault();

        // Fehlt:
        // response.data.errors
        // response.data.rememberMeToken
        authenticationService.login({username: username, password: password, rememberMe: rememberMe})
        .then(response => {
            // const POSITIVE_STATUS_UPPER_BORDER = 299;
            const NEGATIVE_STATUS_LOWER_BORDER = 400;

            // console.log(response);
            if (response.status >= NEGATIVE_STATUS_LOWER_BORDER) {
                setErrors(response.data?.errors)
                toast?.current?.show({severity: 'error', summary: "Error", detail: response.data.message, life: 3000});
            } else {
                if (response.data.name) {
                    toast.current?.show({ severity: "success", summary: "Successful Login", detail: `Hi ${response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1)}. You are now successfully logged in`});
                } else {
                    toast.current?.show({ severity: "success", summary: "Successful Login", detail: "You are now successfully logged in"});
                }
                // window.location.replace("http://localhost:3000");
                if (rememberMe) {
                    const expirationDate = new Date(2999, 12);
                    console.log(expirationDate);
                    document.cookie = `rememberMeToken= ${response.data.rememberMeToken}; username=${response.data.username}; expires= ${expirationDate};`;
                }
            }
        })
        .catch(err => {
            // console.log(err.stack);
            console.log(Response)
            // setErrors(prevErr => prevErr)
            toast?.current?.show({severity: 'error', summary: "Error", detail: err.message, life: 3000});
        });
    }

    return(
        <div className="page">
            <div className="page-content login">
                <form className="login-form">
                    <div className="login-header">Login</div>
                    <span className="p-float-label">
                        <InputText className="inputText inputText-login" id="username" onChange={(e) => setUsername(e.target.value)}/>
                        <label htmlFor="username">Username</label>
                    </span>
                    <span className="p-float-label">
                    <InputText className="inputText inputText-login" type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                    </span>
                    <div className="remember-me-checkbox">
                    <Checkbox className="checkbox" id="login-remember-me" checked={rememberMe} onChange={() => setRememberMe(currentState => !currentState)} />
                        <label htmlFor="login-remember-me">&nbsp;Remember&nbsp;Me</label>
                    </div>
                    <div>
                        <Button type="submit" className="btn login-btn" onClick={submitLogin} label="Submit"/>
                    </div>
                    <div className="register-now">Don't have an Account? <NavLink to="/register">Register Now</NavLink></div>
                </form>
            </div>
        </div>
    )
}