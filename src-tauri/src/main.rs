// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_shell::ShellExt;

#[tauri::command]
async fn start_conversion(
    app: tauri::AppHandle,
    input_path: String,
    output_path: String,
    bitrate: String,
) -> Result<String, String> {
    let sidecar_command = app.shell()
        .sidecar("ffmpeg")
        .map_err(|e| format!("FFmpeg Sidecar Not Found: {}", e))?;
    
    let args = vec![
        "-i", &input_path,
        "-b:a", &bitrate,
        "-ar", "44100",
        "-ac", "2",
        "-vn", &output_path,
        "-y" 
    ];

    let output = sidecar_command
        .args(args)
        .output()
        .await
        .map_err(|e| format!("Execution failed: {}", e))?;

    if output.status.success() {
        Ok("Success".into())
    } else {
        Err(format!("FFmpeg Error: {}", String::from_utf8_lossy(&output.stderr)))
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![start_conversion])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}