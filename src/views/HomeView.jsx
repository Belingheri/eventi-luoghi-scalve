import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import PlaceCard from '../components/PlaceCard';
import PlaceDetailModal from '../components/PlaceDetailModal';
import EventCard from '../components/EventCard';
import EventDetailModal from '../components/EventDetailModal';
import { Search, Mountain, MapPin, Calendar, Compass, ArrowRight, Sparkles } from 'lucide-react';

export default function HomeView({ setCurrentView, setSelectedMunicipalityFilter }) {
  const { t } = useLanguage();
  const { places, upcomingEvents } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const featuredPlaces = places.filter(p => p.featured || places.length <= 4).slice(0, 4);
  const nextEvents = upcomingEvents.slice(0, 3);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('places');
    }
  };

  const handleMunicipalityClick = (muniId) => {
    if (setSelectedMunicipalityFilter) {
      setSelectedMunicipalityFilter(muniId);
    }
    setCurrentView('places');
  };

  return (
    <div className="space-y-16 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden min-h-[520px] flex items-center justify-center p-6 sm:p-12 border border-slate-800 shadow-2xl">
        
        {/* Background Image with Alpine Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85"
            alt="Val di Scalve Mountain"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-widest animate-in fade-in duration-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{t('hero_badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {t('hero_title_1')} <br className="hidden sm:inline" />
            <span className="gradient-text-emerald">{t('hero_title_2')}</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            {t('hero_subtitle')}
          </p>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_placeholder')}
                className="w-full pl-12 pr-32 py-4 rounded-2xl glass-panel text-white placeholder-slate-400 border border-slate-700/80 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm sm:text-base shadow-xl transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-md transition-all touch-target flex items-center gap-1"
              >
                <span>{t('btn_search')}</span>
              </button>
            </div>
          </form>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentView('places')}
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/40 transition-all touch-target"
            >
              <Compass className="w-5 h-5" />
              <span>{t('btn_explore_places')}</span>
            </button>

            <button
              onClick={() => setCurrentView('events')}
              className="px-6 py-3.5 rounded-2xl glass-panel hover:bg-slate-800/80 text-slate-200 hover:text-white font-bold text-sm border border-slate-700/80 flex items-center gap-2 transition-all touch-target"
            >
              <Calendar className="w-5 h-5 text-emerald-400" />
              <span>{t('btn_view_events')}</span>
            </button>
          </div>

        </div>
      </section>

      {/* MUNICIPALITIES QUICK GRID */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{t('muni_section_title')}</h2>
          <p className="text-slate-400 text-sm">{t('muni_section_sub')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 'schilpario', name: 'Schilpario', desc: 'Miniere & Sci di Fondo', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80' },
            { id: 'vilminore', name: 'Vilminore di Scalve', desc: 'Diga del Gleno', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
            { id: 'colere', name: 'Colere', desc: 'Presolana 2200 & Trekking', img: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=600&q=80' },
            { id: 'azzone', name: 'Azzone', desc: 'Riserva Naturale Giovetto', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80' },
          ].map(m => (
            <div
              key={m.id}
              onClick={() => handleMunicipalityClick(m.id)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card cursor-pointer group border border-slate-800 hover:border-emerald-500/50"
            >
              <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">{m.name}</div>
                <div className="text-xs text-slate-300 font-medium truncate">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ICONIC PLACES SECTION */}
      <section className="space-y-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <MapPin className="w-7 h-7 text-emerald-400" />
              {t('sec_featured_places')}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {t('sec_featured_sub')}
            </p>
          </div>

          <button
            onClick={() => setCurrentView('places')}
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold text-sm transition-colors group self-start sm:self-auto"
          >
            <span>{t('view_all_places')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlaces.map(place => (
            <PlaceCard
              key={place.id}
              place={place}
              onSelect={setSelectedPlace}
            />
          ))}
        </div>
      </section>

      {/* UPCOMING EVENTS SECTION */}
      <section className="space-y-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <Calendar className="w-7 h-7 text-emerald-400" />
              {t('sec_upcoming_events')}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {t('sec_upcoming_sub')}
            </p>
          </div>

          <button
            onClick={() => setCurrentView('events')}
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold text-sm transition-colors group self-start sm:self-auto"
          >
            <span>{t('view_all_events')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {nextEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nextEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={setSelectedEvent}
                isPast={false}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center glass-panel rounded-3xl text-slate-400">
            {t('no_results')}
          </div>
        )}
      </section>

      {/* MODALS */}
      {selectedPlace && (
        <PlaceDetailModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          isPast={false}
        />
      )}

    </div>
  );
}
