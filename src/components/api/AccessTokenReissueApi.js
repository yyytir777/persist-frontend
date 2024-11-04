import axios from "axios";
import { useLoginState } from "../context/LoginContext";

const useAccessTokenReissueApi = async (setIsLoggedIn) => {
    const [,actions] = useLoginState();
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
            actions.login();
            localStorage.setItem('accessToken', response.data.result.accessToken);
        }
        console.log(response.data);

    } catch (error) {
        console.error(error.response);
    }

};

export default useAccessTokenReissueApi;