import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import Author from "./Author";
import apiClient from "./api/AxiosInterceptor";

const LogDetailWrapper = styled.div`
    margin: 0px auto;
    width: 1000px;
    min-height: 100%;
    padding: 0px 10%;

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
    max-height: 350px;
    object-fit: cover;
    object-position: center;
`;

const LogDetailTitle = styled.h1`
    padding: 20px 20px;
`;

const LogDetailSubWrapper = styled.div`
    padding: 20px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const LogDetailLeftWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`;

const LogDetailRightWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const LogDetailAuthor = styled.div``;

const LogDetailAuthorThumbnail = styled.img`
    height: 30px;
    width: 30px;
`;


const LogDetailViewCount = styled.div``;

const LogDetailDate = styled.div``;

const LogDetailContent = styled.p`
    padding: 20px 0px;
`;

const LogInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 40px;
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