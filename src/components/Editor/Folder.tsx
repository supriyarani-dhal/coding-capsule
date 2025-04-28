import { useFiles } from "@/app/hooks/useFile";
import { useFolders } from "@/app/hooks/useFolder";
import { useState } from "react";

interface FolderProps {
  folder: {
    _id: string;
    name: string;
  };
  onSelectFolder: (folderId: string | null) => void;
  onSelectItem: (ItemId: string | null) => void;
  selectedFolderId: string | null;
  selectedItemId: string | null;
  onOpen?: (fileId: string) => void;
  handleFileselect: (fileId: string) => void;
}

const Folder = ({ folder, onSelectFolder,onSelectItem, selectedFolderId, selectedItemId, onOpen , handleFileselect}: FolderProps) => {
  const [expanded, setExpanded] = useState(false);

  const { files } = useFiles({ folderId: folder._id });
  const { folders } = useFolders({ parentFolderId: folder._id });

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
    onSelectFolder(folder._id);
  };

  return (
    <div className="pl-2">
      <div
        onClick={toggleExpand}
        className={`flex items-center justify-between cursor-pointer p-1 hover:bg-gray-200 rounded ${
          selectedFolderId === folder._id ? "bg-gray-300" : ""
        }`}
      >
        <span>{expanded ? "📂" : "📁"} {folder.name}</span>
      </div>

      {expanded && (
        <div className="pl-4">
          {folders.map((childFolder) => (
            <Folder
              key={childFolder._id}
            folder={childFolder}
            onSelectFolder={onSelectFolder}
            selectedFolderId={selectedFolderId}
            onSelectItem = {onSelectItem}
            selectedItemId={selectedItemId}
            onOpen={onOpen}
            />
          ))}
          {files.map((file) => (
            <div
              key={file._id}
              className="py-1 cursor-pointer hover:bg-gray-100 rounded"
              onClick={() =>handleFileselect(file._id)}
            >
              📄 {file.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
