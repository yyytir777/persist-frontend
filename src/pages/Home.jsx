import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import SearchBar from '../components/SearchBar';
import LogGrid from "../components/LogGrid";
import apiClient from "../components/api/AxiosInterceptor";

const HomeWrapper = styled.div`
    min-height: 100%;
    margin-left: auto;
    margin-right: auto;

    padding-bottom: 100px;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 1536px) {
        width: 1352px;
    }

    @media screen and (max-width: 1376px) {
        width: 1024px;
    }
    
    @media screen and (max-width: 1024px) {
        width: 90%;
    }
`;

const SearchBarWrapper = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Home() {
    const [logs, setLogs] = useState([]);

    const fetchLogs = useCallback(async () => {
        try {
            const response = await apiClient.get('/api/v1/log/all');
            console.log(response.data);
            setLogs(Array.isArray(response.data.result) ? response.data.result : []);
        } catch (error) {
            console.log(error.data);
        }
    }, []); // setIsLogIn이 변경될 때만 새로 생성

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
