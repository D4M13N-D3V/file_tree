"use client";

import React, { useEffect } from "react";
import TreeNode from "../TreeNode";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

interface TreeNodeData {
  name: string;
  path: string;
  type: "folder" | "file"; // Specific values for 'type'
  totalSize: number;
  subfolderCount: number;
  fileCount: number;
  children?: TreeNodeData[];
}

interface TreeProps {
  data: TreeNodeData[];
}

const Tree: React.FC<TreeProps> = () => {
  const [rootNode, setRootNode] = React.useState<TreeNodeData | null>(null);

  // Helper function to recursively render TreeNodeData
  const renderTreeNode = (node: TreeNodeData, rootSize: number) => {
    return (
        <TreeNode key={node.path} node={node} rootSize={rootSize}>
          {node.children &&
              node.children.map((child) => renderTreeNode(child, rootSize))}
        </TreeNode>
    );
  };

  const countTotalSizeFolderChildren = (root: TreeNodeData): number => {
    let size = 0;

    if (root.children && root.children.length > 0) {
      for (const child of root.children) {
        if (child.type === "folder") {
          size += child.totalSize;
        }
      }
    }

    return size;
  };

  useEffect(() => {
    listen<any>("folders-loaded", (event) => {
      setRootNode(event.payload);
    });

    setInterval(async () => {
      invoke("load_folders")
          .then(() => console.log("Folders loaded"))
          .catch(console.error);
    }, 5000);
  }, []);

  if (!rootNode) {
    return <div>Loading...</div>;
  }

  const rootSize = countTotalSizeFolderChildren(rootNode);

  return (
      <div className="tree">
        {renderTreeNode(rootNode, rootSize)}
      </div>
  );
};

export default Tree;