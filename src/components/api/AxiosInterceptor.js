import axios from "axios";
import accessTokenReissueApi from "./AccessTokenReissueApi";

const accessToken = localStorage.getItem('accessToken');
const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${accessToken}`,
        'Content-type': 'application/json',
    },
    withCredentials: true
});

apiClient.interceptors.response.use(
    async (response) => {
        const code = response?.data.code;
        const originalrequest = response.config;

        if(code === 'T002') {
            console.log('accessToken Expired');
            const reissueAccessToken = await accessTokenReissueApi();
            if(reissueAccessToken) {
                console.log('reissue accessToken : ', reissueAccessToken);
                localStorage.setItem('accessToken', reissueAccessToken);
                originalrequest.headers['Authorization'] = `Bearer ${reissueAccessToken}`;
                return apiClient(originalrequest);
            } else {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
            }
        } else if (code === 'T005') {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }

        return response;
    },
    async (error) => {
        return Promise.reject(error);
    }
)

export default apiClient;