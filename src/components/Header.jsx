import React, { useState } from "react";
import styled from "styled-components";
import menuIcon from '../img/icon_menu.svg';
import userIcon from '../img/icon_user.png';
import { useNavigate } from "react-router-dom";
import MenuBar from "./MenuBar";
import accessTokenReissueApi from "./api/AccessTokenReissueApi";
import handleHome from "./handler/handleHome";
import { useLoginState } from "./context/LoginContext";
import apiClient from "./api/AxiosInterceptor";
import LoginModal from "./modal/LoginModal";

const HeaderContainer = styled.div`
    height: 60px;
    position: relative;
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
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
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
    
    const {isLogin, setLogout} = useLoginState();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const openLoginModal = () => {
        setIsModalOpen(true);
    }

    const closeLoginModal = () => {
        setIsModalOpen(false);
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
            openLoginModal();
            return;
        }

        try {
            const response = await apiClient.get(`${URL}/api/v1/token/memberId`);
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
            openLoginModal();
        }

        if(response?.data.success) {
            const memberId = response?.data.result;
            navigate(`/repository/${memberId}`);
        }
    }

    return(
        <HeaderContainer>
            <HeaderWrapper>
                <HeaderMenuIcon src={menuIcon} alt="menu" onClick={toggleMenu}/>
                <HeaderLogo onClick={handleHome}>Persist</HeaderLogo>
                <LogInWrapper>
                    <HeaderUserIcon src={userIcon} alt="user" onClick={handleMemberPage} />
                    <HeaderButton onClick={isLogin ? handleLogout : openLoginModal}>
                        {isLogin ? 'Logout' : 'LogIn'}
                    </HeaderButton>
                </LogInWrapper>
            </HeaderWrapper>
            {isMenuOpen && (<MenuBar toggleMenu={toggleMenu}/>)}
            <LoginModal isModalOpen={isModalOpen} closeLoginModal={closeLoginModal} />
        </HeaderContainer>
    );
}