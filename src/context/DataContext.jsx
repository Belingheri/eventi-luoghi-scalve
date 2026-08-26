import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PLACES, INITIAL_EVENTS } from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [places, setPlaces] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Initial Data (from Supabase if configured, or LocalStorage / Seed)
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: placesData, error: placesError } = await supabase.from('places').select('*');
          const { data: eventsData, error: eventsError } = await supabase.from('events').select('*');
          
          if (!placesError && placesData && placesData.length > 0) {
            setPlaces(placesData);
          } else {
            setPlaces(INITIAL_PLACES);
          }

          if (!eventsError && eventsData && eventsData.length > 0) {
            setEvents(eventsData);
          } else {
            setEvents(INITIAL_EVENTS);
          }
        } catch (err) {
          console.warn('Supabase load error, falling back to local storage', err);
          loadFromLocalStorage();
        }
      } else {
        loadFromLocalStorage();
      }
      setLoading(false);
    }

    loadData();
  }, []);

  const loadFromLocalStorage = () => {
    const savedPlaces = localStorage.getItem('scalve_places');
    const savedEvents = localStorage.getItem('scalve_events');

    if (savedPlaces) {
      try { setPlaces(JSON.parse(savedPlaces)); } catch (e) { setPlaces(INITIAL_PLACES); }
    } else {
      setPlaces(INITIAL_PLACES);
    }

    if (savedEvents) {
      try { setEvents(JSON.parse(savedEvents)); } catch (e) { setEvents(INITIAL_EVENTS); }
    } else {
      setEvents(INITIAL_EVENTS);
    }
  };

  // Sync to LocalStorage whenever state changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('scalve_places', JSON.stringify(places));
    }
  }, [places, loading]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('scalve_events', JSON.stringify(events));
    }
  }, [events, loading]);

  // Auto-Archiving Logic based on current date
  const todayStr = new Date().toISOString().split('T')[0];

  const upcomingEvents = events
    .filter(e => e.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date));

  const pastEvents = events
    .filter(e => e.date < todayStr)
    .sort((a, b) => b.date.localeCompare(a.date));

  // Places CRUD
  const addPlace = async (newPlace) => {
    const item = { ...newPlace, id: newPlace.id || `place-${Date.now()}` };
    setPlaces(prev => [item, ...prev]);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('places').insert([item]);
    }
  };

  const updatePlace = async (id, updatedPlace) => {
    setPlaces(prev => prev.map(p => p.id === id ? { ...updatedPlace, id } : p));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('places').update(updatedPlace).eq('id', id);
    }
  };

  const deletePlace = async (id) => {
    setPlaces(prev => prev.filter(p => p.id !== id));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('places').delete().eq('id', id);
    }
  };

  // Events CRUD
  const addEvent = async (newEvent) => {
    const item = { ...newEvent, id: newEvent.id || `event-${Date.now()}` };
    setEvents(prev => [item, ...prev]);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('events').insert([item]);
    }
  };

  const updateEvent = async (id, updatedEvent) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...updatedEvent, id } : e));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('events').update(updatedEvent).eq('id', id);
    }
  };

  const deleteEvent = async (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('events').delete().eq('id', id);
    }
  };

  // Reset to initial dataset
  const resetToInitialData = () => {
    setPlaces(INITIAL_PLACES);
    setEvents(INITIAL_EVENTS);
    localStorage.removeItem('scalve_places');
    localStorage.removeItem('scalve_events');
  };

  return (
    <DataContext.Provider value={{
      places,
      events,
      upcomingEvents,
      pastEvents,
      loading,
      addPlace,
      updatePlace,
      deletePlace,
      addEvent,
      updateEvent,
      deleteEvent,
      resetToInitialData,
      isCloudConnected: isSupabaseConfigured
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
