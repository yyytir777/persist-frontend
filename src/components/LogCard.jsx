import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Author from "./Author";
import defaultImage from "../img/default_image.png"

const LogCardWrapper = styled.div`
    width: 100%;
    height: 400px;
    background-color: whitesmoke;
    border-radius: 2%;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease; /* 부드러운 이동 효과 */

    &:hover {
        box-shadow: 0 8px 16px rgba(0, 0.05, 0.05, 0.05); /* 그림자 강도를 높여 강조 */
        transform: translateY(-5px); /* 위로 살짝 이동 */
    }
`;

const Upper = styled.div`
    padding: 10px 5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(215, 215, 215);
`;

const LogDate = styled.div``;

const LogCardImage = styled.img`
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 200px;
`;

const Title = styled.div`
    padding: 10px 5%;
    height: auto;
    font-size: large;
    border-top: 1px solid rgb(215, 215, 215);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Preview = styled.div`
    padding: 10px 5%;
    flex: 1;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    text-overflow: ellipsis;
`;

const LogCard = ({ log }) => {
    const navigate = useNavigate();

    const handleLog = (id) => {
        navigate(`/logs/${id}`);
    }

    return(
        <LogCardWrapper onClick={() => handleLog(log.id)}>
            <Upper>
                <Author authorThumbnail={log.authorThumbnail} authorName={log.name}/>
                <LogDate>{log.createdDate}</LogDate>
            </Upper>


            <LogCardImage src={log.thumbnail ? log.thumbnail : defaultImage} alt="logThumbnail" />
            <Title>{log.title}</Title>
            <Preview>{log.preview}</Preview>
        </LogCardWrapper>
    );
}

export default LogCard;