import axios from "axios";

const accessTokenReissueApi = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        const response = await axios.post('http://localhost:8080/api/v1/token/reissue', 
            {},
            {
                headers: {
                    Accept: '*/*',
                    Authorization: `Bearer ${refreshToken}`,
                }
            }
        );
        console.log(response.data.result);
        localStorage.setItem('accessToken', response.data.result.accessToken);
        return response.data.result.accessToken;
    } catch (error) {
        console.error(error.response);
    }

};

export default accessTokenReissueApi;