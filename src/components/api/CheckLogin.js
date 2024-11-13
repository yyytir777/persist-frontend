import axios from "axios";
import accessTokenReissueApi from "./AccessTokenReissueApi";

const checkLogin = async () => {
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
                const reIssueResponse = await axios.get('http://localhost:8080/health/memberInfo', {
                    headers: {
                        Accept: '*/*',
                        Authorization: `Bearer ${reissueAccessToken}`,
                        'Content-type': 'application/json'
                    }
                });
                
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
    }
}

export default checkLogin;