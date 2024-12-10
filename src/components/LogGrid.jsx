import React from "react";
import styled from "styled-components";
import LogCard from "./LogCard";

const Grid = styled.div`
    padding:30px 0px;
    display: grid;
    grid-template-columns: repeat(var(--card-count),calc(var(--width) - (32px * var(--spacer) / var(--card-count)))); /* 고정된 너비 */
    gap: 35px 20px; /* 카드 사이의 간격 */
    --card-count: 4;
    --width: 25%;
    --spacer: calc(var(--card-count) - 1);

    @media screen and (max-width : 1440px) {
        --card-count: 4;
        --width: 25%;
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