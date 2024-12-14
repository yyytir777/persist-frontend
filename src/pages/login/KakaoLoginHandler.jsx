import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginState } from "../../components/context/LoginContext";

export default function KakaoLoginHandler() {

    const navigate = useNavigate();
    const { setLogin } = useLoginState();
    const code = new URL(window.location.href).searchParams.get('code');

    useEffect(() => {
        const getToken = async() => {
            try {
                const response = await axios({
                    method: "GET",
                    url: `http://localhost:8080/oauth/callback/kakao?code=${code}`,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                    }
                });

                console.log(response.data);
                const loginSuccess = response.data.success;
        
                // 회원이 없으므로 회원가입 필요
                if (!loginSuccess) {
                    const email = response.data.result;
                    console.log("email : ", email);
        
                    const isSignUp = window.confirm(`회원가입이 필요합니다.\n 이메일: ${email}로 가입하시겠습니까?`);
        
                    if (isSignUp) {
                        console.log('navigated to signup');
                        navigate('/signup', { state: { email: email } });
                    } else {
                        navigate('/');
                    }
                    return;
                }
        
                const accessToken = response.data.result.accessToken;
                const refreshToken = response.data.result.refreshToken;
        
                console.log('accessToken', accessToken);
                console.log('refreshToken', refreshToken);
        
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
        
                setLogin();
                navigate('/');
        
            } catch(error) {
                console.log(error.response);
                navigate('/');
            }
        };
        getToken();
    }, [code, navigate, setLogin]);

    return(
        <>
            <p>로그인 중입니다. 잠시만 기다려주세요.</p>
        </>
    )
}