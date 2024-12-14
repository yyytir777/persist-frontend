import apiClient from "../AxiosInterceptor"


const getMember = async ( id ) => {
    try {
        const response = await apiClient.get(`api/v1/member/${id}`);

        if(response.data.success === true) return response.data.result;
        else return Promise.reject(response);
    } catch (error) {
        console.log(error);
    }
}

export default getMember;