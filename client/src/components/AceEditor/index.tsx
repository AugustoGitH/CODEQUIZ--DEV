import React, {useEffect, useRef, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";



import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";

import { AceEditorStyled } from "./styles";
import { ITechnology } from "../../interfaces/Quiz";

interface IPropsCodeEditor {
  maxLines?: number;
  preValue?: string;
  fontSize?: "small" | "normal";
  disabled?: boolean;
  mode?: ITechnology;
  finallyType?: () => void;
  onChange?: (value: string) => void;
  reset?: boolean;
  typing?: boolean;
}

export default function CodeEditor({
  maxLines = 30,
  preValue,
  fontSize = "normal",
  disabled = false,
  mode = "javascript",
  finallyType,
  onChange,
  reset,
  typing = true,
}: IPropsCodeEditor) {

  const [codeValue, setCodeValue] = useState("");
  const [isTypingEffectExecuted, setIsTypingEffectExecuted] = useState(false);
  const refEditor = useRef<null | AceEditor>(null);
  const [modeEditor, setModeEditor] = useState<ITechnology>(mode);



  const typingEffect = (valueTyping: string) => {
    valueTyping.split("").forEach((letter, index) => {
      setTimeout(() => {
        setCodeValue((prevCode) => (!prevCode ? letter : prevCode + letter));
        if (index === valueTyping.length - 1 && finallyType) {
          finallyType();
        }
      }, index * 60);
    });
  };

  useEffect(() => {
    setModeEditor(mode);
  }, [mode]);

  useEffect(() => {
    if (reset) {
      setCodeValue("");
    }
  }, [reset]);

  useEffect(() => {
    if (preValue && !isTypingEffectExecuted && typing) {
      typingEffect(preValue);
      setIsTypingEffectExecuted(true);
    }
    if (preValue && !typing) {
      setCodeValue(preValue);
    }
  }, [preValue]);


  useEffect(() => {
    if (onChange) {
      onChange(codeValue);
    }
    if (refEditor.current && preValue) {
      refEditor.current.editor.moveCursorToPosition({
        row: refEditor.current.editor.session.getLength(),
        column: refEditor.current.editor.session.getLine(
          refEditor.current.editor.session.getLength() - 1
        ).length,
      });
    }
  }, [codeValue]);

  return (
    <AceEditorStyled>
      <header>
        <div className="circle-decoration"></div>
        <div className="circle-decoration"></div>
        <div className="circle-decoration"></div>
      </header>
      <div className={`ace-editor-area ${preValue ? "ace-not_bracket" : ""}`}>
        <AceEditor
          ref={refEditor}
          style={{
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          mode={modeEditor}
          theme="dracula"
          name="editor"
          readOnly={disabled}
          editorProps={{ $blockScrolling: true }}
          fontSize={fontSize === "normal" ? 13 : 12}
          onChange={setCodeValue}
          value={codeValue}
          highlightActiveLine={true}
          maxLines={maxLines}
          wrapEnabled={true}
          setOptions={{
            printMargin: false,
            highlightGutterLine: true,
            useWorker: false,
            showFoldWidgets: false,
            
          }}
        />
      </div>
    </AceEditorStyled>
  );
}
