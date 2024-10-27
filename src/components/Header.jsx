import React from "react";
import '../css/components/Header.css';
import menuIcon from '../img/icon_menu.png';
import userIcon from '../img/icon_user.png';

export default function Header() {
    return(
        <div className="HeaderContainer">
            <div className="HeaderWrapper">
                <img className="HeaderImage" src={menuIcon} alt="logo"/>
                <h2 className="HeaderH2">Persist</h2>
                <img className="HeaderImage" src={userIcon} alt="logo"/>
            </div>
        </div>
    );
}