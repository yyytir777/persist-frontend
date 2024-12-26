import apiClient from "../AxiosInterceptor";

const getCategoryListApi = async () => {
    try {
        const response = await apiClient.get(`/api/v1/category/all`);

        if(response.data.success === true) return response.data.result;
        else {
            console.warn('API responsed with an unsuccessful result');
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }

}

export default getCategoryListApi;