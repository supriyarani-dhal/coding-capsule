"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Folder from "./Folder";
import { IFile } from "@/app/models/File.model";
import { IFolder } from "@/app/models/Folder.model";
import {FilePlus, FolderPlus, Loader2, Trash2 } from "lucide-react";

interface SidebarProps {
  onCreate: (type: "file" | "folder") => void;
  ondelete: () => void;
  files: IFile[]; 
  folders: IFolder[];
  onOpenFile: (fileId: string) => void;
  onSelectItem: (itemId: string | null) => void;
  selectedItemId: string | null;
  onSelectFolder: (folderId: string | null) => void;
  selectedFolderId: string | null;
  deleting: boolean;
}
const Sidebar = ({onCreate,
  ondelete,
  onOpenFile,
  files,
  folders,
  onSelectItem,
  selectedItemId,
  onSelectFolder,
  selectedFolderId,
  deleting,
}: SidebarProps) => {

  const handleFileselect = (fileId: string) => {
    onOpenFile(fileId)
    onSelectItem(fileId)
  }

  return (
    <aside className="w-48 bg-muted border-r h-full p-4 flex flex-col">
      <div className="flex items-center justify-around mb-4">
      <Button onClick={() => onCreate("file")} variant="outline" className=" text-sm">
      <FilePlus/>
        </Button>
        <Button onClick={() => onCreate("folder")} variant="outline" className=" text-sm">
        <FolderPlus />
        </Button>
        <Button onClick={() => ondelete()} variant="destructive" className=" text-sm" disabled={!selectedItemId || deleting}>
        {deleting ? (
    <Loader2 className="h-4 w-4 animate-spin" />
  ) : (
    <Trash2/>
  )}
        
        </Button>
      </div>

      <Separator className="mb-2" />

      <h2 className="text-lg font-semibold mb-4">📁 Project Files</h2>
      <ScrollArea className="flex-1 px-4">
      {folders.map((folder) => (
          <Folder
            key={folder._id}
            folder={folder}
            onSelectFolder={onSelectFolder}
            selectedFolderId={selectedFolderId}
            onSelectItem = {onSelectItem}
            selectedItemId={selectedItemId}
            onOpen={onOpenFile}
            handleFileselect={handleFileselect}
          />
        ))}

        {files.map((file) => (
          <div
            key={file._id}
            className="pl-4 py-1 cursor-pointer hover:bg-gray-100 rounded"
            onClick={() =>handleFileselect(file._id)}
          >
            📄 {file.name}
          </div>
        ))}
      </ScrollArea>
      
    </aside>
  );
};

export default Sidebar;
