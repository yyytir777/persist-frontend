import styled from "styled-components";

const ReadmeWrapper = styled.div`
    width: 100%;
    min-height: 100px;
`;

const ReadmeContent = styled.div`
`;

const Readme = ({ content }) => {
    return(
    <ReadmeWrapper>
        <p>readme</p>
        <ReadmeContent content={content} />
    </ReadmeWrapper>
    );
}

export default Readme;