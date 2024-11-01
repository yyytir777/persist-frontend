import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginHandler() {

    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code');

    useEffect(() => {
        const getToken = async() => {
            await axios({
                method: "GET",
                url: `http://localhost:8080/oauth/callback/google?code=${code}`,
                headers: {
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            }).then((res) => {
                const accessToken = res.data.result.accessToken;
                const refreshToken = res.data.result.refreshToken;

                console.log('accessToken', accessToken);
                console.log('refreshToken', refreshToken);
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                navigate("/");
            });
        };
        getToken();
    }, [code, navigate]);

    return(
        <>
            <p>로그인 중입니다. 잠시만 기다려주세요.</p>
        </>
    );
}