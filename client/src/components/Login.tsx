import React, { useState, useEffect} from 'react';
import { InputText } from 'primereact/inputtext';
import Axios from "axios";

interface Props {
    darkMode: boolean
}

export const Login = (props: Props) => {

    const submitLogin = () => {
        Axios.post("http://localhost:3001/api/login", [userName, password])
    }
    const [userName, setUsername] = useState("");
    const [password, setPasword] = useState("");

    return(
        <div className="login-wrapper">
            <div className="login">
                <label htmlFor="username">Username</label>
                <InputText id="username" onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
                <label htmlFor="password">Password</label>
                <InputText id="password" onChange = {(e) => {
                    setPasword(e.target.value);
                }}/>
                <button onClick={submitLogin}>Login</button>
            </div>
        </div>
    )
}