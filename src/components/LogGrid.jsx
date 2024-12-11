import React from "react";
import styled from "styled-components";
import LogCard from "./LogCard";

/*
(너비 - (간격개수 * 간격 너비)) / 카드 개수
*/
const Grid = styled.div`
    padding:30px 0px;
    display: grid;

    --card-count: 4;
    --width: 25%;
    --spacer: calc(var(--card-count) - 1);
    
    grid-template-columns: repeat(var(--card-count), calc(var(--width) - (24px * var(--spacer)) / var(--card-count))); /* 고정된 너비 */
    gap: 24px; /* 카드 사이의 간격 */
    

    @media screen and (max-width: 1536px) {
        --card-count: 4;
        --width: 25%;
    }

    @media screen and (max-width: 1360px) {
        --card-count: 3;
        --width: 33.33%;
    }

    @media screen and (max-width: 1024px) {
        --card-count: 2;
        --width: 50%;
    }

    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(1, 100%);
        --card-count: 1;
        --width: 100%;
    }
`;

const LogGrid = ({ logs }) => {

    return(
        <Grid>
            {logs?.map((log) => <LogCard key={log.id} log={log} />)}
        </Grid>
    );
}

export default LogGrid;