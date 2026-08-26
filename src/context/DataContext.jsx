import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PLACES, INITIAL_EVENTS } from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const DataContext = createContext();

// Helper converters between JS (camelCase) and DB (snake_case)
const mapPlaceToDb = (p) => ({
  id: p.id,
  category: p.category,
  municipality: p.municipality,
  image: p.image || null,
  coordinates: p.coordinates || null,
  map_url: p.mapUrl || p.map_url || null,
  external_link_url: p.externalLinkUrl || p.external_link_url || null,
  external_link_label: p.externalLinkLabel || p.external_link_label || null,
  rating: p.rating || 4.8,
  featured: Boolean(p.featured),
  title: p.title,
  description: p.description,
  practical_info: p.practicalInfo || p.practical_info || null
});

const mapDbToPlace = (p) => ({
  ...p,
  mapUrl: p.mapUrl || p.map_url || '',
  externalLinkUrl: p.externalLinkUrl || p.external_link_url || '',
  externalLinkLabel: p.externalLinkLabel || p.external_link_label || null,
  practicalInfo: p.practicalInfo || p.practical_info || null
});

const mapEventToDb = (e) => ({
  id: e.id,
  date: e.date,
  time: e.time || null,
  location: e.location || null,
  municipality: e.municipality,
  image: e.image || null,
  external_link_url: e.externalLinkUrl || e.external_link_url || null,
  external_link_label: e.externalLinkLabel || e.external_link_label || null,
  organizer: e.organizer || null,
  title: e.title,
  description: e.description
});

const mapDbToEvent = (e) => ({
  ...e,
  externalLinkUrl: e.externalLinkUrl || e.external_link_url || '',
  externalLinkLabel: e.externalLinkLabel || e.external_link_label || null
});

export function DataProvider({ children }) {
  const [places, setPlaces] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [authSession, setAuthSession] = useState(null);

  // Restore Supabase Auth session & listen to state changes
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setAuthSession(session);
        setAuthUser(session?.user ?? null);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setAuthSession(session);
        setAuthUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  // Load Data directly from Supabase DB (No initial dummy fallback)
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: placesData, error: placesError } = await supabase.from('places').select('*');
          const { data: eventsData, error: eventsError } = await supabase.from('events').select('*');
          
          if (!placesError && placesData) {
            setPlaces(placesData.map(mapDbToPlace));
          } else {
            setPlaces([]);
          }

          if (!eventsError && eventsData) {
            setEvents(eventsData.map(mapDbToEvent));
          } else {
            setEvents([]);
          }
        } catch (err) {
          console.warn('Supabase load error:', err);
          setPlaces([]);
          setEvents([]);
        }
      } else {
        setPlaces([]);
        setEvents([]);
      }
      setLoading(false);
    }

    loadData();
  }, []);

  // Auto-Archiving Logic based on current date
  const todayStr = new Date().toISOString().split('T')[0];

  const upcomingEvents = events
    .filter(e => e.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date));

  const pastEvents = events
    .filter(e => e.date < todayStr)
    .sort((a, b) => b.date.localeCompare(a.date));

  // Backend Supabase Auth Methods
  const loginWithSupabase = async (email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase non è ancora configurato in .env');
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  };

  const logoutSupabase = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setAuthUser(null);
    setAuthSession(null);
  };

  // Places CRUD
  const addPlace = async (newPlace) => {
    const item = { ...newPlace, id: newPlace.id || `place-${Date.now()}` };
    setPlaces(prev => [item, ...prev]);

    if (isSupabaseConfigured && supabase) {
      const dbRecord = mapPlaceToDb(item);
      const { error } = await supabase.from('places').insert([dbRecord]);
      if (error) {
        console.error('Errore inserimento Luogo su Supabase:', error);
        alert(`Errore salvataggio Luogo su Supabase Cloud: ${error.message}`);
      }
    }
  };

  const updatePlace = async (id, updatedPlace) => {
    const item = { ...updatedPlace, id };
    setPlaces(prev => prev.map(p => p.id === id ? item : p));

    if (isSupabaseConfigured && supabase) {
      const dbRecord = mapPlaceToDb(item);
      const { error } = await supabase.from('places').update(dbRecord).eq('id', id);
      if (error) {
        console.error('Errore aggiornamento Luogo su Supabase:', error);
        alert(`Errore aggiornamento Luogo su Supabase Cloud: ${error.message}`);
      }
    }
  };

  const deletePlace = async (id) => {
    setPlaces(prev => prev.filter(p => p.id !== id));

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('places').delete().eq('id', id);
      if (error) {
        console.error('Errore eliminazione Luogo su Supabase:', error);
        alert(`Errore eliminazione Luogo su Supabase Cloud: ${error.message}`);
      }
    }
  };

  // Events CRUD
  const addEvent = async (newEvent) => {
    const item = { ...newEvent, id: newEvent.id || `event-${Date.now()}` };
    setEvents(prev => [item, ...prev]);

    if (isSupabaseConfigured && supabase) {
      const dbRecord = mapEventToDb(item);
      const { error } = await supabase.from('events').insert([dbRecord]);
      if (error) {
        console.error('Errore inserimento Evento su Supabase:', error);
        alert(`Errore salvataggio Evento su Supabase Cloud: ${error.message}`);
      }
    }
  };

  const updateEvent = async (id, updatedEvent) => {
    const item = { ...updatedEvent, id };
    setEvents(prev => prev.map(e => e.id === id ? item : e));

    if (isSupabaseConfigured && supabase) {
      const dbRecord = mapEventToDb(item);
      const { error } = await supabase.from('events').update(dbRecord).eq('id', id);
      if (error) {
        console.error('Errore aggiornamento Evento su Supabase:', error);
        alert(`Errore aggiornamento Evento su Supabase Cloud: ${error.message}`);
      }
    }
  };

  const deleteEvent = async (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) {
        console.error('Errore eliminazione Evento su Supabase:', error);
        alert(`Errore eliminazione Evento su Supabase Cloud: ${error.message}`);
      }
    }
  };

  return (
    <DataContext.Provider value={{
      places,
      events,
      upcomingEvents,
      pastEvents,
      loading,
      authUser,
      authSession,
      loginWithSupabase,
      logoutSupabase,
      addPlace,
      updatePlace,
      deletePlace,
      addEvent,
      updateEvent,
      deleteEvent,
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
