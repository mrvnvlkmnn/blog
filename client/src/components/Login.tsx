import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import Axios from "axios";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

interface Props {
    darkMode: boolean
}

export const Login = (props: Props) => {
    const [rememberMe, setRememberMe] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usersList, setUsersList] = useState([]);
    const localhost = "http://localhost:3001";

    const darkmode = props.darkMode ? 'darkmode' : ''
    const toast = useRef<any>(null);

    const submitLogin = (e: any) => {
        e.preventDefault();
        // toast?.current?.show({severity: 'success', summary: "Successful Login", detail: "You are now logged in", life: 3000});
        
        if (username === "") {
            Axios.post(localhost + "/api/createUser", {
                username: username,
                password: password,
            }).catch((error) => {
                console.log(error);
                toast?.current?.show({severity: 'error', summary: error.message, detail: error.response.data, life: 3000});
            });
        }
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