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
        --md-editor-background-color: white;
        --md-editor-text-color: black;
        box-shadow: none;
    }

    .w-md-editor-content {
        color: black;
    }

    .w-md-editor-toolbar {
        background-color: var(--md-editor-background-color);

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
        background-color: var(--md-editor-background-color);
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
        <EditorWrapper>
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
                theme="light"
            />
            <button onClick={getContent}>click!</button>
        </EditorWrapper>
    );
}