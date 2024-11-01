import React from "react";
import styled from "styled-components";
import googleLoignImg from '../img/login/google_login_button.png';
import kakaoLoginImg from '../img/login/kakao_login_medium_narrow.png';

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

    const HandlerClickGoogleLogin = () => {
        const link = `https://accounts.google.com/o/oauth2/v2/auth`;
        const clientId = '737775759701-5sab54jiavt4hdil7pc8ns155cbuv67j.apps.googleusercontent.com';
        const redirectURL = 'http://localhost:3000/oauth/callback/google';
        const loginURL = `${link}?client_id=${clientId}&redirect_uri=${redirectURL}&response_type=code&scope=email`;

        window.location.href = loginURL;
    };

    const HandlerClickKakaoLogin = () => {
        const link = `https://kauth.kakao.com/oauth/authorize`;
        const clientId = '30f5f1287dfee3c347207686fc8af85f';
        const redirectURL = 'http://localhost:3000/oauth/callback/kakao';
        const loginURL = `${link}?client_id=${clientId}&redirect_uri=${redirectURL}&response_type=code`;

        window.location.href = loginURL;
    };

    return (
        <LoginWrapper>
            <h2>Google Login</h2>
            <img src={googleLoignImg} alt="googleLogin" onClick={HandlerClickGoogleLogin} />
            <img src={kakaoLoginImg} alt="kakaoLogin" onClick={HandlerClickKakaoLogin} />
        </LoginWrapper>
    );
}
