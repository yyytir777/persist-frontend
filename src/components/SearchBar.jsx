import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchBarContainer = styled.div`
    width: 60%;
    height: 50px;
    background-color: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const StyledInput = styled.input`
    width: 100%; /* 원하는 너비 */
    height: 100%; /* 부모 컨테이너 높이에 맞춤 */
    border: none;
    outline: none;
    padding: 0 10px;
    font-size: 16px;
`;

const StyledButton = styled.button`
    width: 50px;
    height: 50px;
    background: none;
    border: none;
    cursor: pointer;
`;

const SearchBarButtonImg = styled.img`
    width: 50px;
    height: 50px;
`;

export default function SearchBar() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleButtonClick = () => {
        navigate(`/search?query=${query}`);
    };

    return (
        <SearchBarContainer>
            <StyledInput
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <StyledButton onClick={handleButtonClick}>
                <SearchBarButtonImg src="https://cdn-icons-png.flaticon.com/512/5968/5968282.png" alt="button" />
            </StyledButton>
        </SearchBarContainer>
    );
}
