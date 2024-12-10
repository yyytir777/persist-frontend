import React, { useRef, useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import styled from "styled-components";
import '../css/Editor.css';

const EditorWrapper = styled.div`
    min-height: 100%;
    padding: 20px 30px;

    ::-webkit-scrollbar-track {
        background-color: white;
    }

    .w-md-editor {
        box-shadow: none;
    }

    .w-md-editor-content {
        min-height: 100%;
        height: auto;
        overflow: hidden;
    }

    .w-md-editor-toolbar {

    }

    .w-md-editor-bar {
        display: none;
    }

    .w-md-editor-toolbar li > button {
        height: 36px;
        width: 36px;
        color: black;
    }

    .w-md-editor-toolbar li > button > svg {
        height: 18px;
        width: 18px;
    }

    .wmde-markdown {
        color: black;
    }

    .wmde-markdown pre {
        background-color: whitesmoke;
    }

    .wmde-markdown hr {
        height: 0px;
    }
    .w-md-editor-text {
        height: 100%;
    }

    @media(width: 600px) {
        w-md-editor-preview {
            display: none;
        }
    }
`;

const InputTitle = styled.input`
    width: 100%;
    font-size: 36px;
    margin-bottom: 10px;
    border: none;
    outline: none;

    &:focus {
        border: none;
        outline: none;
    }
`;


export default function ReactEditor() {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const editorRef = useRef();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const getContent = () => {
        console.log("title : ", title);
        console.log("value : ", value);
    }

    return(
        <EditorWrapper data-color-mode="light">
            <InputTitle 
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={handleTitleChange}
            />

            <MDEditor
                ref={editorRef}
                value={value}
                onChange={setValue}
                height={'600px'}
                onBlur={() => console.log('aasdf')}
                visibleDragbar={false}
                previewOptions={{
                    allowedElements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'span', 'br', 'img', 'ul', 'li', 'ol', 'code', 'pre', 'hr'],
                }}
            />
            <button onClick={getContent}>click!</button>
        </EditorWrapper>
    );
}