import axios from "axios";
import accessTokenReissueApi from "./auth/AccessTokenReissueApi";

// baseURL, 기본 headers 설정
const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'accept': '*/*',
        'Content-type': 'application/json',
    },
    withCredentials: true
});

// localStorage에 accessToken이 존재할 시 Bearer토큰에 추가 (없으면 없는대로 요청 생성)
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error.response)
)

// 응답에서 success가 false일 때 error로 처리 & accessToken, refreshToken 만료 시 handler 설정
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
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
        }

        // 나머지 실패한 응답은 예외처리
        if(response?.data.success === false) {
            return Promise.reject(response);
        }

        return response;
    },
    async (error) => {
        return Promise.reject(error);
    }
)

export default apiClient;