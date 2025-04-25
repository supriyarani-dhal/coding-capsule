"use client";

import { SetStateAction, useState } from "react";
//import MonacoEditor from "@/components/Editor/MonacoEditor";
import Sidebar from "@/components/Editor/Sidebar";
import Toolbar from "@/components/Editor/Toolbar";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import OutputConsole from "@/components/Editor/OutputConsole";
import { languageSnippets } from "@/utils/Language";

//import dynamic from "next/dynamic";
import StandaloneEditor from "@/components/Editor/StandaloneEditor";
import { saveFile } from "@/utils/saveFile";
import { getExtension } from "@/helper/extension";

// Dynamically import Monaco Editor with SSR disabled because  the Monaco Editor (or related y-monaco) is trying to access window on the server side, but window only exists in the browser.

//Since you're using Next.js, components like Monaco must be dynamically imported on the client side only, using next/dynamic with { ssr: false }.
// const MonacoEditor = dynamic(() => import("@/components/Editor/MonacoEditor"), {
//   ssr: false,
//   loading: () => <div className="text-white p-4">Loading editor...</div>,
// });
export default function Page() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(languageSnippets[language] || "//start coding here");
  const [files, setFiles] = useState<{ name: string; type: "file" | "folder" }[]>([]);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // useEffect(() => {
  //   const saved = localStorage.getItem("solo-code");
  //   if (saved) setCode(saved);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("solo-code", code);
  // }, [code]);

  const { user } = useUser();
  if (!user) return null;
  const runCode = async () => {
    setLoading(true);
    setOutput("");
    setError("");

    try {
      const response = await axios.post("/api/execute", {
        code,
        language,
      });
      const data = response.data;
      console.log(data);
      

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

  const handleLanguageChange = (lang: SetStateAction<string>) => {
    const newLang = typeof lang === 'function' ? lang(language) : lang;
    setLanguage(newLang);
    setCode(languageSnippets[newLang] || "");
  }

  //save the file into local storage
  const handleSavingFile = () =>{
    const fileName = prompt("Enter file name") || "untitled";
    saveFile(`${fileName}.${getExtension(language)}`, code)
  }

  //create an empty file
  const handleCreate = (type: "file" | "folder", name: string) => {
    setFiles((prev) => [...prev, { name, type }]);
  };

  //open a file
  const handleOpenFile = (name: string) => {
    //todo load saved content from IndexedDB/localStorage if you want
    setCode(`// Editing ${name}\n`);
  };

  
  return (
    <div className="flex h-screen overflow-hidden bg-[#0e0e0e]">
      {/* Sidebar */}
      <Sidebar onCreate={handleCreate} files={files} onOpen={handleOpenFile}/>

      {/* Main area */}
      <div className="flex flex-col flex-1">
        {/* Toolbar */}
        <Toolbar
          language={language}
          onLanguageChange={handleLanguageChange}
          onRun={runCode}
          onSave={handleSavingFile}
          onPushToGitHub={() => console.log("Push")}
          onVoiceMode={() => console.log("Voice")}
        />

        {/* Code Editor */}
          <StandaloneEditor
            code={code}
            language={language}
            onChange={(newCode) => setCode(newCode)}
          />

        {/* Output */}
        <OutputConsole output={output} error={error} loading={loading} />
      </div>
    </div>
  );
}
