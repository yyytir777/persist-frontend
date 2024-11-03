import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import accessTokenReissueApi from "../components/api/AccessTokenReissueApi";
import LogGrid from "../components/LogGrid";

const HomeWrapper = styled.div`
    width: 100%;
    min-height: 100%;
    padding: 0px 10%;
    padding-bottom: 100px;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
`;

const SearchBarWrapper = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Home({ setIsLogIn }) {
    const [logs, setLogs] = useState([]);

    const fetchLogs = useCallback(async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            console.log('accessToken is not defined');
            return;
        }

        try {
            const response = await axios.get('http://43.203.89.62:8080/api/v1/log/all', {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('response of /api/v1/log/all : ', response.data);
            setLogs(Array.isArray(response.data.result) ? response.data.result : []);

            if (response.data.code === 'T002') {
                await accessTokenReissueApi(setIsLogIn);
                fetchLogs();
            } else if (response.data.code === 'T005') {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
            }
        } catch (error) {
            console.log(error.response);
        }
    }, [setIsLogIn]); // setIsLogIn이 변경될 때만 새로 생성

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]); // fetchLogs를 의존성 배열에 추가
    
    return(
        <HomeWrapper>
            <SearchBarWrapper>
                <SearchBar></SearchBar>
            </SearchBarWrapper>
            <LogGrid logs={logs}/>
        </HomeWrapper>
    );
}
