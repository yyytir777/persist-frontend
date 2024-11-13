import apiClient from "../AxiosInterceptor";

const logSave = async (title, thumbnail, content) => {
    try {
        const response = await apiClient.post(`/api/v1/log/create`,
            {
                title, thumbnail, content
            }
        );

        if(response.data.success === true) {
            return response.data.result;
        }
    } catch (error) {
        console.log(error);
    }
}

export default logSave;