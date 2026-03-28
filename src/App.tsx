import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png'; 
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { revealItemInDir } from "@tauri-apps/plugin-opener";
import { listen } from "@tauri-apps/api/event";

import { translations, LanguageKey } from './utils/translations';
import SettingsModal from './components/SettingsModal';

function App() {
  const [selectedFormat, setSelectedFormat] = useState('MP3');
  const [selectedQuality, setSelectedQuality] = useState('High');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState<LanguageKey>('en');
  const t = translations[lang] || translations.en;
  
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filePath, setFilePath] = useState(''); 
  const [fileName, setFileName] = useState(''); 
  const [isDragging, setIsDragging] = useState(false);
  const [isDone, setIsDone] = useState(false); 
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [history, setHistory] = useState<{name: string, format: string, time: string, outPath: string}[]>([]);

  const theme = isDarkMode ? {
    bg: '#111814', text: '#E2E8E4', mutedText: '#8B9691', cardBg: 'rgba(20, 30, 25, 0.6)', cardBorder: 'rgba(255, 255, 255, 0.08)', headerBorder: 'rgba(255, 255, 255, 0.05)', iconColor: '#E2E8E4'
  } : {
    bg: '#CFEFDE', text: '#161F1A', mutedText: '#7E8783', cardBg: 'rgba(255, 255, 255, 0.5)', cardBorder: 'rgba(255, 255, 255, 0.3)', headerBorder: '#C4E9DA', iconColor: '#161F1A'
  };

  const getBitrate = () => {
    switch(selectedQuality) {
      case 'Low': return '64k'; case 'Medium': return '192k'; case 'High': return '256k'; case 'Best': return '320k'; default: return '256k';
    }
  };

  // --- TAURI v2 NATIVE DRAG & DROP LISTENERS ---
  useEffect(() => {
    let unlistenEnter: any, unlistenLeave: any, unlistenDrop: any;

    const setupListeners = async () => {
      unlistenEnter = await listen('tauri://drag-enter', () => setIsDragging(true));
      unlistenLeave = await listen('tauri://drag-leave', () => setIsDragging(false));
      
      // Fixed for Tauri v2: Event name is 'tauri://drag-drop'
      unlistenDrop = await listen<{ paths: string[] }>('tauri://drag-drop', (event) => {
        setIsDragging(false);
        const paths = event.payload.paths;
        if (paths && paths.length > 0) {
          const fullPath = paths[0];
          setFilePath(fullPath);
          setFileName(fullPath.split(/[/\\]/).pop() || 'video.mp4');
          setIsDone(false);
        }
      });
    };

    setupListeners();

    return () => {
      if (unlistenEnter) unlistenEnter();
      if (unlistenLeave) unlistenLeave();
      if (unlistenDrop) unlistenDrop();
    };
  }, []);

  const handleSelectFile = async () => {
    const selected = await open({
      multiple: false,
      filters: [{ name: 'Video', extensions: ['mp4', 'mkv', 'avi', 'mov', 'webm'] }]
    });
    if (selected && typeof selected === 'string') {
      setFilePath(selected);
      setFileName(selected.split(/[/\\]/).pop() || 'video.mp4');
      setIsDone(false);
    }
  };

  const clearFile = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); 
    setFilePath('');
    setFileName('');
    setIsDone(false);
  };

  const handleConvert = async () => {
    if (!filePath) return;
    setIsConverting(true);
    setProgress(10);
    setIsDone(false);
    const outputFileName = filePath.replace(/\.[^/.]+$/, "") + `.${selectedFormat.toLowerCase()}`;
    
    try {
      const progressInterval = setInterval(() => setProgress(prev => (prev < 90 ? prev + 5 : 90)), 300);
      await invoke("start_conversion", { inputPath: filePath, outputPath: outputFileName, bitrate: getBitrate() });
      
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        setIsConverting(false); 
        setProgress(0);
        setIsDone(true); 
        setHistory(h => [{ name: fileName, format: selectedFormat, time: new Date().toLocaleTimeString(), outPath: outputFileName }, ...h]);
      }, 1000);
    } catch (e) {
      alert("Error: " + e); setIsConverting(false); setProgress(0);
    }
  };

  const fileIconSvg = (
    <svg width="48" height="60" viewBox="0 0 60 74" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 18.5V74H0V0H41.5L60 18.5Z" fill={isDarkMode ? "#233D35" : "#CDEAE4"}/>
      <path d="M41.5 0V18.5H60L41.5 0Z" fill={isDarkMode ? "#1B3029" : "#B4E1DA"}/>
      <circle cx="20.5" cy="46.5" r="5.5" fill="#3DCE8B"/>
      <path d="M20.5 41L20.5 52" stroke="#3DCE8B" strokeWidth="2"/>
      <path d="M26 46.5H15" stroke="#3DCE8B" strokeWidth="2"/>
    </svg>
  );

  return (
    <div className="encoxaudio-window hide-scrollbar" dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ background: theme.bg, padding: '20px 25px', fontFamily: 'system-ui, -apple-system, sans-serif', height: '100vh', width: '100vw', boxSizing: 'border-box', overflowY: 'auto', overflowX: 'hidden', transition: 'background 0.3s ease' }}>
       <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
       
       {/* HEADER */}
       <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: `1px solid ${theme.headerBorder}`, transition: 'border-color 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={logo} alt="Logo" style={{ width: '32px', height: '32px', display: 'block' }} />
            <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: theme.text }}>EncoXaudio</h1>
          </div>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '5px', color: theme.iconColor, display: 'flex', alignItems: 'center' }}>
              {isDarkMode ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '22px', height: '22px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '22px', height: '22px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>}
            </button>
            <button onClick={() => setIsSettingsOpen(true)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '5px', color: theme.iconColor, display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '22px', height: '22px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M10.342 5.956L10.92 3.65A1.5 1.5 0 0112.38 2.5h0a1.5 1.5 0 011.458 1.15l.58 2.306a4.5 4.5 0 002.592 2.592l2.306.58A1.5 1.5 0 0120.5 10.62v0a1.5 1.5 0 01-1.15 1.458l-2.306.58a4.5 4.5 0 00-2.592 2.592l-.58 2.306A1.5 1.5 0 0112.38 18.5h0a1.5 1.5 0 01-1.458-1.15l-.58-2.306a4.5 4.5 0 00-2.592-2.592l-2.306-.58A1.5 1.5 0 014.5 10.62v0a1.5 1.5 0 011.15-1.458l2.306-.58a4.5 4.5 0 002.586-2.626z" /></svg>
            </button>
          </div>
       </header>

       {/* DROPZONE */}
       <div 
          onClick={handleSelectFile} 
          style={{ 
            background: isDragging ? (isDarkMode ? 'rgba(61, 206, 139, 0.1)' : 'rgba(61, 206, 139, 0.2)') : theme.cardBg, 
            backdropFilter: 'blur(10px)', borderRadius: '25px', padding: '30px', margin: '20px 0', 
            border: isDragging ? `2px dashed #3DCE8B` : `1px solid ${theme.cardBorder}`, 
            transition: 'all 0.2s ease', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' 
          }}>
          {fileIconSvg}
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '15px 0 5px', color: theme.text }}>
            {fileName ? t.fileSelected : (isDragging ? "Drop video now!" : t.dropVideo)}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <p style={{ fontSize: '11px', color: fileName ? '#3DCE8B' : theme.mutedText, margin: '0', fontWeight: 500 }}>{fileName ? fileName : t.formatText}</p>
            {fileName && (
              <button onClick={clearFile} style={{ background: 'rgba(255,0,0,0.1)', color: '#ff4d4d', border: 'none', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '10px', padding: 0 }}>✕</button>
            )}
          </div>
       </div>

       {/* FORMATS & QUALITY GRIDS */}
       <h3 style={{ fontSize: '12px', fontWeight: 600, color: theme.mutedText, letterSpacing: '0.1em', margin: '25px 0 10px 0' }}>{t.outputFormat}</h3>
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
          {['MP3', 'AAC', 'WAV', 'FLAC', 'OGG'].map(f => (
            <div key={f} onClick={() => setSelectedFormat(f)} style={{ background: selectedFormat === f ? 'linear-gradient(135deg, #49DC95 0%, #15B670 100%)' : theme.cardBg, borderRadius: '15px', padding: '20px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: selectedFormat === f ? 'white' : theme.text, border: selectedFormat === f ? '1px solid #3ABF83' : `1px solid ${theme.cardBorder}`, transition: 'all 0.2s ease' }}>
               <div style={{ fontSize: '15px', fontWeight: 800 }}>{f}</div>
               <div style={{ fontSize: '9px', opacity: 0.8, color: selectedFormat === f ? '#C4E9DA' : theme.mutedText }}>{['WAV', 'FLAC'].includes(f) ? 'Lossless' : 'Lossy'}</div>
            </div>
          ))}
       </div>

       <h3 style={{ fontSize: '12px', fontWeight: 600, color: theme.mutedText, letterSpacing: '0.1em', margin: '25px 0 10px 0' }}>{t.quality}</h3>
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '15px' }}>
          {[ { n: 'Low', k: '64 kbps' }, { n: 'Medium', k: '192 kbps' }, { n: 'High', k: '256 kbps' }, { n: 'Best', k: '320 kbps' } ].map(q => (
            <div key={q.n} onClick={() => setSelectedQuality(q.n)} style={{ background: selectedQuality === q.n ? 'linear-gradient(135deg, #49DC95 0%, #15B670 100%)' : theme.cardBg, borderRadius: '15px', padding: '15px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: selectedQuality === q.n ? 'white' : theme.text, border: selectedQuality === q.n ? '1px solid #3ABF83' : `1px solid ${theme.cardBorder}`, transition: 'all 0.2s ease' }}>
               <div style={{ fontSize: '14px', fontWeight: 800 }}>{q.n}</div>
               <div style={{ fontSize: '9px', opacity: 0.8, color: selectedQuality === q.n ? '#C4E9DA' : theme.mutedText }}>{q.k}</div>
            </div>
          ))}
       </div>

       {/* PARAMS */}
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {[[t.sampleRate, '44100 Hz'], [t.channels, 'Stereo'], [t.bitrate, getBitrate().replace('k', ' kbps')]].map((p, i) => (
             <div key={i} style={{ background: theme.cardBg, borderRadius: '12px', padding: '12px', border: `1px solid ${theme.cardBorder}` }}>
                <div style={{ fontSize: '10px', color: theme.mutedText, fontWeight: 500 }}>{p[0]}</div>
                <div style={{ fontSize: '13px', color: theme.text, fontWeight: 800, marginTop: '2px' }}>{p[1]}</div>
             </div>
          ))}
       </div>

       {/* PROGRESS & CONVERT BUTTON */}
       <div style={{ marginTop: '30px', borderTop: `2px solid ${isDarkMode ? '#233D35' : '#5DDCA1'}`, position: 'relative', opacity: isConverting ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          {isConverting && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: theme.text, position: 'absolute', top: '-18px', width: '100%' }}>
              <span>{progress === 100 ? t.finalizing : `${t.convertingBtn} ${progress}%`}</span>
              <span>{progress}%</span>
            </div>
          )}
       </div>

       <button 
          onClick={(e) => isDone ? clearFile(e) : handleConvert()} 
          disabled={isConverting || (!filePath && !isDone)} 
          style={{ width: '100%', marginTop: isConverting ? '20px' : '30px', border: 'none', background: (fileName || isDone) ? (isDarkMode ? '#1B3029' : '#BEE7D7') : (isDarkMode ? '#1a221e' : '#e0f2e9'), color: (fileName || isDone) ? theme.text : theme.mutedText, padding: '15px 0', borderRadius: '15px', fontSize: '16px', fontWeight: 800, cursor: isConverting || (!filePath && !isDone) ? 'not-allowed' : 'pointer', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease' }}>
          <span style={{ position: 'relative', zIndex: 1 }}>
            {isConverting 
              ? (progress === 100 ? t.doneBtn : `${t.convertingBtn} ${progress}%`) 
              : (isDone ? "Convert Another File" : t.convertBtn)}
          </span>
          {isConverting && <span style={{ position: 'absolute', left: 0, bottom: 0, height: '4px', background: '#3DCE8B', width: `${progress}%`, borderRadius: '15px', transition: 'width 0.1s linear' }}></span>}
       </button>

       {/* HISTORY */}
       <h3 style={{ fontSize: '12px', fontWeight: 600, color: theme.mutedText, letterSpacing: '0.1em', margin: '30px 0 10px 0' }}>{t.history}</h3>
       <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '40px' }}>
          {history.length === 0 ? (
             <div style={{ textAlign: 'center', padding: '20px', color: theme.mutedText, fontSize: '12px', background: theme.cardBg, borderRadius: '15px', border: `1px dashed ${theme.cardBorder}` }}>{t.noHistory}</div>
          ) : (
            history.map((h, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme.cardBg, padding: '15px', borderRadius: '12px', border: `1px solid ${theme.cardBorder}` }}>
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingRight: '15px' }}>
                  <span style={{ color: theme.text, fontWeight: 700, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.name}</span>
                  <span style={{ color: theme.mutedText, fontSize: '10px', marginTop: '3px' }}>{h.time}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                  <span style={{ background: '#3DCE8B', color: 'white', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 800 }}>{h.format}</span>
                  <button onClick={() => revealItemInDir(h.outPath)} style={{ background: 'transparent', color: '#3DCE8B', border: '1px solid #3DCE8B', padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}>LOCATE</button>
                </div>
              </div>
            ))
          )}
       </div>

       <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} lang={lang} setLang={setLang} theme={theme} t={t} />
    </div>
  );
}

export default App;