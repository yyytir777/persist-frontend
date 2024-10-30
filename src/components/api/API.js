import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {"Content-Type": "application/json"}
});

const url = localStorage.getItem('URL');

// accesstoken이 있을 때만 Authorization 헤더 추가
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 요청했는데 accessToken 만료 시 재발급 처리 후 재요청
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log(error);
        const originalRequest = error.config;

        if(error.response.code === 'T002' && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const data = await axios.post(`${url}/api/auth/refresh`, {
                        refreshToken,
                    });

                    localStorage.setItem('accessToken', data.result.accessToken);

                    originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
                    return api(originalRequest);
                } else {
                    window.location.href = '/login';
                }
            } catch(refreshError) {
                alert(refreshError.response.data.errorMessage);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;