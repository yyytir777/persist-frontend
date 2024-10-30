import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../css/NotFoundPage.css';

const NotFoundWrapper = styled.div`
    height: 100%;
    padding-bottom: 100px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function NotFoundPage() {
    return (
        <NotFoundWrapper>
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/">Go back to Home</Link>
        </NotFoundWrapper>
    );
}

export default NotFoundPage;
