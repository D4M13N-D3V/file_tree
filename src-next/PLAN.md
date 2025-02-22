# Folder Explorer Tree View Implementation Plan

## 1. Project Setup
*   The project is already a Next.js project.

## 2. Data Generation
*   Create a JSON file (`data.json`) containing the fake data for the folder structure, subfolder counts, folder sizes, and folder paths.
*   The data should be nested to simulate a realistic file system.
*   The data should only contain folders.
*   Example data structure:

```json
[
  {
    "name": "Root Folder",
    "type": "folder",
    "path": "/",
    "subfolders": 3,
    "size": 1000000, // in bytes
    "children": [
      {
        "name": "Subfolder 1",
        "type": "folder",
        "path": "/Subfolder 1",
        "subfolders": 2,
        "size": 500000,
        "children": [
          {
            "name": "Subfolder 1.1",
            "type": "folder",
            "path": "/Subfolder 1/Subfolder 1.1",
            "subfolders": 0,
            "size": 100000
          },
          {
            "name": "Subfolder 1.2",
            "type": "folder",
            "path": "/Subfolder 1/Subfolder 1.2",
            "subfolders": 0,
            "size": 200000
          }
        ]
      }
    ]
  }
]
```

## 3. Component Structure
*   Create a `Tree` component (`components/Tree/index.tsx`) to render the entire tree view.
*   Create a `TreeNode` component (`components/TreeNode/index.tsx`) to represent each folder node in the tree.
    *   This component will be responsible for rendering the folder name, badges, and progress bar.

## 4. Badge Implementation
*   Within the `TreeNode` component, implement the subfolder count badge.
*   Use a distinct, visually contrasting color for the badge.
*   Display the badge next to the folder name.

## 5. Progress Bar Implementation
*   Implement the storage space progress bar within the `TreeNode` component.
*   Calculate the percentage of storage space occupied by the folder and its contents relative to the root folder's total storage capacity.
*   Use a visually appealing progress bar style.

## 6. Responsiveness and Styling
*   Use CSS Modules (`components/TreeNode/style.css`, `components/Tree/style.css`) to style the components.
*   Ensure the interface is responsive and visually appealing on different screen sizes.

## 7. Interactivity
*   Add interactivity to the tree view, such as expanding and collapsing folder nodes on click.
*   Use state management (e.g., useState) to track the expanded/collapsed state of each node.

## 8. Performance Optimization
*   Optimize the tree view for performance, especially when dealing with a large number of folders.
*   Consider techniques like virtualization or lazy loading if necessary.

## 9. Integration
*   Integrate the `Tree` component into the main `app/page.tsx` file.
*   Pass the data from `data.json` to the `Tree` component.