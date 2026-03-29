# EncoXaudio

EncoXaudio is a high-performance desktop application designed to extract high-quality audio from video files instantly. Built using Tauri v2, React, and Rust, it provides a seamless cross-platform experience with a focus on local privacy.

---

## Download Latest Version

| Platform | Format | Architecture | Download Link |
| :--- | :--- | :--- | :--- |
| macOS | .dmg | Apple Silicon (M1/M2/M3) | [Download](https://github.com/thesahilalam/EncoXaudio/releases/latest) |
| Windows | .msi / .exe | x64 (Intel/AMD) | [Download](https://github.com/thesahilalam/EncoXaudio/releases/latest) |
| Linux | .AppImage / .deb | x64 / ARM64 | [Download](https://github.com/thesahilalam/EncoXaudio/releases/latest) |

---

## Why EncoXaudio?

- Privacy First: No cloud uploads. All processing happens locally on your hardware.
- Native Speed: Uses Rust-powered sidecars for FFmpeg to ensure zero latency.
- Modern UX: Beautiful dark-mode UI with full drag-and-drop functionality.
- Global Support: Fully translated into English, Hindi, Spanish, French, Chinese, and Arabic.

---

## Tech Stack

- Frontend: React.js, TypeScript, Tailwind CSS
- Backend: Rust, Tauri v2
- Engine: FFmpeg (Native Sidecar integration)

---

## How to Build from Source

If you want to run this project locally as a developer:

1. Clone the repo:
   git clone https://github.com/thesahilalam/EncoXaudio.git

2. Install dependencies:
   npm install

3. Setup FFmpeg:
   Place the appropriate FFmpeg binary for your OS in the src-tauri/bin/ folder and rename it following the Tauri sidecar convention.

4. Run in Dev Mode:
   npm run tauri dev

---

## Roadmap

- [x] macOS (Apple Silicon) Support
- [x] Windows (x64) Support
- [x] Linux Support (AppImage/Deb)
- [ ] Bulk Conversion Feature
- [ ] Audio Trimming Tools

---

## Developer
Developed by Sahil Alam (enco)
GitHub: @thesahilalam

---

## License
Personal Project - All rights reserved.
