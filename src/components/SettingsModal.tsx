import { useState } from 'react';
import logo from '../assets/logo.png';
import { LanguageKey } from '../utils/translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageKey;
  setLang: (l: LanguageKey) => void;
  theme: any;
  t: any;
}

export default function SettingsModal({ isOpen, onClose, lang, setLang, theme, t }: Props) {
  const [settingsView, setSettingsView] = useState<'main' | 'help' | 'about'>('main');

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div style={{ background: theme.bg, border: `1px solid ${theme.cardBorder}`, borderRadius: '20px', width: '85%', maxWidth: '350px', padding: '25px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {settingsView !== 'main' && (
              <button onClick={() => setSettingsView('main')} style={{ background: 'none', border: 'none', color: theme.text, cursor: 'pointer', padding: '0', display: 'flex' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              </button>
            )}
            <h2 style={{ margin: 0, color: theme.text, fontSize: '20px', fontWeight: 800 }}>
              {settingsView === 'main' ? t.settings : settingsView === 'help' ? t.help : t.about}
            </h2>
          </div>
          <button onClick={() => { setSettingsView('main'); onClose(); }} style={{ background: 'none', border: 'none', color: theme.mutedText, cursor: 'pointer', fontSize: '20px' }}>✕</button>
        </div>
        
        {settingsView === 'main' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: theme.text, fontWeight: 600, fontSize: '14px' }}>{t.language}</span>
              <select value={lang} onChange={(e) => setLang(e.target.value as LanguageKey)} style={{ background: theme.cardBg, color: theme.text, border: `1px solid ${theme.cardBorder}`, padding: '6px 12px', borderRadius: '8px', outline: 'none', cursor: 'pointer', fontWeight: 500 }}>
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="zh">中文</option>
                <option value="ar">العربية</option>
              </select>
            </div>
            <div style={{ borderTop: `1px solid ${theme.cardBorder}`, margin: '5px 0' }}></div>
            <button onClick={() => setSettingsView('help')} style={{ textAlign: 'left', background: 'none', border: 'none', color: theme.text, fontWeight: 600, fontSize: '14px', cursor: 'pointer', padding: '5px 0' }}>{t.help}</button>
            <button onClick={() => setSettingsView('about')} style={{ textAlign: 'left', background: 'none', border: 'none', color: theme.text, fontWeight: 600, fontSize: '14px', cursor: 'pointer', padding: '5px 0' }}>{t.about}</button>
            <div style={{ marginTop: '15px', fontSize: '11px', color: theme.mutedText, textAlign: 'center', fontWeight: 500 }}>{t.version}</div>
          </div>
        )}

        {settingsView === 'help' && (
          <div style={{ color: theme.text, fontSize: '13px', lineHeight: '1.6' }}>
            <p style={{ marginTop: 0 }}><strong>1.</strong> Select a video file by clicking the dropzone or dragging a file from your Mac.</p>
            <p><strong>2.</strong> Choose your desired output audio format (e.g., MP3, WAV).</p>
            <p><strong>3.</strong> Select the audio quality (Low to Best).</p>
            <p><strong>4.</strong> Click <strong>{t.convertBtn}</strong> and wait for the process to finish.</p>
          </div>
        )}

        {settingsView === 'about' && (
          <div style={{ color: theme.text, fontSize: '13px', lineHeight: '1.6', textAlign: 'center' }}>
            <div style={{ background: '#35C789', width: '40px', height: '40px', borderRadius: '12px', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(53, 199, 137, 0.3)' }}>
              <img src={logo} alt="Logo" style={{ width: '24px', height: '24px' }} />
            </div>
            <p style={{ fontWeight: 700, fontSize: '16px', margin: '0 0 5px' }}>EncoXaudio</p>
            <p style={{ margin: '0 0 20px', color: theme.mutedText }}>Fast, native video-to-audio converter.</p>
            <div style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <strong>Developer:</strong> 
              <a href="https://github.com/thesahilalam" target="_blank" rel="noreferrer" style={{ color: '#3DCE8B', textDecoration: 'none', fontWeight: 700 }}>
                @thesahilalam
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}