import axios from "axios";
import accessTokenReissueApi from "./AccessTokenReissueApi";

/**
 * react hook이 아닌 function
 * accessToken으로 만료가 됐는지 확인
 * -> 만료되었다면 refreshToken으로 accessToken 재발급
 * -> 만료되지 않았다면 그대로 유지 (return undefined;)
 * accessToken이 비었는지는 체크 안함 => 함수 호출 전에 체크해야함
 * @returns 
 */
const updateToken = async () => {
    const url = localStorage.getItem('URL');
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await axios.get(`${url}/health/memberInfo`, {
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json'
            }
        });
        
        if(response.data.success === true) return response.data.result;

        if(response.data.code === 'T002') {
            console.log('accessToken Expired');
            await accessTokenReissueApi();
        } else if (response.data.code === 'T005') {
            alert(response.data.errorMessage);
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
    } catch (error) {
        console.log(error.response);
        return undefined;
    }
    
    return undefined;
}

export default updateToken;