import apiClient from "./AxiosInterceptor";

const checkLogin = async () => {
    try {
        const response = await apiClient.get('/health/memberInfo');
        console.log(`checkLogin in ${response.data.success}`);
        return response.data.success;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default checkLogin;