import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../css/Home.css';
import LogCard from '../components/LogCard';
import SearchBar from '../components/SearchBar';


export default function Home() {

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlhdCI6MTczMDI2OTE2NSwiZXhwIjoxNzMwMjc1MTY1LCJtZW1iZXJJZCI6ImY5MjhmZjVjLTNhYjEtNDUxNy1iMDUwLTY0YTQwYmUwMDY0NCIsImVtYWlsIjoieXl5dGlyNzc3QGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIn0.sC6kftyF_no1mZaqpLnkSrTOFVPOqV1oN7d0eqzt_78';
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
            } catch (error) {
                console.log('Failed to fetch logs : ', error);
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