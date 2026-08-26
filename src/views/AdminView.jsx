import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { CATEGORIES, MUNICIPALITIES } from '../data/initialData';
import { Lock, LogOut, Plus, Edit2, Trash2, MapPin, Calendar, Globe2, Save, X, RefreshCw, CheckCircle, ShieldAlert, Copy, Upload, Image as ImageIcon } from 'lucide-react';

export default function AdminView() {
  const { t, LANGUAGES, getLocalized } = useLanguage();
  const { 
    places, events, addPlace, updatePlace, deletePlace, 
    addEvent, updateEvent, deleteEvent, resetToInitialData, isCloudConnected 
  } = useData();

  // Helper for uploading file image from device
  const handleImageFileUpload = (e, setFormState) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('L\'immagine selezionata supera i 5MB. Seleziona un file più leggero.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const dataUrl = uploadEvent.target?.result;
        setFormState(prev => ({ ...prev, image: dataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin Tab ('places' | 'events')
  const [activeTab, setActiveTab] = useState('places');

  // Form Modal States
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const [editingPlaceId, setEditingPlaceId] = useState(null);

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);

  // Active Language Tab in Form ('it' | 'en' | 'de' | 'fr' | 'es')
  const [formLang, setFormLang] = useState('it');

  // Place Form State
  const emptyPlaceForm = {
    category: 'trekking',
    municipality: 'schilpario',
    image: '',
    coordinates: '',
    mapUrl: '',
    externalLinkUrl: '',
    externalLinkLabel: { it: '', en: '', de: '', fr: '', es: '' },
    rating: 4.8,
    featured: false,
    title: { it: '', en: '', de: '', fr: '', es: '' },
    description: { it: '', en: '', de: '', fr: '', es: '' },
    practicalInfo: { it: '', en: '', de: '', fr: '', es: '' }
  };
  const [placeForm, setPlaceForm] = useState(emptyPlaceForm);

  // Event Form State
  const emptyEventForm = {
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    location: '',
    municipality: 'schilpario',
    image: '',
    externalLinkUrl: '',
    externalLinkLabel: { it: '', en: '', de: '', fr: '', es: '' },
    organizer: 'Pro Loco',
    title: { it: '', en: '', de: '', fr: '', es: '' },
    description: { it: '', en: '', de: '', fr: '', es: '' }
  };
  const [eventForm, setEventForm] = useState(emptyEventForm);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput.trim() === 'scalve2026' || passwordInput.trim() === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Password non corretta. Riprova con "scalve2026"');
    }
  };

  // Open Place Modal for Add
  const handleOpenAddPlace = () => {
    setPlaceForm(emptyPlaceForm);
    setEditingPlaceId(null);
    setFormLang('it');
    setIsPlaceModalOpen(true);
  };

  // Open Place Modal for Edit
  const handleOpenEditPlace = (place) => {
    setPlaceForm({
      category: place.category || 'trekking',
      municipality: place.municipality || 'schilpario',
      image: place.image || '',
      coordinates: place.coordinates || '',
      mapUrl: place.mapUrl || '',
      externalLinkUrl: place.externalLinkUrl || '',
      externalLinkLabel: { ...emptyPlaceForm.externalLinkLabel, ...place.externalLinkLabel },
      rating: place.rating || 4.8,
      featured: Boolean(place.featured),
      title: { ...emptyPlaceForm.title, ...place.title },
      description: { ...emptyPlaceForm.description, ...place.description },
      practicalInfo: { ...emptyPlaceForm.practicalInfo, ...place.practicalInfo },
    });
    setEditingPlaceId(place.id);
    setFormLang('it');
    setIsPlaceModalOpen(true);
  };

  // Save Place Form
  const handleSavePlace = (e) => {
    e.preventDefault();
    if (!placeForm.title.it) {
      alert('Inserisci almeno il titolo in Italiano (lingua principale).');
      return;
    }

    if (editingPlaceId) {
      updatePlace(editingPlaceId, placeForm);
    } else {
      addPlace(placeForm);
    }
    setIsPlaceModalOpen(false);
  };

  // Open Event Modal for Add
  const handleOpenAddEvent = () => {
    setEventForm(emptyEventForm);
    setEditingEventId(null);
    setFormLang('it');
    setIsEventModalOpen(true);
  };

  // Open Event Modal for Edit
  const handleOpenEditEvent = (event) => {
    setEventForm({
      date: event.date || new Date().toISOString().split('T')[0],
      time: event.time || '18:00',
      location: event.location || '',
      municipality: event.municipality || 'schilpario',
      image: event.image || '',
      externalLinkUrl: event.externalLinkUrl || '',
      externalLinkLabel: { ...emptyEventForm.externalLinkLabel, ...event.externalLinkLabel },
      organizer: event.organizer || '',
      title: { ...emptyEventForm.title, ...event.title },
      description: { ...emptyEventForm.description, ...event.description },
    });
    setEditingEventId(event.id);
    setFormLang('it');
    setIsEventModalOpen(true);
  };

  // Save Event Form
  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!eventForm.title.it) {
      alert('Inserisci almeno il titolo dell\'evento in Italiano.');
      return;
    }

    if (editingEventId) {
      updateEvent(editingEventId, eventForm);
    } else {
      addEvent(eventForm);
    }
    setIsEventModalOpen(false);
  };

  // Copy Italian to all languages helper
  const copyItalianTranslations = (type) => {
    if (type === 'place') {
      const itTitle = placeForm.title.it;
      const itDesc = placeForm.description.it;
      const itInfo = placeForm.practicalInfo.it;
      const itBtn = placeForm.externalLinkLabel?.it;

      setPlaceForm(prev => ({
        ...prev,
        title: { it: itTitle, en: prev.title.en || itTitle, de: prev.title.de || itTitle, fr: prev.title.fr || itTitle, es: prev.title.es || itTitle },
        description: { it: itDesc, en: prev.description.en || itDesc, de: prev.description.de || itDesc, fr: prev.description.fr || itDesc, es: prev.description.es || itDesc },
        practicalInfo: { it: itInfo, en: prev.practicalInfo.en || itInfo, de: prev.practicalInfo.de || itInfo, fr: prev.practicalInfo.fr || itInfo, es: prev.practicalInfo.es || itInfo },
        externalLinkLabel: { it: itBtn, en: prev.externalLinkLabel?.en || itBtn, de: prev.externalLinkLabel?.de || itBtn, fr: prev.externalLinkLabel?.fr || itBtn, es: prev.externalLinkLabel?.es || itBtn },
      }));
    } else {
      const itTitle = eventForm.title.it;
      const itDesc = eventForm.description.it;
      const itBtn = eventForm.externalLinkLabel?.it;

      setEventForm(prev => ({
        ...prev,
        title: { it: itTitle, en: prev.title.en || itTitle, de: prev.title.de || itTitle, fr: prev.title.fr || itTitle, es: prev.title.es || itTitle },
        description: { it: itDesc, en: prev.description.en || itDesc, de: prev.description.de || itDesc, fr: prev.description.fr || itDesc, es: prev.description.es || itDesc },
        externalLinkLabel: { it: itBtn, en: prev.externalLinkLabel?.en || itBtn, de: prev.externalLinkLabel?.de || itBtn, fr: prev.externalLinkLabel?.fr || itBtn, es: prev.externalLinkLabel?.es || itBtn },
      }));
    }
  };

  // LOGIN FORM VIEW
  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('admin_title')}</h2>
            <p className="text-slate-400 text-xs mt-1">{t('admin_login_sub')}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                {t('admin_pass_label')}
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password (default: scalve2026)"
                className="w-full px-4 py-3 rounded-2xl bg-slate-900 text-white border border-slate-700 focus:outline-none focus:border-amber-400 text-sm"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-900/30 transition-all touch-target"
            >
              {t('admin_login_btn')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD VIEW
  return (
    <div className="space-y-8 pb-12">
      
      {/* Admin Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Pannello di Amministrazione Riservato</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Gestione Portale "Val di Scalve"</h1>
          
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
            <span className={`w-2 h-2 rounded-full ${isCloudConnected ? 'bg-emerald-400' : 'bg-blue-400'}`} />
            <span>Persistenza: <strong>{isCloudConnected ? 'Database Cloud Supabase' : 'LocalStorage In-Browser'}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToInitialData}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Ripristina dati iniziali della Val di Scalve"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ripristina Dati Iniziali</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-bold border border-red-800/60 flex items-center gap-1.5 transition-colors touch-target"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('admin_logout')}</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('places')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${
            activeTab === 'places'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
              : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>{t('admin_tab_places')} ({places.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${
            activeTab === 'events'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
              : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{t('admin_tab_events')} ({events.length})</span>
        </button>
      </div>

      {/* TAB 1: GESTIONE LUOGHI */}
      {activeTab === 'places' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Elenco Luoghi Inseriti</h2>
            <button
              onClick={handleOpenAddPlace}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-900/30 transition-all touch-target"
            >
              <Plus className="w-4 h-4" />
              <span>{t('admin_add_place')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {places.map(place => (
              <div key={place.id} className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={place.image} alt="" className="w-16 h-16 rounded-xl object-cover bg-slate-900 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white text-base">{getLocalized(place, 'title')}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span className="px-2 py-0.5 rounded bg-slate-800 font-semibold text-emerald-400 uppercase">{place.category}</span>
                      <span>•</span>
                      <span className="capitalize">{place.municipality}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleOpenEditPlace(place)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
                    title={t('admin_edit')}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(t('admin_confirm_delete'))) deletePlace(place.id);
                    }}
                    className="p-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/60 transition-colors"
                    title={t('admin_delete')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: GESTIONE EVENTI */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Elenco Eventi Inseriti</h2>
            <button
              onClick={handleOpenAddEvent}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-900/30 transition-all touch-target"
            >
              <Plus className="w-4 h-4" />
              <span>{t('admin_add_event')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {events.map(event => {
              const isPast = event.date < new Date().toISOString().split('T')[0];
              return (
                <div key={event.id} className={`glass-panel p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isPast ? 'border-slate-800/60 opacity-80' : 'border-slate-800'}`}>
                  <div className="flex items-center gap-4">
                    <img src={event.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=300&q=80'} alt="" className="w-16 h-16 rounded-xl object-cover bg-slate-900 flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-base">{getLocalized(event, 'title')}</h3>
                        {isPast && <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 text-[10px] font-bold">PASSATO</span>}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className="text-emerald-400 font-semibold">{event.date} ({event.time})</span>
                        <span>•</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleOpenEditEvent(event)}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
                      title={t('admin_edit')}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(t('admin_confirm_delete'))) deleteEvent(event.id);
                      }}
                      className="p-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/60 transition-colors"
                      title={t('admin_delete')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FORM MODAL: PLACE (CREATE / EDIT) */}
      {isPlaceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white">
                {editingPlaceId ? 'Modifica Luogo' : 'Aggiungi Nuovo Luogo'}
              </h2>
              <button onClick={() => setIsPlaceModalOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSavePlace} className="space-y-6">
              
              {/* General Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Categoria</label>
                  <select
                    value={placeForm.category}
                    onChange={(e) => setPlaceForm({ ...placeForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{getLocalized(c, 'label')}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Comune</label>
                  <select
                    value={placeForm.municipality}
                    onChange={(e) => setPlaceForm({ ...placeForm, municipality: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  >
                    {MUNICIPALITIES.filter(m => m.id !== 'all').map(m => (
                      <option key={m.id} value={m.id}>{getLocalized(m, 'name')}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-xs font-bold uppercase text-slate-400">Immagine di Copertina</label>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md touch-target">
                      <Upload className="w-4 h-4" />
                      <span>📷 Carica Foto da Dispositivo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, setPlaceForm)}
                        className="hidden"
                      />
                    </label>

                    <span className="text-xs text-slate-400 font-medium">oppure inserisci un URL web:</span>
                  </div>

                  <input
                    type="text"
                    value={placeForm.image}
                    onChange={(e) => setPlaceForm({ ...placeForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/... oppure caricata da file"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  />

                  {placeForm.image && (
                    <div className="relative aspect-[16/9] max-h-40 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 mt-2 flex items-center justify-center">
                      <img src={placeForm.image} alt="Anteprima" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setPlaceForm({ ...placeForm, image: '' })}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-950/80 text-red-300 hover:text-white border border-red-800 text-xs font-bold flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Rimuovi</span>
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Coordinate GPS (Lat, Long)</label>
                  <input
                    type="text"
                    value={placeForm.coordinates}
                    onChange={(e) => setPlaceForm({ ...placeForm, coordinates: e.target.value })}
                    placeholder="46.0028, 10.0717"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Valutazione Stars (1.0 - 5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={placeForm.rating}
                    onChange={(e) => setPlaceForm({ ...placeForm, rating: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div className="sm:col-span-2 border-t border-slate-800/80 pt-3">
                  <label className="block text-xs font-bold uppercase text-emerald-400 mb-1 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Link Esterno Pulsante Personalizzato (Apre in nuova scheda _blank)</span>
                  </label>
                  <input
                    type="url"
                    value={placeForm.externalLinkUrl || ''}
                    onChange={(e) => setPlaceForm({ ...placeForm, externalLinkUrl: e.target.value })}
                    placeholder="https://sito-ufficiale.it oppure https://prenotazioni.it"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              {/* 5-LANGUAGE TRANSLATION TABS */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-amber-400 flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4" />
                    <span>Contenuti Tradotti nelle 5 Lingue</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => copyItalianTranslations('place')}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                    title="Copia il testo italiano per riempire velocemente gli altri campi"
                  >
                    <Copy className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copia Italiano a tutti</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setFormLang(l.code)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        formLang === l.code
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>

                {/* Localized inputs for active form language */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Titolo ({formLang.toUpperCase()}) {formLang === 'it' && '*obbligatorio'}
                    </label>
                    <input
                      type="text"
                      value={placeForm.title[formLang] || ''}
                      onChange={(e) => setPlaceForm({
                        ...placeForm,
                        title: { ...placeForm.title, [formLang]: e.target.value }
                      })}
                      placeholder={`Es. Ruderi della Diga del Gleno (${formLang.toUpperCase()})`}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Testo del Pulsante Esterno ({formLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={placeForm.externalLinkLabel?.[formLang] || ''}
                      onChange={(e) => setPlaceForm({
                        ...placeForm,
                        externalLinkLabel: { ...placeForm.externalLinkLabel, [formLang]: e.target.value }
                      })}
                      placeholder="Es. Sito Ufficiale / Prenota Biglietti (Opzionale, default: 'Visita Sito')"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Descrizione ({formLang.toUpperCase()})
                    </label>
                    <textarea
                      rows="3"
                      value={placeForm.description[formLang] || ''}
                      onChange={(e) => setPlaceForm({
                        ...placeForm,
                        description: { ...placeForm.description, [formLang]: e.target.value }
                      })}
                      placeholder="Descrizione dettagliata..."
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Informazioni Pratiche ({formLang.toUpperCase()})
                    </label>
                    <textarea
                      rows="2"
                      value={placeForm.practicalInfo[formLang] || ''}
                      onChange={(e) => setPlaceForm({
                        ...placeForm,
                        practicalInfo: { ...placeForm.practicalInfo, [formLang]: e.target.value }
                      })}
                      placeholder="Percorso a piedi, tempo di percorrenza, abbigliamento consigliato..."
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsPlaceModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Salva Luogo</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* FORM MODAL: EVENT (CREATE / EDIT) */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white">
                {editingEventId ? 'Modifica Evento' : 'Aggiungi Nuovo Evento'}
              </h2>
              <button onClick={() => setIsEventModalOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Data Evento (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Orario</label>
                  <input
                    type="text"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    placeholder="18:30"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Comune</label>
                  <select
                    value={eventForm.municipality}
                    onChange={(e) => setEventForm({ ...eventForm, municipality: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  >
                    {MUNICIPALITIES.filter(m => m.id !== 'all').map(m => (
                      <option key={m.id} value={m.id}>{getLocalized(m, 'name')}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Luogo Fisico / Indirizzo</label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    placeholder="Piazza Just, Schilpario"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Organizzatore</label>
                  <input
                    type="text"
                    value={eventForm.organizer}
                    onChange={(e) => setEventForm({ ...eventForm, organizer: e.target.value })}
                    placeholder="Pro Loco Schilpario"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-xs font-bold uppercase text-slate-400">Locandina / Immagine Evento</label>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md touch-target">
                      <Upload className="w-4 h-4" />
                      <span>📷 Carica Locandina da Dispositivo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, setEventForm)}
                        className="hidden"
                      />
                    </label>

                    <span className="text-xs text-slate-400 font-medium">oppure inserisci un URL web:</span>
                  </div>

                  <input
                    type="text"
                    value={eventForm.image}
                    onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/... oppure caricata da file"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  />

                  {eventForm.image && (
                    <div className="relative aspect-[16/9] max-h-40 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 mt-2 flex items-center justify-center">
                      <img src={eventForm.image} alt="Anteprima Locandina" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setEventForm({ ...eventForm, image: '' })}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-950/80 text-red-300 hover:text-white border border-red-800 text-xs font-bold flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Rimuovi</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2 border-t border-slate-800/80 pt-3">
                  <label className="block text-xs font-bold uppercase text-emerald-400 mb-1 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Link Esterno / Prenotazione Biglietti (Apre in nuova scheda _blank)</span>
                  </label>
                  <input
                    type="url"
                    value={eventForm.externalLinkUrl || ''}
                    onChange={(e) => setEventForm({ ...eventForm, externalLinkUrl: e.target.value })}
                    placeholder="https://link-iscrizione.it oppure https://biglietti.it"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              {/* 5-LANGUAGE TRANSLATION TABS */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-amber-400 flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4" />
                    <span>Titolo e Descrizione nelle 5 Lingue</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => copyItalianTranslations('event')}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copia Italiano a tutti</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setFormLang(l.code)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        formLang === l.code
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Titolo Evento ({formLang.toUpperCase()}) {formLang === 'it' && '*obbligatorio'}
                    </label>
                    <input
                      type="text"
                      value={eventForm.title[formLang] || ''}
                      onChange={(e) => setEventForm({
                        ...eventForm,
                        title: { ...eventForm.title, [formLang]: e.target.value }
                      })}
                      placeholder={`Es. Sagra dei Capù (${formLang.toUpperCase()})`}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Testo del Pulsante Esterno ({formLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={eventForm.externalLinkLabel?.[formLang] || ''}
                      onChange={(e) => setEventForm({
                        ...eventForm,
                        externalLinkLabel: { ...eventForm.externalLinkLabel, [formLang]: e.target.value }
                      })}
                      placeholder="Es. Prenota Posti / Sito Ufficiale (Opzionale, default: 'Info & Prenotazioni')"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Descrizione Evento ({formLang.toUpperCase()})
                    </label>
                    <textarea
                      rows="3"
                      value={eventForm.description[formLang] || ''}
                      onChange={(e) => setEventForm({
                        ...eventForm,
                        description: { ...eventForm.description, [formLang]: e.target.value }
                      })}
                      placeholder="Dettagli sullo svolgimento, programma..."
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Salva Evento</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
