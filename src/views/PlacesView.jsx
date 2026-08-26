import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { CATEGORIES, MUNICIPALITIES } from '../data/initialData';
import PlaceCard from '../components/PlaceCard';
import PlaceDetailModal from '../components/PlaceDetailModal';
import { Search, Filter, MapPin, Compass } from 'lucide-react';

export default function PlacesView({ initialMunicipality = 'all' }) {
  const { t, getLocalized } = useLanguage();
  const { places } = useData();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMunicipality, setSelectedMunicipality] = useState(initialMunicipality);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Filter Places
  const filteredPlaces = places.filter(place => {
    // Category Filter
    if (selectedCategory !== 'all' && place.category !== selectedCategory) {
      return false;
    }
    // Municipality Filter
    if (selectedMunicipality !== 'all' && place.municipality !== selectedMunicipality) {
      return false;
    }
    // Search Query Filter
    if (searchQuery.trim() !== '') {
      const title = getLocalized(place, 'title').toLowerCase();
      const desc = getLocalized(place, 'description').toLowerCase();
      const q = searchQuery.toLowerCase();
      return title.includes(q) || desc.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Page Title */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
          <Compass className="w-8 h-8 text-emerald-400" />
          <span>{t('places_title')}</span>
        </h1>
        <p className="text-slate-400 text-base max-w-3xl">
          {t('places_subtitle')}
        </p>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl space-y-5 border border-slate-800">
        
        {/* Search & Counter Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-xl">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('places_search_ph')}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-900/90 text-white placeholder-slate-400 border border-slate-700/80 focus:outline-none focus:border-emerald-500 text-sm shadow-inner"
            />
          </div>

          <div className="text-xs font-semibold text-slate-400 bg-slate-900/60 px-4 py-3 rounded-2xl border border-slate-800 self-start md:self-auto flex items-center gap-2">
            <span>{t('found_places')}</span>
            <strong className="text-emerald-400 text-sm">{filteredPlaces.length}</strong>
            <span>{t('places_unit')}</span>
          </div>
        </div>

        {/* Categories Horizontal Selector */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('filter_category')}</span>
          </div>
          <div className="flex items-center gap-2 custom-horizontal-scroll">
            {CATEGORIES.map(cat => {
              const label = getLocalized(cat, 'label');
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all touch-target ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Municipalities Horizontal Selector */}
        <div className="space-y-2 pt-2 border-t border-slate-800/60">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('filter_municipality')}</span>
          </div>
          <div className="flex items-center gap-2 custom-horizontal-scroll">
            {MUNICIPALITIES.map(muni => {
              const name = getLocalized(muni, 'name');
              const isActive = selectedMunicipality === muni.id;
              return (
                <button
                  key={muni.id}
                  onClick={() => setSelectedMunicipality(muni.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all touch-target ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-900/30'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Places Cards Grid */}
      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map(place => (
            <PlaceCard
              key={place.id}
              place={place}
              onSelect={setSelectedPlace}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-3xl text-slate-400 space-y-3 border border-slate-800">
          <Compass className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-base text-slate-300 font-semibold">{t('no_results')}</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedMunicipality('all'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold transition-colors"
          >
            {t('btn_reset_filters')}
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedPlace && (
        <PlaceDetailModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}

    </div>
  );
}
