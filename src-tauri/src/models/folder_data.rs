use serde::Serialize;


#[derive(Serialize)]
struct FolderData {
    name: String,
    path: String,
    #[serde(rename = "type")]
    folder_type: String, // Always "folder" in this case
    size: u64,
    subfolders: usize,
    children: Vec<FolderData>,
}
