import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { authenticationService } from '../services/authenticationService';

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



    const [errors, setErrors] = useState([]);
    // const [usersList, setUsersList] = useState([]);

    const darkmode = props.darkMode ? 'darkmode' : ''
    const toast = useRef<any>(null);

    useEffect(() => {
    }, [errors])

    const submitLogin = (e: any) => {
        e.preventDefault();
        if (!Object.is(password, repeatPassword)) {
            // show error
            return;
        }

        // Fehlt:
        // response.data.errors
        // response.data.rememberMeToken
        // authenticationService.login({username: username, password: password, rememberMe: rememberMe})
        authenticationService.register({ username: username, name: name, surname: surname, email: email, password: password, rememberMe: rememberMe})
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
        <div className="login-wrapper">
            <div className={`login ${darkmode}`}>
                <form className="login-form">
                    <div className="login-header">Register</div>
                    <span className={`p-float-label ${darkmode}`}>
                        <InputText className={`inputText ${darkmode}`} id="username" onChange={(e) => setUsername(e.target.value)}/>
                        <label htmlFor="username">Username</label>
                    </span>
                    <span className={`p-float-label ${darkmode}`}>
                        <InputText className={`inputText ${darkmode}`} id="name" onChange={(e) => setName(e.target.value)}/>
                        <label htmlFor="password">First Name*</label>
                    </span>
                    <span className={`p-float-label ${darkmode}`}>
                        <InputText className={`inputText ${darkmode}`} id="name" onChange={(e) => setSurname(e.target.value)}/>
                        <label htmlFor="password">Last Name*</label>
                    </span>
                    <span className={`p-float-label ${darkmode}`}>
                        <InputText className={`inputText ${darkmode}`} id="name" onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="password">Email</label>
                    </span>
                    <span className={`p-float-label ${darkmode}`}>
                        <InputText className={`inputText ${darkmode}`} type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                    </span>
                    <span className={`p-float-label ${darkmode}`}>
                        <InputText className={`inputText ${darkmode}`} type="password" id="repeatpassword" onChange={(e) => setRepeatPassword(e.target.value)}/>
                        <label htmlFor="repeatpassword">Repeat Password</label>
                    </span>
                    <div className={`login-checkbox ${darkmode}`}>
                        <Checkbox className={`checkbox ${darkmode}`} id="login-remember-me" checked={rememberMe} onChange={() => setRememberMe(currentState => !currentState)} />
                        <label htmlFor="login-remember-me">&nbsp;Remember&nbsp;Me</label>
                    </div>
                    <div>
                        <Button type="submit" className="btn submit-btn" onClick={submitLogin} label="Submit"/>
                    </div>
                    <div className="optional">*&nbsp;Optional</div>
                    <div className="register-now">Already&nbsp;have&nbsp;an&nbsp;Account?&nbsp;<NavLink to="/login">Login&nbsp;now</NavLink></div>
                </form>
            </div>
            <Toast ref={toast} position="bottom-left"/>
        </div>
    )
}