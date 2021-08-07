import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'primereact/button';

interface Props {
    darkMode: boolean;
}

export const Home = (props: Props) => {

    const darkmode = `${props.darkMode ? "darkmode" : ""}`

    return(
        <div className="home-wrapper">
            <div className={`home ${darkmode}`}>
                Test
            </div>
        </div>
    )
}