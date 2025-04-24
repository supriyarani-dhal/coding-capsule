"use client";

import { SetStateAction, useEffect, useState } from "react";
//import MonacoEditor from "@/components/Editor/MonacoEditor";
import Sidebar from "@/components/Editor/Sidebar";
import Toolbar from "@/components/Editor/Toolbar";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import OutputConsole from "@/components/Editor/OutputConsole";

//import dynamic from "next/dynamic";
import StandaloneEditor from "@/components/Editor/StandaloneEditor";

// Dynamically import Monaco Editor with SSR disabled because  the Monaco Editor (or related y-monaco) is trying to access window on the server side, but window only exists in the browser.

//Since you're using Next.js, components like Monaco must be dynamically imported on the client side only, using next/dynamic with { ssr: false }.
// const MonacoEditor = dynamic(() => import("@/components/Editor/MonacoEditor"), {
//   ssr: false,
//   loading: () => <div className="text-white p-4">Loading editor...</div>,
// });
export default function Page() {
  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");

  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    const saved = localStorage.getItem("solo-code");
    if (saved) setCode(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("solo-code", code);
  }, [code]);

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

  return (
    <div className="flex h-screen overflow-hidden bg-[#0e0e0e]">
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
          <StandaloneEditor
            code={code}
            language="javascript"
            onChange={(newCode) => setCode(newCode)}
          />
        </div>

        {/* Output */}
        <OutputConsole output={output} error={error} loading={loading} />
      </div>
    </div>
  );
}
