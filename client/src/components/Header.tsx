import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
}

export const Header = (props: Props) => {

    return(
        <header className="header">
            {/* <div className="responsive">
                <input type="checkbox" />
                <span className="burger" />
                <span className="burger" />
                <span className="burger" />
                <ul className="header-links-res">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/careers">Careers</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li><NavLink to="/login"><span className="pi pi-user"/></NavLink></li>
                </ul>
            </div> */}
            <div className="logo">
                <NavLink to="/">Blog</NavLink>
            </div>
            <div className="header-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/careers">Careers</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/login"><span className="pi pi-user"/></NavLink>
            </div>
        </header>
    )
}