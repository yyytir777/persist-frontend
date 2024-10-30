import axios from "axios";

const URL = localStorage.getItem('URL');

const tokenReissueApi = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        const response = await axios.post(`${URL}/api/v1/token/reissue`, {
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${refreshToken}`,
            }
        });
        console.log('accessToken was reissued')
        localStorage.removeItem('accessToken');
        localStorage.setItem('accessToken', response.data.result.accessToken);
    } catch (error) {
        console.error(error.response.data);
    }
};

export default tokenReissueApi;