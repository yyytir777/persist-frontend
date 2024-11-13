import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import LogGrid from "../components/LogGrid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import accessTokenReissueApi from "../components/api/AccessTokenReissueApi";
import apiClient from "../components/api/AxiosInterceptor";

const HomeWrapper = styled.div`
    width: 100%;
    min-height: 100%;
    padding: 0px 10%;
    padding-bottom: 100px;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
`;

const MemberWrapper = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function MemberPage( {setIsLogIn} ) {
    const [logs, setLogs] = useState([]);
    const navigate = useNavigate();

    const fetchMemberId = async () => {
        const URL = localStorage.getItem('URL');
        const accessToken = localStorage.getItem('accessToken');

        if(!accessToken) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get(`${URL}/api/v1/token/memberId`, {
                headers: {
                    Accept: '*/*',
                    Authorization: `Bearer ${accessToken}`,
                    'Content-type': 'application/json'
                    }
            });
            return response;
        } catch(error) {
            console.log(error.reponse);
        }
    }

    const fetchLogs = useCallback(async () => {
        const URL = localStorage.getItem('URL');
        const accessToken = localStorage.getItem('accessToken');
        const memberId = fetchMemberId()?.data.result;

        if(!accessToken) {
            console.log('accessToken is not defined');
            return;
        }

        try {
            const response = await apiClient.get(`${URL}/api/v1/member/${memberId}`);

            console.log('response of /api/v1/log/member/{member_id}', response.data);
            setLogs(Array.isArray(response.data.result) ? response.data.result : []);
            
            if (response.data.code === 'T002') {
                await accessTokenReissueApi(setIsLogIn);
                fetchLogs();
            } else if (response.data.code === 'T005') {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
            }
        } catch(error) {
            console.log(error.response);
        }
    }, [setIsLogIn]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    return(
        <HomeWrapper>
            <MemberWrapper>
            </MemberWrapper>
            <LogGrid logs={logs}/>
        </HomeWrapper>
    );
}