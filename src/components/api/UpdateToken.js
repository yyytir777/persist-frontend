import axios from "axios";
import accessTokenReissueApi from "./AccessTokenReissueApi";

const updateToken = async (setIsLoggedIn) => {
    const url = localStorage.getItem('URL');
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        console.log('accessToken is not defined');
        setIsLoggedIn(false);
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
        
        if(response.data.success === true) setIsLoggedIn(true);

        if(response.data.code === 'T002') {
            console.log('accessToken Expired');
            await accessTokenReissueApi(setIsLoggedIn);
        } else if (response.data.code === 'T005') {
            alert(response.data.errorMessage);
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

export default updateToken;