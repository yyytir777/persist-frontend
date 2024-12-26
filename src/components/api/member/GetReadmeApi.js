import apiClient from "../AxiosInterceptor";

const getReadmeApi = async ( memberId ) => {
    try {
        const response = await apiClient.get(`/api/v1/member/readme/${memberId}`);
        if(response.data.success === true) return response.data.result;
        else {
            console.log('API responsed with an unsuccessful result');
            return [];
        }
    } catch(error) {
        console.error(error);
        return [];
    }
}

export default getReadmeApi;