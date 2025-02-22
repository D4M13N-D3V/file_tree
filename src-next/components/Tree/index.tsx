"use client";

import React, {useEffect} from 'react';
import TreeNode from '../TreeNode';
import { invoke } from '@tauri-apps/api/tauri'

interface TreeNodeData {
  name: string;
  type: string;
  path: string;
  subfolders: number;
  size: number;
  files: number;
  children?: TreeNodeData[];
}

interface TreeProps {
  data: TreeNodeData[];
}

const Tree: React.FC<TreeProps> = ({ data }) => {
  const rootSize = data[0].size;


  useEffect(() => {
    invoke('load_folders')
        .then(() => console.log("Folders loaded"))
        .catch(console.error)
  }, [])

  return (
    <div className="tree">
      {data.map((node) => (
        <TreeNode key={node.path} node={node} rootSize={rootSize} />
      ))}
    </div>
  );
};

export default Tree;