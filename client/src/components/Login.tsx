import React from 'react';
import { InputText } from 'primereact/inputtext';

interface Props {
    darkMode: boolean
}

export const Login = (props: Props) => {

    const handleSubmit = (event: any) => {
        alert("Test");
        event.preventDefault();
    }

    return(
        <div className="login-wrapper">
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <InputText id="username" />
                    <label htmlFor="password">Password</label>
                    <InputText id="password" />
                </form>
            </div>
        </div>
    )
}