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


interface SidebarProps {
  onCreate: (type: "file" | "folder",name: string) => void;
  files: { name: string; type: "file" | "folder" }[];
  onOpen: (fileName: string) => void;
}
const Sidebar = ({ onCreate, files , onOpen}: SidebarProps) => {

  //create an empty file
  const handleCreate = (type: "file" | "folder") => {
    const name = prompt(`Enter ${type} name`);
    if (!name) return;
  
    onCreate(type, name); // Pass type and name to parent
  };

  return (
    <aside className="w-64 bg-muted border-r h-full p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">📁 Project Files</h2>
      <ScrollArea className="flex-1 px-4">
        <FileExplorer files={files} onOpen={onOpen}/>
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
