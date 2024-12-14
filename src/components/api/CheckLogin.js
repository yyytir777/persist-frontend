import apiClient from "./AxiosInterceptor";

const checkLogin = async () => {
    try {
        const response = await apiClient.get('/health/memberInfo');
        console.log(`${response.data.success} in checkLogin`);
        return response.data.success;
    } catch (error) {
        return false;
    }
}

export default checkLogin;