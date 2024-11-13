import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import Author from "./Author";
import apiClient from "./api/AxiosInterceptor";
import defaultImage from "../img/default_image.png"


const LogDetailWrapper = styled.div`
    margin: 0px auto;
    width: 1000px;
    min-height: 100%;
    padding: auto;
    padding-bottom: 200px;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    @media (max-width: 1000px) {
        width: auto;
    }

    .wmde-markdown {
        padding: 0px 16px;
    }

    .wmde-markdown p img {
        display: block;
        margin: 0 auto;
    }

    .wmde-markdown hr {
        height: 0em;
    }
`;

const LogDetailThumbnailWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const LogDetailThumbnail = styled.img`
    width: 32%;
    object-fit: cover;
    object-position: center;
`;

const LogDetailTitle = styled.h1`
    font-size: 48px;
    padding: 20px 16px;
`;

const LogInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 16px;
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
            const response = await apiClient.get(`http://localhost:8080/api/v1/log/${id}`);
            console.log('response of /api/v1/log/{log_id} : ', response.data.result);
            setLog(response.data.result);
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
                        <LogDetailThumbnail src={log.thumbnail ? log.thumbnail : defaultImage} alt="thumbnail"/>
                    </LogDetailThumbnailWrapper>
                    <LogDetailTitle>{log.title}</LogDetailTitle>
                    <LogInfoWrapper>
                        <LogInfoLeftWrapper>
                            <Author authorThumbnail={log.authorThumbnail} authorName={log.author}/>
                        </LogInfoLeftWrapper>
                        <LogInfoRightWrapper>{log.viewCount} viewed</LogInfoRightWrapper>
                    </LogInfoWrapper>
                    <MDEditor.Markdown source={log.content} theme="light" />
                </>
            ) : (<p>Loading...</p>)

            }
        </LogDetailWrapper>
    );
}

export default LogDetail;