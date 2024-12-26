import apiClient from "../AxiosInterceptor"

const getLogApi = async() => {
    try {
        const response = await apiClient.get(`/api/v1/log/all`);
        if(response.data.success === true) return response.data.result;
        else return Promise.reject(response);
    } catch (error) {
        console.log(error);
    }
}

export default getLogApi;