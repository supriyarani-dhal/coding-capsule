"use client";

import { SetStateAction, useState } from "react";
//import MonacoEditor from "@/components/Editor/MonacoEditor";
import Sidebar from "@/components/Editor/Sidebar";
import Toolbar from "@/components/Editor/Toolbar";
import LiveCursor from "@/components/Editor/LiveCursor";
import { RoomProvider } from "@liveblocks/react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import OutputConsole from "@/components/Editor/OutputConsole";

import dynamic from "next/dynamic";

// Dynamically import Monaco Editor with SSR disabled because  the Monaco Editor (or related y-monaco) is trying to access window on the server side, but window only exists in the browser.

//Since you're using Next.js, components like Monaco must be dynamically imported on the client side only, using next/dynamic with { ssr: false }.
const MonacoEditor = dynamic(() => import("@/components/Editor/MonacoEditor"), {
  ssr: false,
  loading: () => <div className="text-white p-4">Loading editor...</div>,
});
export default function Page() {
  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");

  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  if (!user) return null;

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

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ cursor: null }}
      initialStorage={{}}
    >
      <div className="flex h-screen overflow-hidden bg-[#0e0e0e] text-white">
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
              language="javascript"
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
