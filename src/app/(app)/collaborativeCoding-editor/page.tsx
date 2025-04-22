"use client";

import { SetStateAction, useState } from "react";
import MonacoEditor from "@/components/Editor/MonacoEditor";
import Sidebar from "@/components/Editor/Sidebar";
import Toolbar from "@/components/Editor/Toolbar";
import LiveCursor from "@/components/Editor/LiveCursor";
import { RoomProvider } from "@/liveblocks.config";
import { languageMap } from "@/utils/Language";
import OutputConsole from "@/components/Editor/OutputConsole";

export default function CodingEditorPage() {
  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");
  
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    const langId = languageMap[language];
    setLoading(true)
    setOutput("")
    setError("")

    try{
    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "YOUR_RAPID_API_KEY",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: langId,
        stdin: "",
      }),
    });

    const { token } = await response.json();

    // Poll for result
    const checkResult = async () => {
      const res = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`, {
        headers: {
          "X-RapidAPI-Key": "YOUR_RAPID_API_KEY",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      });

      const result = await res.json();

      if (result.status?.id <= 2) {
        setTimeout(checkResult, 1000); // keep polling
      } else {
        setLoading(false);
        if (result.stderr) setError(result.stderr);
        else if (result.compile_output) setError(result.compile_output);
        else setOutput(result.stdout || "");
      }
    };

    checkResult();
  } catch (err) {
    setLoading(false);
    setError("Something went wrong while executing the code.");
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
            onLanguageChange={(lang: SetStateAction<string>) => setLanguage(lang)}
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
        </div>
      </div>
    </RoomProvider>
  );
}
