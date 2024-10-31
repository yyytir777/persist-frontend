import axios from "axios";

const URL = 'http://localhost:8080';

const accessTokenReissueApi = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('URL : ', URL);
    try {
        const response = await axios.post(`${URL}/api/v1/token/reissue`, {
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${refreshToken}`,
            }
        });
        console.log('accessToken was reissued')
        localStorage.setItem('accessToken', response.data.result.accessToken);
    } catch (error) {
        console.error(error.response);
    }
};

export default accessTokenReissueApi;