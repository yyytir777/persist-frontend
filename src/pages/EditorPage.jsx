import { Editor } from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from "styled-components";

const EditorWrapper = styled.div`
    min-height: 100%;
    padding: 10%;
`;

export default function EditorPage() {

    return(
        <EditorWrapper>
            <Editor />
        </EditorWrapper>
    );
} 