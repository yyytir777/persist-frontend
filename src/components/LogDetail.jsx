import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import accessTokenReissueApi from "./api/AccessTokenReissueApi";
import ReactMarkdown from 'react-markdown';

const LogDetailWrapper = styled.div`
    width: 100%;
    min-height: 100%;
    padding: 0px 10%;
    padding-bottom: 100px;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
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
    padding: 20px 10%;
`;

const LogDetailContent = styled.p`
    padding: 20px 20px;
`;

export default function LogDetail({ setIsLogIn }) {
    const { id } = useParams();
    console.log(id);
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
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            console.log('response of /api/v1/log/{log_id} : ', response.data.result);
            setLog(response.data.result);
            
            if (response.data.code === 'T002') {
                await accessTokenReissueApi(setIsLogIn);
                fetchLog();
            } else if (response.data.code === 'T005') {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
            }
        } catch (error) {
            console.log(error.response);
        }
    }, [setIsLogIn, id]);

    useEffect(() => {
        fetchLog();

        console.log(log);
    }, [fetchLog]);

    return(
        <LogDetailWrapper>
            {log ? (
                <>
                    <LogDetailThumbnailWrapper>
                        <LogDetailThumbnail src={log.thumbnail} alt="thumbnail"/>
                    </LogDetailThumbnailWrapper>
                    <LogDetailTitle>{log.title}</LogDetailTitle>
                    <LogDetailContent>
                        <ReactMarkdown>{log.content}</ReactMarkdown>
                    </LogDetailContent>
                </>
            ) : (<p>Loading...</p>)

            }
        </LogDetailWrapper>
    );
}