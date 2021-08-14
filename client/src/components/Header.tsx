import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
}

export const Header = (props: Props) => {

    return(
        // <header className="header">
        //     <div>
        //         <input type="checkbox" className="menu-btn" id="menu-btn" />
        //         <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
        //     </div>
        //     <div className="logo">
        //         <NavLink to="/">Blog</NavLink>
        //     </div>
        //     <ul className="header-links">
        //         <li><NavLink to="/">Home</NavLink></li>
        //         <li><NavLink to="/about">About</NavLink></li>
        //         <li><NavLink to="/careers">Careers</NavLink></li>
        //         <li><NavLink to="/contact">Contact</NavLink></li>
        //         <li><NavLink to="/login"><span className="pi pi-user"/></NavLink></li>
        //     </ul>
        // </header>
        <div className="header-wrapper">
            <div className="header">
                <NavLink to="/" className="logo">Blog</NavLink>
                <input className="menu-btn" type="checkbox" id="menu-btn" />
                <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                <ul className="menu">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/careers">Careers</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li><NavLink to="/login"><span className="pi pi-user"/></NavLink></li>
                </ul>
            </div>
        </div>
    )
}