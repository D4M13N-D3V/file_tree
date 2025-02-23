"use client"

import React, {useEffect} from 'react';
import TreeNode from '../TreeNode';
import {  } from "@tauri-apps/api";
import {invoke} from "@tauri-apps/api/core";
import { listen } from '@tauri-apps/api/event';


interface TreeNodeData {
  name: string;
  path: string;
  type: "folder" | "file"; // Enforce specific values for 'type'
  totalSize: number;
  subfolderCount: number;
  fileCount: number;
  children?: TreeNodeData[];
}


interface TreeProps {
  data: TreeNodeData[];
}


const Tree: React.FC<TreeProps> = () => {
  const [folders, setFolders] = React.useState<TreeNodeData>();

  function countTotalFolderChildren(root: TreeNodeData): number {
    let count = 0;

    if (root.children && root.children.length > 0) {
      for (const child of root.children) {
        if (child.type === 'folder') {
          count += child.subfolderCount + countTotalFolderChildren(child);
        }
      }
    }

    return count;
  }

  useEffect(() => {
    listen<any>('folders-loaded', (event) => {
      setFolders(event.payload)
    });

    setInterval(async () => {
      invoke('load_folders')
          .then(() => console.log("Folders loaded"))
          .catch(console.error)
    }, 5000)
  }, [])

  return (
    <div className="tree">
      {folders.map((node) => (
        <TreeNode key={node.path} node={node} rootSize={countTotalFolderChildren(folders)} />
      ))}
    </div>
  );
};

export default Tree;