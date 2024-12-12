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
            await axios({
                method: "GET",
                url: `http://localhost:8080/oauth/callback/kakao?code=${code}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                }
            }).then((res) => {
                console.log(res.data);
                const loginSuccess = res.data.success;

                // 회원이 없으므로 회원가입 필요
                if(!loginSuccess) {
                    const email = res.data.result;
                    console.log("email : ", email);

                    const isSignUp = window.confirm(`회원가입이 필요합니다.\n 이메일: ${email}로 가입하시겠습니까?`);

                    if(isSignUp) {
                        console.log('navigated to signup');
                        navigate('/SignUpPage', { state: { email: email } });
                    } else {
                        navigate('/');
                    }
                    return;
                }

                const accessToken = res.data.result.accessToken;
                const refreshToken = res.data.result.refreshToken;

                console.log('accessToken', accessToken);
                console.log('refreshToken', refreshToken);
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                setLogin();
                navigate('/');
            });
        };
        getToken();
    }, [code, navigate, setLogin]);

    return(
        <>
            <p>로그인 중입니다. 잠시만 기다려주세요.</p>
        </>
    )
}