"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import FileExplorer from "./FileExplorer";
import { useState } from "react";
import { FileNode } from "@/utils/types"; // Define this type for files/folders
import { v4 as uuid } from "uuid";

interface SidebarProps {
  onCreate: (type: "file" | "folder") => void;
}
const Sidebar = ({ onCreate }: SidebarProps) => {
  // Define the initial state for the file tree
  const [fileTree, setFileTree] = useState<FileNode[]>([
    {
      id: "1",
      name: "index.js",
      type: "file",
    },
    {
      id: "2",
      name: "src",
      type: "folder",
      children: [
        {
          id: "3",
          name: "app.js",
          type: "file",
        },
      ],
    },
  ]);

  //Move file into a folder
  const handleDrop = (fileId: string, folderId: string) => {
    const newTree = moveFile(fileTree, fileId, folderId);
    setFileTree(newTree);
  };

  // Create file or folder
  const handleCreate = (type: "file" | "folder") => {
    const newNode: FileNode = {
      id: uuid(),
      name: type === "file" ? "newFile.js" : "newFolder",
      type,
      children: type === "folder" ? [] : undefined,
    };
    setFileTree((prev) => [...prev, newNode]);
    onCreate?.(type);
  };

  return (
    <aside className="w-64 bg-muted border-r h-full p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">📁 Project Files</h2>
      <ScrollArea className="flex-1 px-4">
        <FileExplorer nodes={fileTree} onDrop={handleDrop} />
      </ScrollArea>
      <Separator className="mt-4" />

      <div className="p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">➕ Add</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Create</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleCreate("file")}>
                📄 New File
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreate("folder")}>
                📁 New Folder
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export default Sidebar;
