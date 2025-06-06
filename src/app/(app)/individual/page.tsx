"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Editor/Sidebar";
import Toolbar from "@/components/Editor/Toolbar";
import StandaloneEditor from "@/components/Editor/StandaloneEditor";
import OutputConsole from "@/components/Editor/OutputConsole";
import { languageSnippets } from "@/utils/Language";
import { getExtension } from "@/helper/extension";
import { useFiles } from "@/app/hooks/useFile";
import { useFolders } from "@/app/hooks/useFolder";
import axios from "axios";

export default function Page() {
  const { user } = useUser();
  const pathname = usePathname();

  const projectType = pathname.includes("collaborative")
    ? "collaborative"
    : "individual";
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<{
    _id: string;
    name: string;
    extension: string;
    language: string;
    content: string;
  } | null>(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(languageSnippets["javascript"] || "");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [creating, setCreating] = useState(false);

  // Fetch files/folders based on createdBy and projectType
  const { files, fetchFiles } = useFiles({
    userId: user?.id,
    projectType: selectedFolderId ? undefined : projectType,
    folderId: selectedFolderId || undefined,
  });

  const { folders, folderLoading, fetchFolders } = useFolders({
    userId: user?.id,
    projectType: selectedFolderId ? undefined : projectType,
    parentFolderId: selectedFolderId || undefined,
  });

  if (!user) return null;

  const runCode = async () => {
    setLoading(true);
    setOutput("");
    setError("");
    try {
      const response = await axios.post("/api/execute", { code, language });
      const data = response.data;
      if (data.output) setOutput(data.output);
      else setError(data.error || "Something went wrong.");
    } catch (err: unknown) {
      if (err instanceof Error) setError("Error: " + err.message);
      else setError("An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setCode(languageSnippets[newLang] || "");
  };

  // When user clicks a file in Sidebar:
  const handleOpenFile = async (fileId: string) => {
    try {
      const { data } = await axios.get("/api/files", {
        params: { id: fileId },
      });
      setSelectedFile(data);
      setCode(data.content);
      setLanguage(data.language);
    } catch (err) {
      console.error("Failed to load file:", err);
      alert("Failed to load file.");
    }
  };
  const handleSavingFile = async () => {
    if (!selectedFile) {
      alert("Select a file first!");
      return;
    }

    const ext = getExtension(language);
    if (ext !== selectedFile.extension) {
      alert(
        `You chose language “${language}” but the file extension is “.${selectedFile.extension}”.\nPlease switch your language.`
      );
      return;
    }

    try {
      await axios.put("/api/files", {
        fileId: selectedFile._id,
        content: code,
        language,
      });
      alert("File saved!");
      // optionally refresh sidebar contents:
      fetchFiles();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Save failed.");
    }
  };
  const handleCreate = async (type: "file" | "folder") => {
    try {
      setCreating(true);
      const name = prompt(`Enter ${type === "file" ? "file" : "folder"} name`);
      if (!name) {
        alert("Name cannot be empty!");
        return;
      }

      if (type === "file") {
        const extension = getExtension(language);
        await axios.post("/api/files", {
          name,
          folderId: selectedFolderId || undefined,
          content: code,
          language: language, // Optional: default language
          extension,
          createdBy: selectedFolderId ? undefined : user?.id,
          projectType: selectedFolderId ? undefined : projectType,
        });
      } else if (type === "folder") {
        await axios.post("/api/folders", {
          name,
          parentFolderId: selectedFolderId || undefined,
          createdBy: selectedFolderId ? undefined : user?.id,
          projectType: selectedFolderId ? undefined : projectType,
        });
      }

      // After creation, refresh sidebar
      fetchFiles();
      fetchFolders();

      alert(`${type === "file" ? "File" : "Folder"} created successfully!`);
    } catch (error) {
      console.error("Creation error:", error);
      alert("Something went wrong during creation.");
    } finally {
      setCreating(false); // Stop loading
    }
  };

  const handleSelectFolder = (folderId: string | null) => {
    setSelectedFolderId(folderId);
  };

  const handleSelectItem = (itemId: string | null) => {
    setSelectedItemId(itemId);
  };

  const handleDelete = async () => {
    if (!selectedItemId) return;

    const confirmed = confirm(
      "Are you sure you want to delete this file/folder?"
    );
    if (!confirmed) return;

    try {
      setDeleting(true);
      await axios.delete(`/api/delete/${selectedItemId}`);
      alert("Deleted successfully!");
      fetchFiles(); // Refetch files after delete
      setSelectedItemId(null); //clear selection
    } catch (error) {
      console.error(error);
      alert("Failed to delete!");
    } finally {
      setDeleting(false); // Stop loading
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0e0e0e]">
      {/* Sidebar */}
      <Sidebar
        onCreate={handleCreate}
        ondelete={handleDelete}
        files={files}
        folders={folders}
        onOpenFile={handleOpenFile}
        onSelectItem={handleSelectItem}
        selectedItemId={selectedItemId}
        onSelectFolder={handleSelectFolder}
        selectedFolderId={selectedFolderId}
        deleting={deleting}
        creating={creating}
        folderLoading={folderLoading}
      />

      {/* Main Area */}
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

        {/* Editor */}
        <StandaloneEditor
          code={code}
          language={language}
          onChange={(newCode) => setCode(newCode)}
        />

        {/* Output Console */}
        <OutputConsole output={output} error={error} loading={loading} />
      </div>
    </div>
  );
}
