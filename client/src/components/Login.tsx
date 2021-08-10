import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import Axios from "axios";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { loginService } from '../services/loginService';

interface Props {
    darkMode: boolean
}

export const Login = (props: Props) => {
    const [rememberMe, setRememberMe] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    // const [usersList, setUsersList] = useState([]);
    const localhost = "http://localhost:3001";

    const darkmode = props.darkMode ? 'darkmode' : ''
    const toast = useRef<any>(null);

    useEffect(() => {
        console.log(errors);
    }, [errors])

    const submitLogin = (e: any) => {
        e.preventDefault();
        // toast?.current?.show({severity: 'success', summary: "Successful Login", detail: "You are now logged in", life: 3000});
        
        Axios
        .post(localhost + "/api/createUser", {
            username: username,
            password: password,
        }, { timeout: 3000 })
        .catch((error) => {
            console.log(error);
            toast?.current?.show({severity: 'error', summary: "Error", detail: error.message, life: 3000});
        });

        // Fehlt:
        // positiveStatus
        // response.data.errors
        // response.data.username
        loginService.login({username: username, password: password})
        .then(response => {
            const positiveStatus = 200;

            console.log(response);
            if (response.status > positiveStatus) {
                setErrors(response.data?.errors)
            } else {
                toast.current?.show({ severity: "success", summary: "Successful Login", detail: `Hi ${response.data.username}. You are now successfully logged in`});
            }

        })
        .catch(err => {
            console.log(err);
            // setErrors(prevErr => prevErr)
            toast?.current?.show({severity: 'error', summary: "Error", detail: err.message, life: 3000});
        });

        // Axios
        // .get(localhost + "/api/getUsers", { timeout: 3000 }).catch(error => {
        //     console.log(error);
        //     toast?.current?.show({ severity: "error", summary: "An Error occured", detail: error.message, life: 3000});
        // });
    }

    return(
        <div className="login-wrapper">
            <div className={`login ${darkmode}`}>
                <form className="login-form">
                    <span className={`p-float-label ${darkmode}`}>
                        <InputText className={`inputText ${darkmode}`} id="username" onChange={(e) => setUsername(e.target.value)}/>
                        <label htmlFor="username">Username</label>
                    </span>
                    <span className={`p-float-label ${darkmode}`}>
                        <InputText className={`inputText ${darkmode}`} type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                    </span>
                    <div className={`login-checkbox ${darkmode}`}>
                        <Checkbox className={`checkbox ${darkmode}`} id="login-remember-me" checked={rememberMe} onChange={() => setRememberMe(currentState => !currentState)} />
                        <label htmlFor="login-remember-me">&nbsp;Remember&nbsp;Me</label>
                    </div>
                    <div>
                        <Button type="submit" className="btn submit-btn" onClick={submitLogin} label="Submit"/>
                    </div>
                </form>
            </div>
            <Toast ref={toast} position="bottom-left"/>
        </div>
    )
}