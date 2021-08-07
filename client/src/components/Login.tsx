import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';

interface Props {
    darkMode: boolean
}

export const Login = (props: Props) => {
    const [rememberMe, setRememberMe] = React.useState(false);

    const handleSubmit = (event: any) => {
        alert("Test");
        event.preventDefault();
    }

    return(
        <div className="login-wrapper">
            <div className="login">
                <form className="login-form" onSubmit={handleSubmit}>
                    <span className="p-float-label">
                        <InputText id="username" />
                        <label htmlFor="username">Username</label>
                    </span>
                    <span className="p-float-label">
                        <InputText id="password" />
                        <label htmlFor="password">Password</label>
                    </span>
                    <div>
                        <Checkbox checked={rememberMe} onChange={() => setRememberMe(currentState => !currentState)} />&nbsp;Remember&nbsp;Me
                    </div>
                </form>
            </div>
        </div>
    )
}