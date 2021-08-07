import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import Axios from "axios";
import { Button } from 'primereact/button';

interface Props {
    darkMode: boolean
}

export const Login = (props: Props) => {
    const [rememberMe, setRememberMe] = React.useState(false);

    const darkmode = `${props.darkMode ? 'darkmode' : ''}`

    const submitLogin = () => {
        Axios.post("http://localhost:3001/api/login", [username, password])
    }
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div className="login-wrapper">
            <div className={`login ${darkmode}`}>
                <div className="login-form">
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
                        <Button className="btn submit-btn" onClick={submitLogin} label="Submit"/>
                    </div>
                </div>
            </div>
        </div>
    )
}