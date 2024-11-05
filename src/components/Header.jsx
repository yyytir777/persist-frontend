import React, { useState } from "react";
import styled from "styled-components";
import menuIcon from '../img/icon_menu.svg';
import userIcon from '../img/icon_user.png';
import { useNavigate } from "react-router-dom";
import MenuBar from "./MenuBar";
import axios from "axios";
import accessTokenReissueApi from "./api/AccessTokenReissueApi";
import handleHome from "./handler/handleHome";
import { useLoginState } from "./context/LoginContext";

const HeaderContainer = styled.div`
    height: 60px;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #F2F2F2;
    display: flex;
    padding: 10px 10%;
    justify-content: space-between;
    align-items: center;
`;

const HeaderMenuIcon = styled.img`
    width: 36px;
    height: 36px;
    cursor: pointer;
`;

const HeaderLogo = styled.h1`
    cursor: pointer;
`;

const HeaderUserIcon = styled.img`
    width: 36px;
    height: 36px;
    cursor: pointer;
`;

const LogInWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

const HeaderButton = styled.button`
    min-width: 48px;
    height: 36px;
`;

export default function Header() {
    
    const {isLogin, setLogin, setLogout} = useLoginState();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }


    const handleLogin = () => {
        navigate('/login');
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setLogout();
        window.location.href = '/';
    }

    const fetchMemberId = async () => {
        const URL = localStorage.getItem('URL');
        const accessToken = localStorage.getItem('accessToken');

        if(!accessToken) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get(`${URL}/api/v1/token/memberId`, {
                headers: {
                    Accept: '*/*',
                    Authorization: `Bearer ${accessToken}`,
                    'Content-type': 'application/json'
                    }
            });
            return response;
        } catch(error) {
            console.log(error.reponse);
        }
    }

    const handleMemberPage = async () => {
        const response = await fetchMemberId();

        if(response?.data.code === 'T002') {
            console.log('accessToken Expired');
            await accessTokenReissueApi();
            handleMemberPage();
        } else if (response?.data.code === 'T005') {
            alert(response?.data.errorMessage);
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }

        if(response?.data.success) {
            const memberId = response?.data.result;
            navigate(`/${memberId}`);    
        }
    }

    return(
        <HeaderContainer>
            <HeaderWrapper>
                <HeaderMenuIcon src={menuIcon} alt="menu" onClick={toggleMenu}/>
                <HeaderLogo onClick={handleHome}>Persist</HeaderLogo>
                <LogInWrapper>
                    <HeaderUserIcon src={userIcon} alt="user" onClick={handleMemberPage} />
                    {isLogin ? (
                        <HeaderButton onClick={handleLogout}>Logout</HeaderButton>
                    ) : (
                        <HeaderButton onClick={handleLogin}>LogIn</HeaderButton>
                    )}
                </LogInWrapper>
            </HeaderWrapper>
            {isMenuOpen && (<MenuBar toggleMenu={toggleMenu}/>)}
        </HeaderContainer>
    );
}