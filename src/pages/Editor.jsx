import MDEditor, { commands } from "@uiw/react-md-editor";

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logSave from "../components/api/log/LogSaveApi";

const EditorWrapper = styled.div`
    min-height: 100%;
    padding: 30px;
    padding-bottom: 120px;

    .w-md-editor {
        box-shadow: none;
        display: flex;
        flex-direction: column;
    }

    // content가 남은 공간 차지하도록
    .w-md-editor-content {
        flex-grow: 1;
    }

    .w-md-editor-bar {
        display :none;
    }

    .w-md-editor-toolbar li > button {
        height: 36px;
        width: 36px;
    }

    .w-md-editor-toolbar li > button > svg {
        height: 24px;
        width: 24px;
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

const ButtonWrapper = styled.div`

`;

export default function Editor() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [mode, setMode] = useState('live');
    const [isFullScreen, setIsFullScrenn] = useState(false);
    const editorRef = useRef();
    const hiddenButtonRef = useRef();
    const navigate = useNavigate();

    const customCodeEdit = {
        ...commands.codeEdit,
        buttonProps: { 
            "title": 'Code Edit',
            "aria-label": "Code Edit", 
            "className": "Code Edit" 
        },
        execute: (state, api) => {
            setMode('edit');
            commands.codeEdit.execute(state, api);
        }
    }
    
    const customCodeLive = {
        ...commands.codeLive,
        buttonProps: { 
            "title": 'Code Live',
            "aria-label": "Code Live", 
            "className": "Code Live" 
        },
        execute: (state, api) => {
            setMode('live');
            commands.codeLive.execute(state, api);
        }
    }
    
    const customCodePreview = {
        ...commands.codePreview,
        buttonProps: { 
            "title": 'Code Preview',
            "aria-label": "Code Preview", 
            "className": "Code Preview" 
        },
        execute: (state, api) => {
            setMode('preview');
            commands.codePreview.execute(state, api);
        }
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleLogSave = async () => {
        console.log("title : ", title);
        console.log("content : ", content);
        const thumbnail = "string";
        
        if (!title) {
            alert("제목을 입력하세요");
            return;
        }
        else if (!content) {
            alert("내용을 입력하세요");
            return;
        }

        try {
            const logId = await logSave(title, thumbnail, content);
            console.log('logId : ', logId);
            if(logId) navigate(`/logs/${logId}`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Escape' && editorRef.current) {
            console.log('blurred');
            hiddenButtonRef.current.focus();
        }
    }

    useEffect(() => {
        // content height 조절 위한 속성 -> height을 '' 처리해야함
        // const editor = document.querySelector('.wmde-markdown-var.w-md-editor.w-md-editor-show-live');


        const editor_text = document.querySelector('.w-md-editor-text');
        if (editor_text) {
            editor_text.style.minHeight = '300px';
        }

        /*
        alt + f => 전체화면
        ctrl + alt + 방향키 => 모드 전환
        */
        const handleKeyDown = (e) => {
            if(e.altKey && e.key === 'f') {
                e.preventDefault();
                setIsFullScrenn((prev) => !prev);
            }

            if(e.ctrlKey && e.altKey) {
                switch(e.key) {
                    case 'ArrowLeft':
                        console.log('e.key :', e.key, 'mode :', mode)
                        if (mode === 'live') setMode('edit');
                        else if (mode === 'preview') setMode('live');
                        break;
                    case 'ArrowRight':
                        console.log('e.key :', e.key, 'mode :', mode)
                        if (mode === 'live') setMode('preview');
                        else if (mode === 'edit') setMode('live');
                        break;
                    default:
                        break;
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [mode]);
    
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
                value={content}
                onChange={setContent}
                height={'526px'}
                previewOptions={{
                    allowedElements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'span', 'br', 'img', 'ul', 'li', 'ol', 'code', 'pre', 'hr'],
                }}
                fullscreen={isFullScreen}
                preview={mode}
                onKeyDown={handleKeyDown}
                extraCommands={[customCodeEdit, customCodeLive, customCodePreview, commands.fullscreen]}
            />
            <button ref={hiddenButtonRef} style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}></button>
            <ButtonWrapper>
                <button onClick={handleLogSave}>Save</button>
            </ButtonWrapper>
        </EditorWrapper>
    );  
}