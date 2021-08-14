import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
}

export const Header = (props: Props) => {

    const [checked, setChecked] = React.useState(false);

    return(
        <div className="header-wrapper">
            <div className="header">
                <NavLink to="/" className="logo">Blog</NavLink>
                <input className="menu-btn" type="checkbox" id="menu-btn" checked={checked} onClick={() => setChecked(currentState => !currentState)}/>
                <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                <ul className="menu">
                    <li><NavLink to="/" onClick={() => setChecked(false)}>Home</NavLink></li>
                    <li><NavLink to="/about" onClick={() => setChecked(false)}>About</NavLink></li>
                    <li><NavLink to="/careers" onClick={() => setChecked(false)}>Careers</NavLink></li>
                    <li><NavLink to="/contact" onClick={() => setChecked(false)}>Contact</NavLink></li>
                    <li><NavLink to="/login" onClick={() => setChecked(false)}><span className="pi pi-user"/></NavLink></li>
                </ul>
            </div>
        </div>
    )
}