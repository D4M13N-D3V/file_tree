"use client";

import React, { useState } from 'react';

interface TreeNodeData {
  name: string;
  type: string;
  path: string;
  subfolders: number;
  size: number;
  files: number;
  children?: TreeNodeData[];
}

interface TreeNodeProps {
  node: TreeNodeData;
  rootSize: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, rootSize }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const percentage = (node.size / rootSize) * 100;

  return (
    <div className="treeNode">
      <div className="nodeHeader" onClick={toggleExpand}>
        <span className="nodeName">{node.name}</span>
                <span className="subfolderBadge">Subfolders: {node.subfolders}</span>
                <span className="fileBadge">Files: {node.files}</span>
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