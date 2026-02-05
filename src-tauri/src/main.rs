// Prevents additional console window on Windows in release builds
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;

#[tauri::command]
async fn read_file(path: String) -> Result<String, String> {
    fs::read_to_string(&path)
        .map_err(|e| format!("Failed to read file: {}", e))
}

#[tauri::command]
async fn write_file(path: String, content: String) -> Result<(), String> {
    fs::write(&path, &content)
        .map_err(|e| format!("Failed to write file: {}", e))
}

#[tauri::command]
async fn open_file_dialog() -> Result<Option<String>, String> {
    // This command is kept for compatibility but the actual dialog
    // is handled by the frontend using @tauri-apps/plugin-dialog
    Err("Use dialog plugin from frontend".to_string())
}

#[tauri::command]
async fn save_file_dialog() -> Result<Option<String>, String> {
    // This command is kept for compatibility but the actual dialog
    // is handled by the frontend using @tauri-apps/plugin-dialog
    Err("Use dialog plugin from frontend".to_string())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            read_file,
            write_file,
            open_file_dialog,
            save_file_dialog
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
