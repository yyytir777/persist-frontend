import axios from "axios";
import accessTokenReissueApi from "./AccessTokenReissueApi";

let isCheckingLogin = false;

const checkLogin = async () => {
    if(isCheckingLogin) return;
    isCheckingLogin = true;
    
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await axios.get('http://localhost:8080/health/memberInfo', {
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json'
            }
        });
    
        if(response.data.code === 'T002') {
            console.log('accessToken Expired');
            const reissueAccessToken = await accessTokenReissueApi();
    
            if (reissueAccessToken) {
                localStorage.setItem('accessToken', reissueAccessToken);
                
                // 재발급된 accessToken으로 다시 요청
                const reIssueResponse = await axios.get('http://localhost:8080/api/v1/token/loginCheck', {
                    headers: {
                        Accept: '*/*',
                        Authorization: `Bearer ${reissueAccessToken}`,
                        'Content-type': 'application/json'
                    }
                });
                console.log("accesstoken 재발급");
                return reIssueResponse.data.success;
            } else {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                return false;
            }
        } else if (response.data.code === 'T005') {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
            return false;
        }

        return response.data.success;
    } catch (error) {
        console.log(error);
        return false;
    } finally {
        isCheckingLogin = false;
    }
}

export default checkLogin;