#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use std::path::PathBuf;
mod folder_crawler;
use tauri::{AppHandle, Emitter};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![load_folders])
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application!");
}

#[tauri::command]
fn load_folders(app: AppHandle){
    let root_path = PathBuf::from("C:\\Users\\Damie\\Data443\\dim_argocd");
    let folder_data = folder_crawler::load_folder(root_path);
    app.emit("folders-loaded", folder_data).unwrap();
}
