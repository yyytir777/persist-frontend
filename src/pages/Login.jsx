import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import googleLoignImg from '../img/login/google_login_button.png';

const LoginWrapper = styled.div`
    width: 100%;
    min-height: 100%;
    padding: 0px 10%;
    padding-bottom: 100px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export default function Login() {

    const [tokens, setTokens] = useState({accessToken: '', refreshToken: ''});

    const HandlerClickGoogleLogin = async () => {
        try {
            const link = `https://accounts.google.com/o/oauth2/v2/auth`;
            const clientId = '737775759701-5sab54jiavt4hdil7pc8ns155cbuv67j.apps.googleusercontent.com';
            const redirectURL = 'http://localhost:8080/oauth/google/callback';
            const loginURL = `${link}?client_id=${clientId}&redirect_uri=${redirectURL}&response_type=code&scope=email`;
    
            console.log(loginURL);
            const response = await axios.get(loginURL, { withCredentials: true });
            const { access_token, refresh_token } = response.data;
    
            console.log('Access Token:', access_token);
            console.log('Refresh Token:', refresh_token);
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    };

    return(
        <LoginWrapper>
            <img src={googleLoignImg} alt="googleLogin" onClick={HandlerClickGoogleLogin} />
        </LoginWrapper>
    );
}