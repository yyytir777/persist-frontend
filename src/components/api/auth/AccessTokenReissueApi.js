import axios from "axios";

/**
 * true를 리턴하면 acessToken 재발급
 * false를 리턴하면 재발급 실패
 * @returns
 */
const accessTokenReissueApi = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
        const response = await axios.post('http://localhost:8080/api/v1/token/reissue', 
            {},
            {
                headers: {
                    Accept: '*/*',
                    Authorization: `Bearer ${refreshToken}`,
                }
            }
        );

        if(response.data.success === true) {
            localStorage.setItem('accessToken', response.data.result.accessToken);
            localStorage.setItem('refreshToken', response.data.result.refreshToken);
            return response.data.result.accessToken;
        } else {
            window.location.href = '/';
        }
    } catch (error) {
        console.error(error.response);
    }
};

export default accessTokenReissueApi;