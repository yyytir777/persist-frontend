import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";

const ReadmeWrapper = styled.div`
    width: 100%;
    min-height: 100%;
    padding: 30px;
    padding-bottom: 120px;

    .w-md-editor {
        box-shadow: none;
        display: flex;
        flex-direction: column;
    }

`;

const Readme = ({ content }) => {
    return(
    <ReadmeWrapper data-color-mode="light">
        <MDEditor.Markdown source={content} />
    </ReadmeWrapper>
    );
}

export default Readme;