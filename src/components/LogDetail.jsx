import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import accessTokenReissueApi from "./api/AccessTokenReissueApi";
import MDEditor from "@uiw/react-md-editor";
import Author from "./Author";

const LogDetailWrapper = styled.div`
    width: 100%;
    min-height: 100%;
    padding: 0px 10%;
    padding-bottom: 200px;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    .wmde-markdown p img {
        display: block;
        margin: 0 auto;
    }

`;

const LogDetailThumbnailWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const LogDetailThumbnail = styled.img`
    width: 50%;
    object-fit: cover;
    object-position: center;
`;

const LogDetailTitle = styled.h1`
    padding: 20px 0px;
`;

const LogInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 40px;
`;

const LogInfoLeftWrapper = styled.div``;

const LogInfoRightWrapper = styled.div``;

const LogDetail = () => {
    const { id } = useParams();
    const [log, setLog] = useState();

    const fetchLog = useCallback(async() => {
        const accessToken = localStorage.getItem('accessToken');

        if(!accessToken) {
            console.log('accessToken is not defined');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/api/v1/log/${id}`, {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            console.log('response of /api/v1/log/{log_id} : ', response.data.result);
            setLog(response.data.result);
            
            if (response.data.code === 'T002') {
                await accessTokenReissueApi();
                fetchLog();
            } else if (response.data.code === 'T005') {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
            }
        } catch (error) {
            console.log(error.response);
        }
    }, [id]);

    useEffect(() => {
        fetchLog();
    }, [fetchLog]);

    return(
        <LogDetailWrapper data-color-mode="light">
            {log ? (
                <>
                    <LogDetailThumbnailWrapper>
                        <LogDetailThumbnail src={log.thumbnail} alt="thumbnail"/>
                    </LogDetailThumbnailWrapper>
                    <LogDetailTitle>{log.title}</LogDetailTitle>
                    <LogInfoWrapper>
                        <LogInfoLeftWrapper>
                            <Author authorThumbnail={log.authorThumbnail} authorName={log.author}/>
                        </LogInfoLeftWrapper>
                        <LogInfoRightWrapper>{log.viewCount}</LogInfoRightWrapper>
                    </LogInfoWrapper>
                    <MDEditor.Markdown source={log.content} theme="light" />
                </>
            ) : (<p>Loading...</p>)

            }
        </LogDetailWrapper>
    );
}

export default LogDetail;