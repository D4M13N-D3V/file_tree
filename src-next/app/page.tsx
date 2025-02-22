import React from 'react';
import Tree from 'components/Tree';
import rawData from '../data.json';

interface TreeNodeData {
  name: string;
  type: string;
  path: string;
  subfolders: number;
  size: number;
  files: number;
  children?: TreeNodeData[];
}

const addFilesToData = (data: any): TreeNodeData[] => {
  return data.map((node: any) => {
    const files = 1; // Assuming each folder has 1 file
    return {
      ...node,
      files: files,
      children: node.children ? addFilesToData(node.children) : [],
    };
  });
};

const data = addFilesToData(rawData);

export default function Index() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: "#222" }}>
      <Tree data={data} />
    </div>
  );
}
