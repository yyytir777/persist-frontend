import axios from "axios";
import accessTokenReissueApi from "./AccessTokenReissueApi";

const checkLogin = async () => {
    const accessToken = localStorage.getItem('accessToken');

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

        if(reissueAccessToken) {
            localStorage.setItem('accessToken', reissueAccessToken);
            return checkLogin();
        } else {
            localStorage.removeItem('accessToken');
            return false;
        }
    } else if (response.data.code === 'T005') {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
    }

    return response.data.success;
}

export default checkLogin;