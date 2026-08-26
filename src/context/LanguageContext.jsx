import React, { createContext, useContext, useState, useEffect } from 'react';

const LANGUAGES = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹', label: 'IT' },
  { code: 'en', name: 'English', flag: '🇬🇧', label: 'EN' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', label: 'DE' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', label: 'FR' },
  { code: 'es', name: 'Español', flag: '🇪🇸', label: 'ES' },
];

const UI_TRANSLATIONS = {
  // Navigation
  nav_home: { it: 'Home', en: 'Home', de: 'Startseite', fr: 'Accueil', es: 'Inicio' },
  nav_places: { it: 'Luoghi', en: 'Places', de: 'Orte', fr: 'Lieux', es: 'Lugares' },
  nav_events: { it: 'Eventi', en: 'Events', de: 'Veranstaltungen', fr: 'Événements', es: 'Eventos' },
  nav_admin: { it: 'Area Riservata', en: 'Admin Area', de: 'Admin-Bereich', fr: 'Espace Admin', es: 'Área Admin' },
  
  // Hero
  hero_badge: { it: 'Portale Turistico Val di Scalve', en: 'Val di Scalve Tourist Portal', de: 'Touristenportal Val di Scalve', fr: 'Portail Touristique Val di Scalve', es: 'Portal Turístico Val di Scalve' },
  hero_title_1: { it: 'Esplora la Magia della', en: 'Explore the Magic of', de: 'Entdecken Sie die Magie von', fr: 'Explorez la Magie de la', es: 'Explora la Magia de la' },
  hero_title_2: { it: 'Val di Scalve', en: 'Scalve Valley', de: 'Scalvetal', fr: 'Val di Scalve', es: 'Valle di Scalve' },
  hero_subtitle: { it: 'Un paradiso alpino di natura incontaminata, storia mineraria e tradizioni nel cuore delle Alpi Orobiche.', en: 'An alpine paradise of pristine nature, mining history and rich traditions in the Orobie Alps.', de: 'Ein Alpenparadies unberührter Natur, Bergbaugeschichte und Traditionen in den Bergamasker Alpen.', fr: 'Un paradis alpin de nature préservée, d\'histoire minière et de traditions au cœur des Alpes Orobies.', es: 'Un paraíso alpino de naturaleza virgen, historia minera y tradiciones en el corazón de los Alpes Orobies.' },
  search_placeholder: { it: 'Cerca luoghi, escursioni, eventi...', en: 'Search places, hikes, events...', de: 'Suche Orte, Wanderungen, Events...', fr: 'Rechercher des lieux, rando, événements...', es: 'Buscar lugares, rutas, eventos...' },
  btn_explore_places: { it: 'Scopri i Luoghi', en: 'Discover Places', de: 'Orte Entdecken', fr: 'Découvrir les Lieux', es: 'Descubrir Lugares' },
  btn_view_events: { it: 'Calendario Eventi', en: 'Events Calendar', de: 'Veranstaltungskalender', fr: 'Calendrier des Événements', es: 'Calendario de Eventos' },

  // Sections
  sec_featured_places: { it: 'Luoghi Iconici da Non Perdere', en: 'Iconic Places to Visit', de: 'Ikonische Orte', fr: 'Lieux Iconiques à Ne Pas Manquer', es: 'Lugares Icónicos Imperdibles' },
  sec_featured_sub: { it: 'I punti d\'interesse più spettacolari e amati del territorio scalvino', en: 'The most spectacular and beloved points of interest in Scalve Valley', de: 'Die spektakulärsten und beliebtesten Sehenswürdigkeiten im Scalvetal', fr: 'Les points d\'intérêt les plus spectaculaires de la vallée', es: 'Los puntos de interés más espectaculares y amados del valle' },
  sec_upcoming_events: { it: 'Prossimi Eventi in Programma', en: 'Upcoming Events', de: 'Kommende Veranstaltungen', fr: 'Événements à Venir', es: 'Próximos Eventos' },
  sec_upcoming_sub: { it: 'Sagre, manifestazioni sportive e cultura da vivere in prima persona', en: 'Festivals, sports events and cultural appointments to experience', de: 'Festivals, Sportveranstaltungen und Kultur live erleben', fr: 'Fêtes, événements sportifs et culturels à vivre', es: 'Fiestas, eventos deportivos y cultura para vivir en persona' },
  view_all_places: { it: 'Vedi Tutti i Luoghi', en: 'View All Places', de: 'Alle Orte Anzeigen', fr: 'Voir Tous les Lieux', es: 'Ver Todos los Lugares' },
  view_all_events: { it: 'Vedi Tutto il Calendario', en: 'View Full Calendar', de: 'Gesamten Kalender Anzeigen', fr: 'Voir Tout le Calendrier', es: 'Ver Todo el Calendario' },

  // Filters & Cards
  filter_category: { it: 'Categoria', en: 'Category', de: 'Kategorie', fr: 'Catégorie', es: 'Categoría' },
  filter_municipality: { it: 'Comune', en: 'Municipality', de: 'Gemeinde', fr: 'Commune', es: 'Municipio' },
  btn_map_directions: { it: 'Apri Mappa GPS', en: 'Open GPS Map', de: 'GPS-Karte Öffnen', fr: 'Ouvrir Carte GPS', es: 'Abrir Mapa GPS' },
  btn_details: { it: 'Dettagli', en: 'Details', de: 'Details', fr: 'Détails', es: 'Detalles' },
  practical_info_title: { it: 'Informazioni Pratiche', en: 'Practical Info', de: 'Praktische Informationen', fr: 'Informations Pratiques', es: 'Información Práctica' },
  organizer_label: { it: 'Organizzato da:', en: 'Organized by:', de: 'Veranstaltet von:', fr: 'Organisé par:', es: 'Organizado por:' },
  event_past_badge: { it: 'Evento Concluso', en: 'Past Event', de: 'Beendete Veranstaltung', fr: 'Événement Terminé', es: 'Evento Concluido' },
  toggle_archive: { it: 'Mostra Archivio Eventi Passati', en: 'Show Past Events Archive', de: 'Archiv vergangener Events anzeigen', fr: 'Afficher l\'archive des événements passés', es: 'Mostrar Archivo de Eventos Pasados' },
  no_results: { it: 'Nessun risultato trovato per i filtri selezionati.', en: 'No results found for the selected filters.', de: 'Keine Ergebnisse für die ausgewählten Filter gefunden.', fr: 'Aucun résultat trouvé pour les filtres sélectionnés.', es: 'No se encontraron resultados para los filtros seleccionados.' },

  // Footer & Municipalities
  footer_tagline: { it: 'Il portale turistico open della Val di Scalve: Schilpario, Vilminore, Colere, Azzone.', en: 'The open tourism portal of Scalve Valley: Schilpario, Vilminore, Colere, Azzone.', de: 'Das offene Tourismusportal des Scalvetals: Schilpario, Vilminore, Colere, Azzone.', fr: 'Le portail touristique de la Val di Scalve: Schilpario, Vilminore, Colere, Azzone.', es: 'El portal turístico del Valle di Scalve: Schilpario, Vilminore, Colere, Azzone.' },
  footer_hosting_note: { it: 'Realizzato con architettura 100% a costo zero di hosting.', en: 'Built with 100% zero-cost hosting architecture.', de: 'Entwickelt mit 100% kostenfreier Hosting-Architektur.', fr: 'Conçu avec une architecture d\'hébergement 100% sans frais.', es: 'Diseñado con arquitectura de alojamiento 100% gratuita.' },

  // Admin Panel
  admin_title: { it: 'Pannello di Controllo Amministratore', en: 'Admin Control Panel', de: 'Admin-Kontrollzentrum', fr: 'Panneau d\'Administration', es: 'Panel de Control Administrador' },
  admin_login_sub: { it: 'Inserisci la password per gestire luoghi ed eventi.', en: 'Enter password to manage places and events.', de: 'Passwort eingeben, um Orte und Events zu verwalten.', fr: 'Entrez le mot de passe pour gérer les lieux et événements.', es: 'Ingresa la contraseña para gestionar lugares y eventos.' },
  admin_pass_label: { it: 'Password di Accesso', en: 'Access Password', de: 'Zugangspasswort', fr: 'Mot de Passe d\'Accès', es: 'Contraseña de Acceso' },
  admin_login_btn: { it: 'Accedi al Pannello', en: 'Login to Panel', de: 'Anmelden', fr: 'Connexion au Panneau', es: 'Iniciar Sesión' },
  admin_logout: { it: 'Esci dall\'Admin', en: 'Logout Admin', de: 'Abmelden', fr: 'Déconnexion', es: 'Cerrar Sesión' },
  admin_tab_places: { it: 'Gestione Luoghi', en: 'Manage Places', de: 'Orte Verwalten', fr: 'Gérer les Lieux', es: 'Gestionar Lugares' },
  admin_tab_events: { it: 'Gestione Eventi', en: 'Manage Events', de: 'Veranstaltungen Verwalten', fr: 'Gérer les Événements', es: 'Gestionar Eventos' },
  admin_add_place: { it: '+ Aggiungi Nuovo Luogo', en: '+ Add New Place', de: '+ Neuen Ort Hinzufügen', fr: '+ Ajouter Nouveau Lieu', es: '+ Añadir Nuevo Lugar' },
  admin_add_event: { it: '+ Aggiungi Nuovo Evento', en: '+ Add New Event', de: '+ Neue Veranstaltung Hinzufügen', fr: '+ Ajouter Nouvel Événement', es: '+ Añadir Nuevo Evento' },
  admin_edit: { it: 'Modifica', en: 'Edit', de: 'Bearbeiten', fr: 'Modifier', es: 'Editar' },
  admin_delete: { it: 'Elimina', en: 'Delete', de: 'Löschen', fr: 'Supprimer', es: 'Eliminar' },
  admin_save: { it: 'Salva', en: 'Save', de: 'Speichern', fr: 'Enregistrer', es: 'Guardar' },
  admin_cancel: { it: 'Annulla', en: 'Cancel', de: 'Abbrechen', fr: 'Annuler', es: 'Cancelar' },
  admin_confirm_delete: { it: 'Sei sicuro di voler eliminare questo elemento?', en: 'Are you sure you want to delete this item?', de: 'Sind Sie sicher, dass Sie dieses Element löschen möchten?', fr: 'Êtes-vous sûr de vouloir supprimer cet élément ?', es: '¿Estás seguro de que quieres eliminar este elemento?' },
  fallback_notice: { it: '(Visualizzato in italiano come fallback)', en: '(Displayed in Italian as fallback)', de: '(Auf Italienisch als Fallback angezeigt)', fr: '(Affiché en italien par défaut)', es: '(Mostrado en italiano como fallback)' }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('scalve_lang') || 'it';
  });

  useEffect(() => {
    localStorage.setItem('scalve_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Translate static UI keys
  const t = (key) => {
    if (UI_TRANSLATIONS[key]) {
      return UI_TRANSLATIONS[key][lang] || UI_TRANSLATIONS[key]['it'] || key;
    }
    return key;
  };

  // Helper for dynamic object content with Italian fallback
  const getLocalized = (item, field) => {
    if (!item || !item[field]) return '';
    const obj = item[field];
    if (typeof obj === 'string') return obj;
    if (obj[lang] && obj[lang].trim() !== '') {
      return obj[lang];
    }
    // Fallback to IT
    return obj['it'] || Object.values(obj).find(val => val && val.trim() !== '') || '';
  };

  // Helper to check if translation exists for current lang
  const isFallbackUsed = (item, field) => {
    if (lang === 'it') return false;
    if (!item || !item[field] || typeof item[field] === 'string') return false;
    return !item[field][lang] || item[field][lang].trim() === '';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, LANGUAGES, t, getLocalized, isFallbackUsed }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
