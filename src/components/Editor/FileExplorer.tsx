"use client";
import React from "react";

import { FileNode } from "@/utils/types";
import Node from "./Node";

type Props = {
  nodes: FileNode[];
  onDrop: (fileId: string, folderId: string) => void;
};

const FileExplorer = ({ nodes, onDrop }: Props) => {
  // Rendering a tree structure of files and folders
  const renderNode = (node: FileNode, depth = 0): React.ReactNode => {
    return (
      <Node key={node.id} node={node} depth={depth} onDrop={onDrop}>
        {node.children?.map((child) => renderNode(child, depth + 1))}
      </Node>
    );
  };

  return (
    <div className="overflow-y-auto max-h-[400px]">
      {nodes.map((n) => renderNode(n))}
    </div>
  );
};

export default FileExplorer;
