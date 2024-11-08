import { Editor } from "@toast-ui/react-editor";
import '@toast-ui/editor/toastui-editor.css'

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";


export default function Demo() {
    return(
        <>
            <Editor height={"100%"}/>
        </>
    );
}