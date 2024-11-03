import React from "react";
import styled from "styled-components";
import LogCard from "./LogCard";

const Grid = styled.div`
    padding:30px 0px;
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* 고정된 너비 */
    gap: 35px 20px; /* 카드 사이의 간격 */
    justify-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

const LogGrid = ({ logs }) => {

    return(
        <Grid>
            {logs?.map((log) => <LogCard key={log.id} {...log} />)}
        </Grid>
    );
}

export default LogGrid;