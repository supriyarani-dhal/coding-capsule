"use client";

import { Editor } from "@monaco-editor/react";
import { useCallback } from "react";

interface Props {
  code: string;
  language: string;
  onChange: (code: string) => void;
}

const StandaloneEditor = ({ code, language, onChange }: Props) => {
  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      onChange(value || "");
    },
    [onChange]
  );

  return (
    <Editor
      height="100vh"
      width="100%"
      theme="vs-dark"
      defaultLanguage={language}
      value={code}
      onChange={handleEditorChange}
      options={{
        tabSize: 2,
        fontSize: 14,
        minimap: { enabled: false },
      }}
    />
  );
};

export default StandaloneEditor;
