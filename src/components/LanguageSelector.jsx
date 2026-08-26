import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageSelector() {
  const { lang, setLang, LANGUAGES } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card text-slate-200 hover:text-emerald-400 text-sm font-medium transition-all touch-target"
        aria-label="Select Language"
      >
        <span className="text-base leading-none">{currentLanguage.flag}</span>
        <span className="font-semibold uppercase tracking-wider">{currentLanguage.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl glass-panel shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 border border-slate-700/60">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 mb-1">
            Seleziona Lingua / Language
          </div>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between transition-colors ${
                lang === l.code
                  ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{l.flag}</span>
                <span>{l.name}</span>
              </div>
              <span className="text-xs uppercase text-slate-500 font-mono">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
