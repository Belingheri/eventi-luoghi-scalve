import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mountain, MapPin, ExternalLink, Heart, ShieldCheck } from 'lucide-react';

export default function Footer({ setCurrentView }) {
  const { t } = useLanguage();

  const municipalities = [
    { name: 'Schilpario', desc: 'Miniere & Piste da Sci di Fondo' },
    { name: 'Vilminore di Scalve', desc: 'Diga del Gleno & Capoluogo' },
    { name: 'Colere', desc: 'Presolana 2200 & Trekking' },
    { name: 'Azzone', desc: 'Riserva Naturale & Borgo Storico' },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 mt-20 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">Val di Scalve</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              {t('footer_tagline')}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/50 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('footer_hosting_note')}</span>
            </div>
          </div>

          {/* Municipalities Col */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Comuni della Val di Scalve
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {municipalities.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/30 transition-colors">
                  <div className="font-semibold text-slate-200 text-sm">{m.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Esplora
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-emerald-400 transition-colors">
                  {t('nav_home')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('places')} className="hover:text-emerald-400 transition-colors">
                  {t('nav_places')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('events')} className="hover:text-emerald-400 transition-colors">
                  {t('nav_events')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('admin')} className="hover:text-amber-400 transition-colors">
                  {t('nav_admin')}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Val di Scalve Turismo. Tutti i diritti riservati.</p>
          <p className="flex items-center gap-1">
            Realizzato per la promozione turistica della Val di Scalve
          </p>
        </div>
      </div>
    </footer>
  );
}
