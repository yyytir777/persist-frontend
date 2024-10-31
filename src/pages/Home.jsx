import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../css/Home.css';
import LogCard from '../components/LogCard';
import SearchBar from '../components/SearchBar';
import accessTokenReissueApi from "../components/api/AccessTokenReissueApi";


export default function Home() {

    const token = localStorage.getItem('accessToken');
    const [logs, setLogs] = useState([]);
    
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/log/', {
                    headers: {
                        'accept': '*/*',
                        'Authorization' : `Bearer ${token}`,
                        'Content-Type' : 'application/json'
                    }
                });
                console.log(response.data);
                setLogs(response.data.result);

                if(response.data.code === 'T002') {
                    console.log("accessToken Expired");
                    accessTokenReissueApi();

                } else if(response.data.code === 'T005') {
                    console.log("refreshToken Expired");
                }
            } catch (error) {
                console.log('Failed to fetch logs : ', error);
            }
        };

        fetchLogs();
    }, [token]);
    
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