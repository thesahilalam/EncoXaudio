<div align="center">
  <img src="src/assets/logo.png" alt="EncoXaudio Logo" width="120"/>

  # 🎵 EncoXaudio

  **A blazing-fast, privacy-first desktop application to extract high-quality audio from video files.**

  <p>
    <a href="https://github.com/thesahilalam/EncoXaudio/releases/latest"><img alt="Version" src="https://img.shields.io/github/v/release/thesahilalam/EncoXaudio?color=blue&style=for-the-badge"></a>
    <a href="https://github.com/thesahilalam/EncoXaudio/releases/latest"><img alt="Platforms" src="https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-success?style=for-the-badge"></a>
    <a href="https://github.com/thesahilalam/EncoXaudio/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/License-Personal-orange?style=for-the-badge"></a>
  </p>
</div>

---

## ⚡ Why EncoXaudio?

Online converters upload your personal files to the cloud, risking your privacy and wasting your bandwidth. **EncoXaudio** changes that. By leveraging a native Rust backend and an integrated FFmpeg engine, it processes everything 100% locally on your machine at native hardware speeds.

### ✨ Key Features
- **Cross-Platform:** Beautiful, native experience across macOS, Windows, and Linux.
- **Privacy Guaranteed:** Zero cloud uploads. Your files never leave your disk.
- **Hardware Optimized:** Near-instant conversions powered by Tauri v2 and Rust.
- **Modern UX:** Glassmorphic UI with seamless Drag & Drop functionality.
- **Multi-Lingual:** Translated into English, Hindi, Spanish, French, Chinese, and Arabic.

---

## 📥 Download & Install

Get the latest stable release for your operating system (v1.0.0):

| Platform | Architecture | Format | Download |
| :--- | :--- | :--- | :--- |
| **🍎 macOS** | Apple Silicon (M1/M2/M3) | `.dmg` | [Download for Mac](https://github.com/thesahilalam/EncoXaudio/releases/latest) |
| **🪟 Windows** | x64 (Intel/AMD) | `.msi` / `.exe` | [Download for Windows](https://github.com/thesahilalam/EncoXaudio/releases/latest) |
| **🐧 Linux** | x64 / ARM64 | `.AppImage` / `.deb` / `.rpm` | [Download for Linux](https://github.com/thesahilalam/EncoXaudio/releases/latest) |

> **Note for Linux Users:** The `.AppImage` is portable and runs on most distributions without installation. Just make it executable (`chmod +x`) and run!

---

## 🛠️ Tech Stack & Architecture

EncoXaudio bridges modern web technologies with systems programming for maximum efficiency:

- **Frontend:** React.js, TypeScript, Tailwind CSS, Vite
- **Core Framework:** Tauri v2
- **Backend IPC:** Rust
- **Processing Engine:** FFmpeg (Integrated as a native Rust Sidecar)

---

## 💻 Build from Source (For Developers)

Want to tinker with the code? Follow these steps to set up your local development environment.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://rustup.rs/) (latest stable)
- FFmpeg static binaries

### Setup Guide

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/thesahilalam/EncoXaudio.git](https://github.com/thesahilalam/EncoXaudio.git)
   cd EncoXaudio
