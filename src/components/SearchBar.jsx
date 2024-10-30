import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/components/SearchBar.css';

export default function SearchBar() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleButtonClick = () => {
        navigate(`/search?query=${query}`);
    }

    return(
        <div className="SearchBar">
            <input />
            <button type="text" onClick={handleButtonClick} value={query} onChange={(e) => setQuery(e.target.value)}>
                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968282.png" alt="button"/>
            </button>
        </div>
    );
}