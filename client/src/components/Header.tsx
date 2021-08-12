import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
}

export const Header = (props: Props) => {

    return(
        <header className="header">
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