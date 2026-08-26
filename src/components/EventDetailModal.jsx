import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MUNICIPALITIES } from '../data/initialData';
import { X, Calendar, Clock, MapPin, UserCheck, Globe2, Share2 } from 'lucide-react';

export default function EventDetailModal({ event, onClose, isPast }) {
  const { getLocalized, isFallbackUsed, t, lang } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  const title = getLocalized(event, 'title');
  const description = getLocalized(event, 'description');
  const fallbackUsed = isFallbackUsed(event, 'title') || isFallbackUsed(event, 'description');

  const municipalityObj = MUNICIPALITIES.find(m => m.id === event.municipality);
  const municipalityName = municipalityObj ? getLocalized(municipalityObj, 'name') : (event.municipality || 'Val di Scalve');

  const formattedDate = new Date(event.date).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleAddToCalendar = () => {
    const startTime = (event.time || '10:00').replace(':', '') + '00';
    const startDate = event.date.replace(/-/g, '');
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}T${startTime}/${startDate}T235950&details=${encodeURIComponent(description)}&location=${encodeURIComponent(event.location || municipalityName)}`;
    window.open(googleCalUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl glass-panel rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl my-8 text-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Poster Header */}
        <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden flex-shrink-0">
          <img
            src={event.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/50" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white backdrop-blur-md border border-slate-700/60 transition-all touch-target z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Date Badge */}
          <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
            {isPast && (
              <span className="px-3 py-1.5 rounded-xl bg-red-950/90 text-red-300 font-bold text-xs border border-red-800 shadow-lg">
                {t('event_past_badge')}
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-grow">
          
          {fallbackUsed && (
            <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs flex items-center gap-2.5">
              <Globe2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{t('fallback_notice')}</span>
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {title}
          </h2>

          {/* Logistics Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            {event.time && (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Orario</div>
                  <div className="text-sm font-semibold text-slate-200">{event.time}</div>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Luogo</div>
                  <div className="text-sm font-semibold text-slate-200">{event.location} ({municipalityName})</div>
                </div>
              </div>
            )}

            {event.organizer && (
              <div className="flex items-center gap-3 sm:col-span-2 pt-2 border-t border-slate-800/60">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">{t('organizer_label')}</div>
                  <div className="text-sm font-semibold text-slate-200">{event.organizer}</div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Dettagli Evento</h4>
            <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="p-4 sm:p-6 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
          >
            Chiudi
          </button>

          {!isPast && (
            <button
              onClick={handleAddToCalendar}
              className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all touch-target"
            >
              <Calendar className="w-4 h-4" />
              <span>Aggiungi a Google Calendar</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
