import axios from "axios";
import accessTokenReissueApi from "./AccessTokenReissueApi";
import { useLoginState } from "../context/LoginContext";

const useUpdateToken = async () => {
    const url = localStorage.getItem('URL');
    const accessToken = localStorage.getItem('accessToken');

    const [isLogin, actions] = useLoginState();

    if (!accessToken) {
        console.log('accessToken is not defined');
        actions.logout();
        return;
    }

    try {
        const response = await axios.get(`${url}/health/memberInfo`, {
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json'
            }
        });
        
        if(response.data.success === true) actions.login();

        if(response.data.code === 'T002') {
            console.log('accessToken Expired');
            await accessTokenReissueApi();
        } else if (response.data.code === 'T005') {
            alert(response.data.errorMessage);
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

export default useUpdateToken;