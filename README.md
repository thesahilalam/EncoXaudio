# 🎵 EncoXaudio 

**EncoXaudio** is a professional-grade, high-performance desktop application designed to extract high-quality audio from video files with ease. Built on a modern tech stack, it combines the safety and speed of **Rust** with the beautiful UI capabilities of **React**.

---

## 🚀 Status & Roadmap

Currently, EncoXaudio is fully functional for **macOS (Apple Silicon)**. We are expanding to other platforms soon!

- [x] **macOS (Apple Silicon - M1/M2/M3):** Stable Release ✅
- [ ] **Windows Version:** Development Phase 🏗️
- [ ] **Linux (Ubuntu/Debian):** Planning 📅
- [ ] **EncoXaudio Online (Web):** Research Phase 🧪

---

## ✨ Key Features

- **Blazing Fast Conversion:** Powered by native **FFmpeg** integration via Rust sidecars.
- **Privacy Centric:** No cloud uploads. All processing happens locally on your hardware.
- **Modern UI:** Clean, glassmorphic design with support for Dark and Light modes.
- **Native macOS Experience:** Support for drag-and-drop, native file dialogs, and Apple Silicon optimization.
- **Multi-Format Support:** Convert to MP3, AAC, WAV, FLAC, and OGG.
- **Precision Quality:** Granular control over bitrate (up to 320kbps).
- **Multi-lingual:** Support for English, Hindi, Spanish, French, Chinese, and Arabic.

---

## 📥 Getting Started

### For Users (macOS)
1. Go to the [Releases](https://github.com/thesahilalam/EncoXaudio/releases) section.
2. Download the latest `EncoXaudio.dmg`.
3. Drag the app to your **Applications** folder and start converting!

### For Developers (Build from source)
1. **Clone the repo:**
   ```bash
   git clone [https://github.com/thesahilalam/EncoXaudio.git](https://github.com/thesahilalam/EncoXaudio.git)
Install dependencies:

Bash
npm install
Setup FFmpeg:
Download the FFmpeg binary for your OS, rename it (e.g., ffmpeg-aarch64-apple-darwin), and place it in src-tauri/bin/.

Run Dev Mode:

Bash
npm run tauri dev
🛠️ Tech Stack
Frontend: React, TypeScript, Tailwind CSS

Backend: Rust, Tauri v2

Engine: FFmpeg (Native Sidecar)

👨‍💻 Developer
Developed by enco
GitHub: @thesahilalam

📝 License
Personal Project - Portfolio Showcase. All rights reserved.