"use client";

import { useState } from "react";
import MonacoEditor from "@/components/Editor/MonacoEditor";
import Sidebar from "@/components/Editor/Sidebar";
import Toolbar from "@/components/Editor/Toolbar";
import LiveCursor from "@/components/Editor/LiveCursor";

export default function CodingEditorPage() {
  const [code, setCode] = useState("// Start coding here...");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar onCreate={() => console.log("Create")} />

      {/* Main area */}
      <div className="flex flex-col flex-1">
        {/* Toolbar */}
        <Toolbar
          language={"javascript"}
          onRun={() => console.log("Run")}
          onSave={() => console.log("Save")}
          onPushToGitHub={() => console.log("Push")}
          onVoiceMode={() => console.log("Voice")}
        />

        {/* Code Editor */}
        <div className="relative flex-1">
          <MonacoEditor
            code={code}
            language={"javascript"}
            onChange={(newCode) => setCode(newCode)}
          />
          <LiveCursor />
        </div>
      </div>
    </div>
  );
}
