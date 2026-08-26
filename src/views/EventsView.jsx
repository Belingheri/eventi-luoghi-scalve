import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { MUNICIPALITIES } from '../data/initialData';
import EventCard from '../components/EventCard';
import EventDetailModal from '../components/EventDetailModal';
import { Calendar, Search, MapPin, Archive, Sparkles } from 'lucide-react';

export default function EventsView() {
  const { t, getLocalized } = useLanguage();
  const { upcomingEvents, pastEvents } = useData();

  const [selectedMunicipality, setSelectedMunicipality] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchive, setShowArchive] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Filter Upcoming Events
  const filteredUpcoming = upcomingEvents.filter(event => {
    if (selectedMunicipality !== 'all' && event.municipality !== selectedMunicipality) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const title = getLocalized(event, 'title').toLowerCase();
      const desc = getLocalized(event, 'description').toLowerCase();
      const q = searchQuery.toLowerCase();
      return title.includes(q) || desc.includes(q);
    }
    return true;
  });

  // Filter Past Events
  const filteredPast = pastEvents.filter(event => {
    if (selectedMunicipality !== 'all' && event.municipality !== selectedMunicipality) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const title = getLocalized(event, 'title').toLowerCase();
      const desc = getLocalized(event, 'description').toLowerCase();
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
          <Calendar className="w-8 h-8 text-emerald-400" />
          <span>Calendario Eventi & Manifestazioni</span>
        </h1>
        <p className="text-slate-400 text-base max-w-3xl">
          Rimani sempre aggiornato sulle sagre paesane, le gare sportive, i concerti e le manifestazioni culturali organizzate nei 4 comuni della Val di Scalve.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl space-y-5 border border-slate-800">
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-xl">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca evento per titolo o parola chiave..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-900/90 text-white placeholder-slate-400 border border-slate-700/80 focus:outline-none focus:border-emerald-500 text-sm shadow-inner"
            />
          </div>

          {/* Toggle Archive Switch */}
          <button
            onClick={() => setShowArchive(!showArchive)}
            className={`px-4 py-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all touch-target ${
              showArchive
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900/80 text-slate-300 border-slate-700/80 hover:bg-slate-800'
            }`}
          >
            <Archive className="w-4 h-4" />
            <span>{t('toggle_archive')} ({pastEvents.length})</span>
          </button>
        </div>

        {/* Municipality Filter Bar */}
        <div className="space-y-2 pt-2 border-t border-slate-800/60">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('filter_municipality')}</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {MUNICIPALITIES.map(muni => {
              const name = getLocalized(muni, 'name');
              const isActive = selectedMunicipality === muni.id;
              return (
                <button
                  key={muni.id}
                  onClick={() => setSelectedMunicipality(muni.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all touch-target ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
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

      {/* UPCOMING EVENTS GRID */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-bold text-white">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h2>Prossimi Eventi ({filteredUpcoming.length})</h2>
        </div>

        {filteredUpcoming.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpcoming.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={setSelectedEvent}
                isPast={false}
              />
            ))}
          </div>
        ) : (
          <div className="p-10 text-center glass-panel rounded-3xl text-slate-400 border border-slate-800">
            Nessun evento in programma trovato per i criteri selezionati.
          </div>
        )}
      </div>

      {/* ARCHIVED PAST EVENTS GRID (If Toggled) */}
      {showArchive && (
        <div className="space-y-4 pt-8 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-lg font-bold text-amber-300">
            <Archive className="w-5 h-5 text-amber-400" />
            <h2>Archivio Eventi Passati ({filteredPast.length})</h2>
          </div>

          {filteredPast.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPast.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onSelect={setSelectedEvent}
                  isPast={true}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center glass-panel rounded-3xl text-slate-400 border border-slate-800">
              Nessun evento passato presente nell'archivio.
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          isPast={selectedEvent.date < new Date().toISOString().split('T')[0]}
        />
      )}

    </div>
  );
}
