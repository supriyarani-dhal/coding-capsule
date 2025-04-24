"use client";

import { SetStateAction, useState } from "react";
import MonacoEditor from "@/components/Editor/MonacoEditor";
import Sidebar from "@/components/Editor/Sidebar";
import Toolbar from "@/components/Editor/Toolbar";
import LiveCursor from "@/components/Editor/LiveCursor";
import { RoomProvider } from "@/liveblocks.config";
import OutputConsole from "@/components/Editor/OutputConsole";
import axios from "axios";

export default function CodingEditorPage() {
  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");

  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput("");
    setError("");

    try {
      const response = await axios.post("/api/execute", {
        code,
        language: { language },
      });
      const data = response.data;

      if (data) {
        setOutput(data.output);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error: " + err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  //todo: get roomId from URL or project settings
  // Room ID (can be dynamic based on project or URL slug)
  const roomId = "coding-room-1";

  // Memoize user info for RoomProvider
  // const userInfo = useMemo(() => {
  //   return {
  //     name: user?.fullName || "Anonymous",
  //     avatar:
  //       user?.imageUrl ||
  //       `https://api.dicebear.com/7.x/personas/svg?seed=${user?.id}`,
  //   };
  // }, [user]);

  return (
    <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar onCreate={() => console.log("Create")} />

        {/* Main area */}
        <div className="flex flex-col flex-1">
          {/* Toolbar */}
          <Toolbar
            language={language}
            onLanguageChange={(lang: SetStateAction<string>) =>
              setLanguage(lang)
            }
            onRun={runCode}
            onSave={() => console.log("Save")}
            onPushToGitHub={() => console.log("Push")}
            onVoiceMode={() => console.log("Voice")}
          />

          {/* Code Editor */}
          <div className="relative flex-1">
            <MonacoEditor
              code={code}
              language={language}
              onChange={(newCode) => setCode(newCode)}
            />
            <LiveCursor />
          </div>

          {/* Output */}
          <OutputConsole output={output} error={error} loading={loading} />
        </div>
      </div>
    </RoomProvider>
  );
}
