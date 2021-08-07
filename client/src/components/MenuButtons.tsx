import React from 'react';
import { Button } from 'primereact/button';

interface Props {
    changeMode: (newValue: boolean) => any;
    darkMode: boolean;
}

export const MenuButtons = (props: Props) => {

    const callbackToParent = () => {
        props.changeMode(!props.darkMode);
    }

    return(
        <div className="menu-buttons">
            <Button icon={`${props.darkMode ? "pi pi-sun" : "pi pi-moon"}`} className={`btn ${props.darkMode ? 'darkmode' : ''}`} onClick={callbackToParent}></Button>
        </div>
    )
}