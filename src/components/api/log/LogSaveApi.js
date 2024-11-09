import axios from "axios";

const logSave = async (title, thumbnail, content) => {
    const url = localStorage.getItem('URL');
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await axios.post(`${url}/api/v1/log/create`,
            {
                title: title,
                thumbnail: thumbnail,
                content: content
            },
            {
                headers: {
                    Accept: '*/*',
                    Authorization: `Bearer ${accessToken}`,
                    'Content-type': 'application/json'    
                }
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