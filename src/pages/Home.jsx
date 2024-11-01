import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../css/Home.css';
import LogCard from '../components/LogCard';
import SearchBar from '../components/SearchBar';
import accessTokenReissueApi from "../components/api/AccessTokenReissueApi";


export default function Home() {
    const [logs, setLogs] = useState([]);
    
    useEffect(() => {
        const fetchLogs = async () => {
        const token = localStorage.getItem('accessToken');

            try {
                const response = await axios.get('http://localhost:8080/api/v1/log/all', {
                    headers: {
                        'accept': '*/*',
                        'Authorization' : `Bearer ${token}`,
                        'Content-Type' : 'application/json'
                    }
                });
                
                console.log('response of /api/v1/log/all : ', response.data);
                setLogs(Array.isArray(response.data.result) ? response.data.result : []);

                if (response.data.code === 'T002') {
                    await accessTokenReissueApi();
                    fetchLogs();
                } else if (response.data.code === 'T005') {
                    localStorage.removeItem('accessToken');
                    window.location.href = '/login';
                }
            } catch (error) {
                console.log(error.response);
            }
        };

        fetchLogs();
    }, []);
    
    return(
        <div className="Home">
            <div className="SearchBarWrapper">
                <SearchBar></SearchBar>
            </div>

            <div className="LogGrid">
                {
                    logs.map((log) => (
                        <LogCard key={log.id} {...log} />
                    ))
                }
            </div>
        </div>
    );
}