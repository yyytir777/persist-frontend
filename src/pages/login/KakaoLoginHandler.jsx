import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function KakaoLoginHandler({ onLoginSuccess }) {

    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code');

    useEffect(() => {
        const getToken = async() => {
            await axios({
                method: "GET",
                url: `http://43.203.89.62:8080/oauth/callback/kakao?code=${code}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                }
            }).then((res) => {
                const accessToken = res.data.result.accessToken;
                const refreshToken = res.data.result.refreshToken;

                console.log('accessToken', accessToken);
                console.log('refreshToken', refreshToken);
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                onLoginSuccess();
                navigate('/');
            });
        };
        getToken();
    }, [code, navigate, onLoginSuccess]);

    return(
        <>
            <p>로그인 중입니다. 잠시만 기다려주세요.</p>
        </>
    )
}