import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { Mountain, MapPin, Calendar, Lock, Menu, X, Compass, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Header({ currentView, setCurrentView }) {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('nav_home'), icon: Compass },
    { id: 'places', label: t('nav_places'), icon: MapPin },
    { id: 'events', label: t('nav_events'), icon: Calendar },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Official Brand Logo */}
            <div 
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="h-11 px-3 py-1.5 rounded-2xl bg-white/95 shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center border border-slate-200">
                <img 
                  src="https://www.valdiscalve.it/wp-content/themes/foundation/library/images/svg/logo.svg" 
                  alt="Logo Ufficiale Val di Scalve" 
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:text-emerald-400 transition-colors">
                  Val di Scalve
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-emerald-400 -mt-1">
                  Turismo & Eventi
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/60">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md shadow-emerald-900/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: Official Site Link + Language Selector + Privacy + Admin Link + Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Direct Official Site Link */}
              <a
                href="https://www.valdiscalve.it/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/80 hover:text-white transition-all"
                title="Apri il Sito Ufficiale valdiscalve.it"
              >
                <span>valdiscalve.it</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <LanguageSelector />

              {/* Privacy & Legal Notice Button */}
              <button
                onClick={() => setPrivacyModalOpen(true)}
                className="p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-slate-900 transition-colors"
                title="Informativa Privacy & Note Legali"
              >
                <ShieldCheck className="w-5 h-5" />
              </button>

              {/* Admin Area Button */}
              <button
                onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
                className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  currentView === 'admin'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-900/60 text-slate-300 border-slate-700/60 hover:border-amber-500/40 hover:text-amber-300'
                }`}
                title={t('nav_admin')}
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span className="hidden lg:inline">{t('nav_admin')}</span>
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl glass-card text-slate-300 hover:text-white touch-target"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 text-emerald-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setCurrentView('admin');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  currentView === 'admin'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-amber-300'
                }`}
              >
                <Lock className="w-5 h-5 text-amber-400" />
                <span>{t('nav_admin')}</span>
              </button>

              <button
                onClick={() => { setPrivacyModalOpen(true); setMobileMenuOpen(false); }}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400"
                title="Informativa Privacy"
              >
                <ShieldCheck className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* PRIVACY & LEGAL NOTICE MODAL PORTAL (Mounted directly on document.body for global overlay) */}
      {privacyModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-lg my-auto bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-5 sm:p-6 space-y-4 text-left relative flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{t('privacy_title')}</h3>
                  <p className="text-xs text-slate-400">{t('privacy_sub')}</p>
                </div>
              </div>
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed overflow-y-auto flex-1 pr-1 custom-horizontal-scroll">
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <strong className="text-emerald-400 block mb-1">{t('privacy_item1_title')}</strong>
                {t('privacy_item1_desc')}
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <strong className="text-emerald-400 block mb-1">{t('privacy_item2_title')}</strong>
                {t('privacy_item2_desc')}
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <strong className="text-emerald-400 block mb-1">{t('privacy_item3_title')}</strong>
                {t('privacy_item3_desc')}
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <strong className="text-emerald-400 block mb-1">{t('privacy_item4_title')}</strong>
                {t('privacy_item4_desc')}
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-1">
                <div>
                  <strong className="text-emerald-300 block font-semibold text-xs mb-0.5">🌐 Portale Turistico Ufficiale</strong>
                  <span className="text-[11px] text-slate-400">Visita valdiscalve.it per approfondimenti istituzionali</span>
                </div>
                <a
                  href="https://www.valdiscalve.it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors flex-shrink-0"
                >
                  <span>{t('official_site_btn')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Modal Footer Button */}
            <div className="pt-2 flex-shrink-0">
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                {t('privacy_btn_close')}
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}
