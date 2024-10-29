import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../css/Home.css';
import LogCard from '../components/LogCard';


export default function Home() {

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlhdCI6MTczMDE4NjQ0OCwiZXhwIjoxNzMwMTkyNDQ4LCJtZW1iZXJJZCI6ImY5MjhmZjVjLTNhYjEtNDUxNy1iMDUwLTY0YTQwYmUwMDY0NCIsImVtYWlsIjoieXl5dGlyNzc3QGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIn0.fCvtCQiOfV5N0y7GueY2kdxIqWXpIeyC6UN-SikQ5Wo';
    const [logs, setLogs] = useState([]);
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };
    
    const search = () => {
        
    };
    
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
            <div className="MainWrapper">
                <div className="SearchBarWrapper">
                    <div className="SearchBar">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={query}
                            onChange={handleInputChange}/>
                        <button onClick={search}>Search</button>
                    </div>
                </div>
                <div className="LogGrid">
                    {
                        logs.map((log) => (
                            <LogCard key={log.id} {...log} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}