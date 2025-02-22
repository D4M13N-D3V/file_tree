use std::fs;
use std::path::PathBuf;
use serde::Serialize;

#[derive(Serialize, Debug)]
struct FolderData {
    name: String,
    path: String,
    #[serde(rename = "type")]
    folder_type: String, // Always "folder" in this case
    size: u64,
    subfolders: usize,
}

pub struct FolderCrawler {
    stack: Vec<PathBuf>,
}

impl FolderCrawler {
    pub fn new(root: PathBuf) -> Self {
        Self { stack: vec![root] }
    }
}

impl Iterator for FolderCrawler {
    type Item = FolderData;

    fn next(&mut self) -> Option<Self::Item> {
        while let Some(path) = self.stack.pop() {
            if let Ok(entries) = fs::read_dir(&path) {
                let mut size = 0;
                let mut subfolder_count = 0;

                for entry in entries.flatten() {
                    let entry_path = entry.path();
                    if entry_path.is_dir() {
                        subfolder_count += 1;
                        self.stack.push(entry_path);
                    } else {
                        size += entry.metadata().unwrap().len();
                    }
                }

                return Some(FolderData {
                    name: path.file_name().unwrap().to_str().unwrap().to_string(),
                    path: path.to_str().unwrap().to_string(),
                    folder_type: "folder".to_string(),
                    size,
                    subfolders: subfolder_count,
                });
            }
        }
        None
    }
}