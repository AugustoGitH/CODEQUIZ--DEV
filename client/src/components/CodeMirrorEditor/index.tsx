import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript'
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';

import { EditorView, keymap } from "@codemirror/view";

import { dracula } from '@uiw/codemirror-theme-dracula';

import * as S from "./styles"
import { ITechnology } from '../../interfaces/IQuiz';

interface ICodeMirrorEditor{
    preValue?: string,
    onChange?: (value: string, langMode: ITechnology)=> void,
    lang?: ITechnology,
    reset?: boolean,
    readOnly?: boolean
    maxLines?: number,
    fieldSelectLang?: boolean
}


export default function CodeMirrorEditor({
    preValue, 
    onChange, 
    lang = "javascript", 
    reset, readOnly = false, 
    maxLines = 12,
    fieldSelectLang
}: ICodeMirrorEditor){

    const [codeValue, setCodeValue] = useState("")
    const [langMode, setLangMode] = useState<ITechnology>(lang)

    const codemirrorRef = useRef(null)
    useEffect(()=>{
        if(preValue){
            setCodeValue(preValue)
        }
    }, [preValue])

    useEffect(()=>{
        setLangMode(lang)
    }, [lang])

    useEffect(()=>{
        if(onChange){
            onChange(codeValue, langMode)
        }
    }, [codeValue])

    useEffect(()=>{
        if(reset){
            setCodeValue("")
        }
    }, [reset])

    const handleChange = (value: string)=>{
        const valueTrated = value.split("\n").filter(Boolean).join("\n")
        setCodeValue(valueTrated)
    }


    const propsActionMarked = (lang: ITechnology)=>({
        onClick: ()=> setLangMode(lang),
        className: langMode === lang ? `marked-lang` : ""
    })

    return (
        <S.EditorCode readOnly={readOnly}>
            <header>
                <ul>
                    <li className="circle-decoration"/>
                    <li className="circle-decoration"/>
                    <li className="circle-decoration"/>
                </ul>
                {
                    fieldSelectLang && (
                        <nav>
                            <button {...propsActionMarked("javascript")}>
                                JavaScript
                            </button>
                            <button {...propsActionMarked("css")}>
                                CSS3
                            </button>
                            <button {...propsActionMarked("html")}>
                                HTML5
                            </button>
                        </nav>
                    )
                }
            </header>
            <div className={`ace-editor-area`}>
                <CodeMirror
                    ref={codemirrorRef}
                    value={codeValue}
                    width='100%'
                    height="100%"
                    
                    extensions={[
                        ...[ 
                            langMode === "javascript" ? javascript({jsx: true}) : 
                            langMode === "css" ? css() :
                            langMode === "html" ? html() : []
                        ],
                        keymap.of([]),
                        EditorView.editable.of(!readOnly),
                        EditorView.lineWrapping,
                        
                    ]}
                    theme={dracula}
                    onChange={handleChange}
                    readOnly={readOnly}
                    editable={!readOnly}
                    basicSetup={{
                        foldGutter: !readOnly,
                        dropCursor: false,
                        allowMultipleSelections: false,
                        highlightActiveLine: !readOnly,
                        highlightActiveLineGutter: !readOnly,
                    }}
                    
                    
                />
            </div>
        </S.EditorCode>
    )
}