import { Editor } from "@toast-ui/react-editor";
import '@toast-ui/editor/toastui-editor.css'

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";

const EditorWrapper = styled.div`
    min-height: 100%;
    padding: 2%;
    border: none;
    overflow: visible;

    .toastui-editor-defaultUI {
        border: none;
    }

    // toolbar (상위)
    .toastui-editor-toolbar {
        order: 2 !important;
    }

    // toolbar (하위)
    .toastui-editor-defaultUI-toolbar {
        border: none;
        background-color: white;
        padding: 0px;
    }

    // main (상위)
    .toastui-editor-main {
        min-height: 512px;
        order: 3 !important;
    }

    // main (하위)
    .toastui-editor-md-container {
        border: none;
    }

    // edit main
    .ProseMirror {
        padding: 0px 20px;
        height: 100%;
    }

    // preview main
    .toastui-editor-md-preview {
        padding: 0px 20px;
    }


    // switch mode
    .toastui-editor-mode-switch {
        display: flex !important;
        justify-content: flex-start;
        order: 1 !important;
        border: none;
        gap: 10px;
        height: auto;
    }

    .tab-item .active {
        margin: 0px;
        padding: 4px;
        width: auto;
        border: 1px solid whitesmoke;
        font-size: 20px;
        border-radius: none;
        height: 36px;
    }

    .toastui-editor-mode-switch .tab-item {
        border-radius: 0;
    }

    .toastui-editor-mode-switch .tab-item.active {
        border: 1px solid whitesmoke;
    }

    @media (max-width: 1000px) {
        .toastui-editor-md-preview {
            display: none;
        }

        .toastui-editor-md-splitter {
            display: none !important;
        }

        .toastui-editor-main .toastui-editor-md-vertical-style .toastui-editor {
            width: 100%;
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

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
`;

/*
Editor : markdown, WYSIWYG편집기
write과 preview를 동시에
사진을 복사 or 드래그하면 S3에 업로드하고 해당 url을 반환
*/
export default function EditorPage() {
    const editorRef = useRef();
    const [title, setTitle] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    
    const handleSaveContent = () => {
        const markdownContent = editorRef.current.getInstance().getMarkdown();
        console.log("title : ", title);
        console.log("content : ", markdownContent);
    }

    const handleEscKey = (event) => {
        console.log(event.key);
        if(event.key === 'Escape') {
            editorRef.current.getInstance().blur();
        }
    }

    useEffect(() => {
        const editorInstance = editorRef.current.getInstance();
        editorInstance.setMarkdown('');
    }, []);
    
    return(
        <EditorWrapper>
            <InputTitle 
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={handleTitleChange}
            />
            <Editor
                initialEditType="markdown"
                previewStyle= 'vertical'
                placeholder= '여기에 입력하세요'
                ref={editorRef}
                usageStatistics={false}
                useCommandShortcut={false}
                onChange={() => console.log('Content changed')}
                toolbarItems={[
                    ['heading', 'bold', 'italic', 'strike',
                    'hr', 'quote',
                    'ul', 'ol', 'task',
                    'table',
                    'code', 'codeblock']
                ]}
                onKeydown={handleEscKey}
                plugins={[colorSyntax]}
                height={"100%"}
            />
            <ButtonWrapper>
                <button onClick={handleSaveContent}>Export As Markdown</button>
                <button onClick={handleSaveContent}>Export As Html</button>
            </ButtonWrapper>
        </EditorWrapper>
    );
}