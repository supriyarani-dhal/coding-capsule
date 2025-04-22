// components/Editor/Node.tsx
"use client";

import { useDrag, useDrop } from "react-dnd";
import { cn } from "@/lib/utils"; //for classname merging
import { FileNode } from "@/utils/types";
import { useRef } from "react";

type NodeProps = {
  node: FileNode;
  depth: number;
  onDrop: (fileId: string, folderId: string) => void;
  children?: React.ReactNode;
};

const Node = ({ node, depth, onDrop, children }: NodeProps) => {
  const ref = useRef<HTMLDivElement>(null);

  //this is a hook that makes an element (dragref: a ref callback i.e. atttached to the HTML element) draggable
  const [, drag] = useDrag({
    type: "file",
    item: { id: node.id },
    canDrag: node.type === "file",
  });

  const [, drop] = useDrop({
    accept: "file",
    drop: (item: { id: string }) => {
      if (node.type === "folder") {
        onDrop(item.id, node.id);
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={cn(
        "p-1 rounded hover:bg-muted cursor-pointer",
        node.type === "folder" && "font-bold"
      )}
      style={{ marginLeft: depth * 12 }}
    >
      {node.type === "folder" ? "📁" : "📄"} {node.name}
      {children}
    </div>
  );
};

export default Node;
