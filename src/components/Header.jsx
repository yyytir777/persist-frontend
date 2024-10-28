import React, { useState , useEffect } from "react";
import '../css/components/Header.css';
import menuIcon from '../img/icon_menu.png';
import userIcon from '../img/icon_user.png';
import styled from "styled-components";

const HeaderContainer = styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    transition: transform 0.3s ease-in-out;
    transform: ${({ isHidden }) => (isHidden ? 'translateY(-100%)' : 'translateY(0)')};
`;

export default function Header() {
    const [isHidden, setIsHidden] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if(currentScrollY > scrollY && currentScrollY > 100) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
        setScrollY(currentScrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollY]);

    return(
        <div className="HeaderContainer" isHidden={isHidden}>
            <div className="HeaderWrapper">
                <img className="HeaderImage" src={menuIcon} alt="logo"/>
                <h2 className="HeaderH2">Persist</h2>
                <img className="HeaderImage" src={userIcon} alt="logo"/>
            </div>
        </div>
    );
}