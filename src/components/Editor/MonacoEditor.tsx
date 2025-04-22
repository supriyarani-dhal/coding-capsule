"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Y from "yjs";
import { getYjsProviderForRoom } from "@liveblocks/yjs";
import { useRoom } from "@/liveblocks.config";
import { useCallback, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import { Awareness } from "y-protocols/awareness";

interface Props {
  code: string;
  language: string;
  onChange: (code: string) => void;
}

// const MonacoEditor = ({ code, language, onChange }: Props) => {
//   const editorRef = useRef<MonacoEditorType.IStandaloneCodeEditor | null>(null);
//   const [_, updateMyPresence] = useMyPresence();
//   const room = useRoom();
//   const yProvider = getYjsProviderForRoom(room);

//   const handleMount = useCallback(
//     (editor: MonacoEditorType.IStandaloneCodeEditor) => {
//       editorRef.current = editor;

//       const model = editor.getModel();
//       const yDoc = yProvider.getYDoc();
//       const yText = yDoc.getText("monaco");

//       // Yjs & Monaco binding for collaboration
//       new MonacoBinding(
//         yText,
//         model!,
//         new Set([editor]),
//         yProvider.awareness as Awareness
//       );

//       // Track mouse move and update cursor position
//       const onMouseMove = (e: MouseEvent) => {
//         const rect = editor.getDomNode()?.getBoundingClientRect();
//         if (!rect) return;

//         updateMyPresence({
//           cursor: {
//             x: e.clientX - rect.left,
//             y: e.clientY - rect.top,
//           },
//         });
//       };

//       // Add mouse move listener inside the editor
//       const domNode = editor.getDomNode();
//       domNode?.addEventListener("mousemove", onMouseMove);

//       // Clean up
//       return () => {
//         domNode?.removeEventListener("mousemove", onMouseMove);
//       };
//     },
//     [updateMyPresence, yProvider]
//   );

//   return (
//     <Editor
//       onMount={handleMount}
//       defaultLanguage={language}
//       value={code}
//       onChange={(value) => onChange(value || "")}
//       height="100%"
//       theme="vs-dark"
//       options={{
//         tabSize: 2,
//         fontSize: 14,
//         minimap: { enabled: false },
//       }}
//     />
//   );
// };

// Collaborative text editor with simple rich text, live cursors, and live avatars
const MonacoEditor = ({ code, language, onChange }: Props) => {
  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();
  const room = useRoom();
  const yProvider = getYjsProviderForRoom(room);

  // Set up Liveblocks Yjs provider and attach Monaco editor
  useEffect(() => {
    let binding: MonacoBinding;

    if (editorRef) {
      const yDoc = yProvider.getYDoc();
      const yText = yDoc.getText("monaco");

      // Attach Yjs to Monaco
      binding = new MonacoBinding(
        yText,
        editorRef.getModel() as editor.ITextModel,
        new Set([editorRef]),
        yProvider.awareness as unknown as Awareness
      );
    }

    return () => {
      binding?.destroy();
    };
  }, [editorRef, room]);

  const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
    setEditorRef(e);
  }, []);

  return (
    <Editor
      onMount={handleOnMount}
      height="100vh"
      width="100hw"
      theme="vs-light"
      defaultLanguage={language}
      value={code}
      onChange={(value) => onChange(value || "")}
      defaultValue=""
      options={{
        tabSize: 2,
        fontSize: 14,
        minimap: { enabled: false },
      }}
    />
  );
};
export default MonacoEditor;
