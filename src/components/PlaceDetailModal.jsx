import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES, MUNICIPALITIES } from '../data/initialData';
import { X, MapPin, Navigation, Star, Info, Globe2, Compass, ExternalLink } from 'lucide-react';

export default function PlaceDetailModal({ place, onClose }) {
  const { getLocalized, isFallbackUsed, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!place) return null;

  const title = getLocalized(place, 'title');
  const description = getLocalized(place, 'description');
  const practicalInfo = getLocalized(place, 'practicalInfo');
  const externalLinkLabel = getLocalized(place, 'externalLinkLabel') || 'Visita Sito / Info';
  const fallbackUsed = isFallbackUsed(place, 'title') || isFallbackUsed(place, 'description');

  const categoryObj = CATEGORIES.find(c => c.id === place.category);
  const municipalityObj = MUNICIPALITIES.find(m => m.id === place.municipality);

  const categoryLabel = categoryObj ? getLocalized(categoryObj, 'label') : place.category;
  const municipalityName = municipalityObj ? getLocalized(municipalityObj, 'name') : place.municipality;

  const handleOpenMap = () => {
    if (place.mapUrl) {
      window.open(place.mapUrl, '_blank', 'noopener,noreferrer');
    } else if (place.coordinates) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.coordinates)}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-3xl glass-panel rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl my-8 text-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header Image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-slate-900 overflow-hidden flex-shrink-0">
          <img
            src={place.image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/50" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white backdrop-blur-md border border-slate-700/60 transition-all touch-target z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-xl bg-emerald-600/90 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                {categoryLabel}
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-900/90 text-slate-200 text-xs font-semibold border border-slate-700/80 flex items-center gap-1.5 shadow-lg">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {municipalityName}
              </span>
            </div>

            {place.rating && (
              <div className="px-3 py-1 rounded-xl bg-amber-500/20 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-500/40 flex items-center gap-1.5 shadow-lg">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{place.rating} / 5.0</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-grow">
          
          {/* Language Fallback Alert */}
          {fallbackUsed && (
            <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs flex items-center gap-2.5">
              <Globe2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{t('fallback_notice')}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {title}
            </h2>
            {place.coordinates && (
              <div className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>GPS: {place.coordinates}</span>
              </div>
            )}
          </div>

          {/* Main Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Descrizione</h4>
            <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Practical Info Box */}
          {practicalInfo && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4" />
                {t('practical_info_title')}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {practicalInfo}
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
          >
            Chiudi
          </button>

          <div className="flex flex-wrap items-center gap-3">
            {place.externalLinkUrl && (
              <a
                href={place.externalLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-lg transition-all touch-target"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{externalLinkLabel}</span>
              </a>
            )}

            <button
              onClick={handleOpenMap}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all touch-target"
            >
              <Navigation className="w-4 h-4" />
              <span>{t('btn_map_directions')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
