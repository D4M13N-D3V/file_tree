"use client";

import React, { useState } from 'react';

interface TreeNodeData {
    name: string;
    path: string;
    type: "folder" | "file"; // Specific values for 'type'
    totalSize: number;
    subfolderCount: number;
    fileCount: number;
    children?: TreeNodeData[];
}

interface TreeNodeProps {
  node: TreeNodeData;
  rootSize: number;
}

function beautifyBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const readableSize = (bytes / Math.pow(1024, i)).toFixed(2);

    return `${readableSize} ${sizes[i]}`;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, rootSize }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const percentage = (node.totalSize / rootSize) * 100;

  return (
    <div className="treeNode">

      <div className="nodeHeader" onClick={toggleExpand}>
                  <span className="nodePath">{node.path}</span>
                    <span className="subfolderBadge">Subfolders: {node.subfolderCount}</span>
                    <span className="fileBadge">Files: {node.fileCount}</span>
                    <span className="fileBadge">Size: {beautifyBytes(node.totalSize)}</span>
                    </div>
              <div className="progressBarContainer">
                <div
                  className={`progressBar ${percentage > 70 ? 'red' : percentage > 40 ? 'yellow' : ''}`}
                  style={{ width: `${percentage}%` }}
                >
                </div>
      </div>
      {isExpanded && node.children && (
        <div className="children">
          {node.children.map((child) => (
            <TreeNode key={child.path} node={child} rootSize={rootSize} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;