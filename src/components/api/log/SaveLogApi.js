import apiClient from "../AxiosInterceptor";

const saveLogApi = async (title, thumbnail, content) => {
    try {
        const response = await apiClient.post(`/api/v1/log/create`,
            {title, thumbnail, content}
        );

        if(response.data.success === true) return response.data.result;
        else {
            console.warn('API responsed with an unsuccessful result');
            return [];
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default saveLogApi;