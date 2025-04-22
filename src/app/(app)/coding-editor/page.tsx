"use client";

import { useState } from "react";
import MonacoEditor from "@/components/Editor/MonacoEditor";

import Sidebar from "@/components/Editor/Sidebar";
import Toolbar from "@/components/Editor/Toolbar";
import LiveCursor from "@/components/Editor/LiveCursor";
import { RoomProvider } from "@/liveblocks.config";

export default function CodingEditorPage() {
  const [code, setCode] = useState("// Start coding here...");

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
    </RoomProvider>
  );
}
