import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { authenticationService } from '../services/authenticationService';
import validate from '../services/frontEndValidation';

interface Props {
    darkMode: boolean
}

export const Register = (props: Props) => {

    // credentials
    const [rememberMe, setRememberMe] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");



    const [errors, setErrors] = useState<any[]>([]);
    // const [usersList, setUsersList] = useState([]);

    const toast = useRef<any>(null);

    const submitRegister = (e: any) => {
        e.preventDefault();
        if (!Object.is(password, repeatPassword)) {
            // show error
            return;
        }

        const credentials = {
            username: username,
            name: name,
            surname: surname,
            email: email,
            password: password,
            repeatPassword: repeatPassword,
            rememberMe: rememberMe
        }

        // Fehlt:
        // response.data.errors
        // response.data.rememberMeToken
        // authenticationService.login({username: username, password: password, rememberMe: rememberMe})
        authenticationService.register(credentials)
        .then(response => {
            // const POSITIVE_STATUS_UPPER_BORDER = 299;
            const NEGATIVE_STATUS_LOWER_BORDER = 400;

            // console.log(response);
            if (response.status >= NEGATIVE_STATUS_LOWER_BORDER) {
                setErrors(response.data?.errors)
                toast?.current?.show({severity: 'error', summary: "Error", detail: response.data.message, life: 3000});
            } else {
                toast.current?.show({ severity: "success", summary: "Successful Login", detail: `Hi ${response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1)}. You are now successfully logged in`});
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
            <div className="page-content register">
                <form className="register-form">
                    <div className="register-header">Register</div>
                    <div className="register-content">
                        <div className="column-1">
                            <span className="p-float-label">
                                <InputText className="inputText inputText-register" id="username" onChange={(e) => setUsername(e.target.value)}/>
                                <label htmlFor="username">Username</label>
                            </span>
                            <span className="p-float-label">
                                <InputText className="inputText inputText-register" id="name" onChange={(e) => setName(e.target.value)}/>
                                <label htmlFor="name">First Name*</label>
                            </span>
                            <span className="p-float-label">
                                <InputText className="inputText inputText-register" id="name" onChange={(e) => setSurname(e.target.value)}/>
                                <label htmlFor="surname">Last Name*</label>
                            </span>
                            <span className="p-float-label">
                                <InputText className="inputText inputText-register" id="email" onChange={(e) => setEmail(e.target.value)} />
                                <label htmlFor="email">Email*</label>
                            </span>
                        </div>
                        <div className="column-2">
                            <span className="p-float-label">
                                <InputText className="inputText inputText-register" type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                                <label htmlFor="password">Password</label>
                            </span>
                            <span className="p-float-label">
                                <InputText className="inputText inputText-register" type="password" id="repeatpassword" onChange={(e) => setRepeatPassword(e.target.value)}/>
                                <label htmlFor="repeatpassword">Repeat Password</label>
                            </span>
                            <div className="remember-me-checkbox">
                                <Checkbox className="checkbox" id="register-remember-me" checked={rememberMe} onChange={() => setRememberMe(currentState => !currentState)} />
                                <label htmlFor="register-remember-me">&nbsp;Remember&nbsp;Me</label>
                            </div>
                        </div>
                    </div>
                    <div className="register-submit">
                        <Button type="submit" className="btn register-btn" onClick={submitRegister} label="Submit"/>
                    </div>
                    <div className="login-now">Already have an Account? <NavLink to="/login">Login Now</NavLink></div>
                </form>
            </div>
            <Toast position="bottom-left" ref={toast} />
        </div>
    )
}