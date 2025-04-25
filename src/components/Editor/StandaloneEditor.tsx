"use client";

import { Editor } from "@monaco-editor/react";
import { useCallback, useRef } from "react";

interface Props {
  code: string;
  language: string;
  onChange: (code: string) => void;
}

const StandaloneEditor = ({ code, language, onChange }: Props) => {
  const editorRef = useRef();
  
  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      onChange(value || "");
    },
    [onChange]
  );

const onMount = (editor: unknown) => {
  editorRef.current = editor;
  editor?.focus();
}

  return (
    <Editor
      height="100%"
      width="100%"
      theme="vs-dark"
      language={language}
      value={code}
      onChange={handleEditorChange}
      options={{
        tabSize: 2,
        fontSize: 14,
        minimap: { enabled: false },
      }}
      onMount={onMount}
    />
  );
};

export default StandaloneEditor;
