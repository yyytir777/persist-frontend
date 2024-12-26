import MDEditor, { commands } from "@uiw/react-md-editor";

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import uploadImage from "../components/api/s3/UploadImage";
import InputThumbnail from "../components/editor/InputThumbnail";
import saveLogApi from "../components/api/log/SaveLogApi";

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

    .wmde-markdown hr {
        height: 0px;
    }
`;

const InputThumbnailWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
`;


const InputTitle = styled.input`
    width: 100%;
    font-size: 36px;
    margin: 10px;
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
    const [thumbnail, setThumbnail] = useState('');
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

    const customCommandTitle = {
        ...commands.group([commands.title1, commands.title2, commands.title3, commands.title4, commands.title5, commands.title6], {
            name: 'title',
            groupName: 'title',
            buttonProps: {'aria-label': 'Insert title'}
        })
    }

    const handleTitleChange = (event) => {
        event.preventDefault();
        setTitle(event.target.value);
    }

    const handleSaveLog = async () => {
        console.log("title : ", title);
        console.log("thumbnail : ", thumbnail);
        console.log("content : ", content);

        if (!title) {
            alert("제목을 입력하세요");
            return;
        }
        else if (!content) {
            alert("내용을 입력하세요");
            return;
        }

        try {
            const logId = await saveLogApi(title, thumbnail, content);
            console.log('logId : ', logId);
            if(logId) navigate(`/logs/${logId}`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleKeyDown = (e) => {
        e.preventDefault();
        if(e.key === 'Escape' && editorRef.current) {
            console.log('blurred');
            hiddenButtonRef.current.focus();
        }
    }

    const handleImageDrop = async (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
    
        if (files && files.length > 0) {
            const file = files[0];
    
            if (file.type.startsWith('image/')) {
                const imageUrl = await uploadImage(file);
    
                const editorTextArea = editorRef.current?.textarea;
                if (editorTextArea) {
                    const cursorPosition = editorTextArea.selectionStart;
                    const newContent = 
                        content.slice(0, cursorPosition) + 
                        `![${file.name}](${imageUrl})` + 
                        content.slice(cursorPosition);
    
                    setContent(newContent);
    
                    // 이미지 삽입 후 커서 위치 조정
                    setTimeout(() => {
                        const newCursorPosition = cursorPosition + `![${file.name}](${imageUrl})`.length;
                        editorTextArea.selectionStart = newCursorPosition;
                        editorTextArea.selectionEnd = newCursorPosition;
                        editorTextArea.focus();
                    }, 0);
                }
            }
        }
    };

    const handleImagePaste = async (event) => {
        console.log('paste image');
        const items = event.clipboardData.items;
        for (const item of items) {
            if(item.type.startsWith('image/')) {
                event.preventDefault();
                const file = item.getAsFile();

                if(file) {
                    try {
                        const imageUrl = await uploadImage(file);
                        setContent((content) => `${content}\n\n![pasted image](${imageUrl})`);
                    } catch (error) {
                        console.error('image upload failed', error);
                    }
                }
            }
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
            <InputThumbnailWrapper>
                <InputThumbnail thumbnail={thumbnail} setThumbnail={setThumbnail}/>
            </InputThumbnailWrapper>

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
                    allowedElements: [
                        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
                        'p', 'a', 'span', 'br', 'img', 
                        'ul', 'li', 'ol', 'code', 'pre', 
                        'hr', 'em', 'strong', 'del', 
                        'blockquote', 'table', 'tr', 'td', 'th', 'thead', 'tbody'
                    ]
                }}
                fullscreen={isFullScreen}
                preview={mode}
                onKeyDown={handleKeyDown}

                commands={[commands.bold, commands.italic, commands.strikethrough, customCommandTitle, commands.divider,
                    commands.quote, commands.code, commands.codeBlock, commands.comment, commands.table, commands.divider,
                    commands.unorderedListCommand, commands.orderedListCommand, commands.checkedListCommand, 
                    commands.help]}

                extraCommands={[customCodeEdit, customCodeLive, customCodePreview, commands.fullscreen]}
                
                onDrop={handleImageDrop}
                onDragOver={(e) => e.preventDefault()}

                onPaste={handleImagePaste}
            />
            <button ref={hiddenButtonRef} style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}></button>
            <ButtonWrapper>
                <button onClick={handleSaveLog}>게시하기</button>
            </ButtonWrapper>
        </EditorWrapper>
    );  
}