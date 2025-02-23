use std::fs;
use std::path::PathBuf;
use serde::Serialize;

#[derive(Clone, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct FolderData {
    name: String,
    path: String,
    #[serde(rename = "type")]
    folder_type: String, // Always "folder" in this case
    total_size: u64,
    subfolder_count: usize,
    file_count: usize,
    children: Vec<FolderData>
}

pub fn load_folder(path : PathBuf) -> FolderData {
    let mut subfolder_count = 0;
    let mut file_count = 0;
    let mut total_size = 0;
    let mut children = Vec::new();
    let folder_type = "folder".parse().unwrap();

    if let Ok(entries) = fs::read_dir(&path) {
        for entry in entries.flatten() {
            let entry_path = entry.path();
            if entry_path.is_dir() {
                subfolder_count += 1;
                children.push(load_folder(entry_path));
            } else {
                file_count += 1;
                total_size += entry.metadata().unwrap().len();
            }
        }
    }

    FolderData {
        name: path.file_name().unwrap().to_str().unwrap().to_string(),
        path: path.to_str().unwrap().to_string(),
        folder_type,
        total_size,
        subfolder_count,
        file_count,
        children
    }
}

