import axios from "axios";

const accessTokenReissueApi = async (setIsLoggedIn) => {
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

        if(response.data.success === true) {
            setIsLoggedIn(true);
            localStorage.setItem('accessToken', response.data.result.accessToken);
        }
        console.log(response.data);

    } catch (error) {
        console.error(error.response);
    }

};

export default accessTokenReissueApi;