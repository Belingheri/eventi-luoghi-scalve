import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES, MUNICIPALITIES } from '../data/initialData';
import { MapPin, Navigation, Star, Info, Globe2, ExternalLink } from 'lucide-react';

export default function PlaceCard({ place, onSelect }) {
  const { getLocalized, isFallbackUsed, t } = useLanguage();

  const title = getLocalized(place, 'title');
  const description = getLocalized(place, 'description');
  const externalLinkLabel = getLocalized(place, 'externalLinkLabel') || 'Info';
  const fallbackUsed = isFallbackUsed(place, 'title');

  const categoryObj = CATEGORIES.find(c => c.id === place.category);
  const municipalityObj = MUNICIPALITIES.find(m => m.id === place.municipality);

  const categoryLabel = categoryObj ? getLocalized(categoryObj, 'label') : place.category;
  const municipalityName = municipalityObj ? getLocalized(municipalityObj, 'name') : place.municipality;

  const handleOpenMap = (e) => {
    e.stopPropagation();
    if (place.mapUrl) {
      window.open(place.mapUrl, '_blank', 'noopener,noreferrer');
    } else if (place.coordinates) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.coordinates)}`, '_blank');
    }
  };

  const handleExternalLink = (e) => {
    e.stopPropagation();
    if (place.externalLinkUrl) {
      window.open(place.externalLinkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      onClick={() => onSelect(place)}
      className="glass-card rounded-3xl overflow-hidden group cursor-pointer flex flex-col h-full border border-slate-800 hover:border-emerald-500/40"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={place.image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

        {/* Category & Municipality Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-emerald-400 text-xs font-bold border border-emerald-500/30 uppercase tracking-wider">
            {categoryLabel}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-semibold border border-slate-700/60 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400" />
            {municipalityName}
          </span>
        </div>

        {/* Rating Badge */}
        {place.rating && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-amber-500/20 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-500/40 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{place.rating}</span>
          </div>
        )}

        {/* Fallback Language Indicator Badge */}
        {fallbackUsed && (
          <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-slate-900/90 text-amber-300 text-[10px] font-medium border border-amber-500/30 flex items-center gap-1" title={t('fallback_notice')}>
            <Globe2 className="w-3 h-3" />
            <span>IT Fallback</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800/80">
          <button
            onClick={() => onSelect(place)}
            className="flex-1 py-2 px-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors touch-target"
          >
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('btn_details')}</span>
          </button>

          {place.externalLinkUrl && (
            <button
              onClick={handleExternalLink}
              className="py-2 px-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-1 transition-all touch-target"
              title={externalLinkLabel}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="truncate max-w-[80px]">{externalLinkLabel}</span>
            </button>
          )}

          <button
            onClick={handleOpenMap}
            className="py-2 px-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1 transition-all touch-target"
            title={t('btn_map_directions')}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('btn_map_directions')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
