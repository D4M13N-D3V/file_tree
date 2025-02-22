use models::folder_data::FolderData;
use std::fs;
use std::path::PathBuf;

fn crawl(path: PathBuf) -> FolderData {

    /*initialize mutable variables for tracking information about the folder.*/
    let mut size = 0; // Total size of all the files and subfolders in the folder.
    let mut subfolder_count = 0; // Total number of subfolders in the folder.
    let mut file_count = 0; // Total number of files in the folder.
    let mut children = Vec::new(); // Vector to store the child folder data

    if let Ok(entries) = fs::read_dir(&path) {

    }
}