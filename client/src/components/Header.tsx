import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
    darkMode: boolean
}

export const Header = (props: Props) => {

    const darkmode = props.darkMode ? 'darkmode' : ''

    return(
        <div className="header-wrapper">
            <div className={`header ${darkmode}`}>
                <NavLink to="/" className="logo">Blog</NavLink>
                <input className="menu-btn" type="checkbox" id="menu-btn" />
                <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                <ul className="menu">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/careers">Careers</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li><NavLink className={`user-login-animation ${darkmode}`} to="/login"><span className="pi pi-user" /></NavLink></li>
                </ul>
            </div>
        </div>
    )
}