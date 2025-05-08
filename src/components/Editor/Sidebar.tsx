"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Folder from "./Folder";
import { IFile } from "@/app/models/File.model";
import { IFolder } from "@/app/models/Folder.model";
import { FilePlus, FolderPlus, Loader2, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
  creating: boolean;
  folderLoading: boolean;
}
const Sidebar = ({
  onCreate,
  ondelete,
  files,
  folders,
  onOpenFile,
  onSelectItem,
  selectedItemId,
  onSelectFolder,
  selectedFolderId,
  deleting,
  creating,
  folderLoading,
}: SidebarProps) => {
  const handleFileselect = (fileId: string) => {
    onOpenFile(fileId);
    onSelectItem(fileId);
  };

  return (
    <aside className="w-48 bg-muted border-r h-full p-4 flex flex-col">
      <div className="flex items-center justify-around mb-4">
        <Button
          onClick={() => onCreate("file")}
          variant="outline"
          className=" text-sm">
          {creating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FilePlus />
          )}
        </Button>
        <Button
          onClick={() => onCreate("folder")}
          variant="outline"
          className=" text-sm">
          {creating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FolderPlus />
          )}
        </Button>
        <Button
          onClick={() => ondelete()}
          variant="destructive"
          className=" text-sm"
          disabled={!selectedItemId || deleting}>
          {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 />}
        </Button>
      </div>

      <Separator className="mb-2" />

      <h2 className="text-lg font-semibold mb-4">📁 Project Files</h2>
      <ScrollArea className="flex-1 px-4">
        {folderLoading ? (
          <div className="space-y-2 items-center">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ) : folders.length === 0 && files.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-10 text-gray-500 px-4">
            <div className="text-4xl mb-2">🚀</div>
            <p className="text-lg font-semibold">Hey 🙋‍♀️ Developer!</p>
            <p className="text-sm">
              It&apos;s looking a bit empty. Start building something awesome —
              create your first folder or file now!
            </p>
          </div>
        ) : (
          <>
            {folders.map((folder) => (
              <Folder
                key={folder._id}
                folder={folder}
                onSelectFolder={onSelectFolder}
                selectedFolderId={selectedFolderId}
                onSelectItem={onSelectItem}
                selectedItemId={selectedItemId}
                onOpen={onOpenFile}
                handleFileselect={handleFileselect}
              />
            ))}

            {files.map((file) => (
              <div
                key={file._id}
                className="pl-4 py-1 cursor-pointer hover:bg-gray-100 rounded"
                onClick={() => handleFileselect(file._id)}>
                📄 {file.name}
              </div>
            ))}
          </>
        )}
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
