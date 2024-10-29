import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../css/Home.css';
import LogCard from '../components/LogCard';


export default function Home() {

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlhdCI6MTczMDIwNTY5NiwiZXhwIjoxNzMwMjExNjk2LCJtZW1iZXJJZCI6IjI5ZjYxYjlhLWQ1ZTQtNGFmMi1hMGQ0LWJlMWNlMzNlYzYzNyIsImVtYWlsIjoieXl5dGlyNzc3QGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIn0.VDogEc0HTaTxMlbVGeIhx3T2Vqg7286KL8Wi_jCZho4';
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
    );
}