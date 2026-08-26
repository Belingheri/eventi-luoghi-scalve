import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { Mountain, MapPin, Calendar, Lock, Menu, X, Compass } from 'lucide-react';

export default function Header({ currentView, setCurrentView }) {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('nav_home'), icon: Compass },
    { id: 'places', label: t('nav_places'), icon: MapPin },
    { id: 'events', label: t('nav_events'), icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform duration-300">
              <Mountain className="w-6 h-6 text-white" />
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

          {/* Right Controls: Language Selector + Admin Link + Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <LanguageSelector />

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

          <div className="pt-2 border-t border-slate-800/80">
            <button
              onClick={() => {
                setCurrentView('admin');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                currentView === 'admin'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-amber-300'
              }`}
            >
              <Lock className="w-5 h-5 text-amber-400" />
              <span>{t('nav_admin')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
