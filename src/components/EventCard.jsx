import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MUNICIPALITIES } from '../data/initialData';
import { getItalianDateParts } from '../utils/dateUtils';
import { Calendar, Clock, MapPin, Info, Globe2, AlertCircle, ExternalLink } from 'lucide-react';

export default function EventCard({ event, onSelect, isPast }) {
  const { getLocalized, isFallbackUsed, t } = useLanguage();

  const title = getLocalized(event, 'title');
  const description = getLocalized(event, 'description');
  const externalLinkLabel = getLocalized(event, 'externalLinkLabel') || 'Info';
  const fallbackUsed = isFallbackUsed(event, 'title');

  const municipalityObj = MUNICIPALITIES.find(m => m.id === event.municipality);
  const municipalityName = municipalityObj ? getLocalized(municipalityObj, 'name') : (event.municipality || 'Val di Scalve');

  // Format Date into Day (DD) and Month (MMM) in Italian
  const { day: dayNum, monthShort: monthName } = getItalianDateParts(event.date);

  const handleExternalLink = (e) => {
    e.stopPropagation();
    if (event.externalLinkUrl) {
      window.open(event.externalLinkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      onClick={() => onSelect(event)}
      className={`glass-card rounded-3xl overflow-hidden group cursor-pointer flex flex-col h-full border transition-all ${
        isPast 
          ? 'opacity-75 grayscale-[30%] border-slate-800/60 hover:opacity-100 hover:grayscale-0' 
          : 'border-slate-800 hover:border-emerald-500/40'
      }`}
    >
      {/* Event Header Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
        <img
          src={event.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

        {/* Date Pill (Left) */}
        <div className="absolute top-3 left-3 bg-slate-950/90 border border-slate-700/80 rounded-2xl p-2.5 min-w-[56px] text-center backdrop-blur-md shadow-xl flex flex-col items-center justify-center">
          <span className="text-xs font-extrabold uppercase text-emerald-400 leading-none">{monthName}</span>
          <span className="text-xl font-extrabold text-white leading-tight mt-0.5">{dayNum}</span>
        </div>

        {/* Status / Municipality Badges (Right) */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-10">
          {isPast ? (
            <span className="px-2.5 py-1 rounded-lg bg-red-950/80 text-red-300 text-[11px] font-bold border border-red-800/60 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {t('event_past_badge')}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 text-[11px] font-bold border border-emerald-800/60">
              In Programma
            </span>
          )}

          <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 text-slate-200 text-xs font-semibold border border-slate-700/60 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400" />
            {municipalityName}
          </span>
        </div>

        {fallbackUsed && (
          <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-slate-900/90 text-amber-300 text-[10px] font-medium border border-amber-500/30 flex items-center gap-1">
            <Globe2 className="w-3 h-3" />
            <span>IT Fallback</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          {/* Time & Location details */}
          <div className="flex items-center gap-3 text-xs text-slate-400">
            {event.time && (
              <span className="flex items-center gap-1 text-slate-300 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {event.time}
              </span>
            )}
            {event.location && (
              <span className="truncate text-slate-400">
                {event.location}
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-2">
            {title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Footer info & button */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          {event.organizer && (
            <span className="text-[11px] text-slate-400 truncate max-w-[120px]">
              {t('organizer_label')} <strong className="text-slate-300">{event.organizer}</strong>
            </span>
          )}

          <div className="flex items-center gap-1.5 ml-auto">
            {event.externalLinkUrl && (
              <button
                onClick={handleExternalLink}
                className="py-1.5 px-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 text-xs font-bold flex items-center gap-1 transition-all touch-target"
                title={externalLinkLabel}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="truncate max-w-[70px]">{externalLinkLabel}</span>
              </button>
            )}

            <button
              onClick={() => onSelect(event)}
              className="py-1.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-emerald-400 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors touch-target"
            >
              <Info className="w-3.5 h-3.5" />
              <span>{t('btn_details')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
