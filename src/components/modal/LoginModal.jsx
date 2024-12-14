import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import googleLoignImg from '../../img/login/google_login_button.png';
import kakaoLoginImg from '../../img/login/kakao_login_medium_narrow.png';

const LoginWrapper = styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

const ProviderWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function LoginModal({ isModalOpen, closeLoginModal }) {

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

    return(
        <ReactModal
            style={{
                content: {
                    width: '30%',
                    height: '30%',
                    margin: 'auto', // 중앙 배치를 위해
                    display: 'flex', // 내부 콘텐츠 정렬
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '10px', // 모달 테두리 둥글게
                    padding: '20px', // 내부 여백 추가
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 배경 투명도 설정
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
            isOpen={isModalOpen}
            onRequestClose={closeLoginModal}>
            <LoginWrapper>
                <ProviderWrapper>
                    <img src={googleLoignImg} alt="googleLogin" onClick={HandlerClickGoogleLogin} />
                </ProviderWrapper>
                <ProviderWrapper>
                    <img src={kakaoLoginImg} alt="kakaoLogin" onClick={HandlerClickKakaoLogin} />
                </ProviderWrapper>
            </LoginWrapper>

        </ReactModal>
    );
}