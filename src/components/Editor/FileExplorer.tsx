"use client";
import React from "react";


type Props = {
  files: { name: string; type: "file" | "folder" }[];
  onOpen: (fileName: string) => void;
};

const FileExplorer = ({ files,onOpen }: Props) => {
  // Rendering a tree structure of files and folders
  // const renderNode = (node: FileNode, depth = 0): React.ReactNode => {
  //   return (
  //     <Node key={node.id} node={node} depth={depth} onDrop={onDrop}>
  //       {node.children?.map((child) => renderNode(child, depth + 1))}
  //     </Node>
  //   );
  // };

  return (
    <div className="space-y-2">
      {files.map((item, index) => (
        <div
          key={index}
          className="cursor-pointer hover:underline"
          onClick={() => item.type === "file" && onOpen(item.name)}
        >
          {item.type === "file" ? `📄 ${item.name}` : `📁 ${item.name}`}
        </div>
      ))}
    </div>
  );
};

export default FileExplorer;
