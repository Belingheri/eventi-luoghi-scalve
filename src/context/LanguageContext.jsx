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

  // General & Buttons
  btn_search: { it: 'Cerca', en: 'Search', de: 'Suchen', fr: 'Rechercher', es: 'Buscar' },
  btn_reset_filters: { it: 'Azzera Filtri', en: 'Reset Filters', de: 'Filter Zurücksetzen', fr: 'Réinitialiser i filtri', es: 'Restablecer Filtros' },
  muni_section_title: { it: 'I 4 Comuni della Valle', en: 'The 4 Municipalities of the Valley', de: 'Die 4 Gemeinden des Tals', fr: 'Les 4 communes de la vallée', es: 'Los 4 municipios del valle' },
  muni_section_sub: { it: 'Clicca su un comune per scoprire tutti i suoi punti d\'interesse', en: 'Click on a municipality to discover all its points of interest', de: 'Klicken Sie auf eine Gemeinde, um alle Sehenswürdigkeiten zu entdecken', fr: 'Cliquez sur une commune pour découvrir tous ses points d\'intérêt', es: 'Haz clic en un municipio para descubrir todos sus puntos de interés' },

  // Places Page
  places_title: { it: 'Catalogo Luoghi e Punti d\'Interesse', en: 'Places & Points of Interest Catalog', de: 'Katalog der Orte & Sehenswürdigkeiten', fr: 'Catalogue des Lieux & Points d\'Intérêt', es: 'Catálogo de Lugares y Puntos de Interés' },
  places_subtitle: { it: 'Esplora la natura, le montagne, la storia mineraria ed i borghi caratteristici della Val di Scalve.', en: 'Explore nature, mountains, mining history and charming villages of Scalve Valley.', de: 'Entdecken Sie Natur, Berge, Bergbaugeschichte und malerische Dörfer des Scalvetals.', fr: 'Explorez la nature, les montagnes, l\'histoire minière et les villages de la Val di Scalve.', es: 'Explora la naturaleza, montañas, historia minera y pueblos del Valle di Scalve.' },
  places_search_ph: { it: 'Cerca luogo per nome o descrizione...', en: 'Search place by name or description...', de: 'Ort nach Name oder Beschreibung suchen...', fr: 'Rechercher un lieu par nom ou description...', es: 'Buscar lugar por nombre o descripción...' },
  found_places: { it: 'Trovati:', en: 'Found:', de: 'Gefunden:', fr: 'Trouvés:', es: 'Encontrados:' },
  places_unit: { it: 'luoghi', en: 'places', de: 'Orte', fr: 'lieux', es: 'lugares' },

  // Events Page
  events_title: { it: 'Calendario Eventi & Manifestazioni', en: 'Events & Festivals Calendar', de: 'Veranstaltungskalender', fr: 'Calendrier des Événements', es: 'Calendario de Eventos y Fiestas' },
  events_subtitle: { it: 'Rimani sempre aggiornato sulle sagre paesane, le gare sportive, i concerti e le manifestazioni culturali.', en: 'Stay updated on local festivals, sports races, concerts and cultural events.', de: 'Bleiben Sie über lokale Feste, Sportrennen, Konzerte und Kulturveranstaltungen informiert.', fr: 'Restez informé des fêtes locales, courses sportives, concerts et événements culturels.', es: 'Mantente al día sobre fiestas locales, carreras deportivas, conciertos y eventos culturales.' },
  events_search_ph: { it: 'Cerca evento per titolo o parola chiave...', en: 'Search event by title or keyword...', de: 'Event nach Titel oder Stichwort suchen...', fr: 'Rechercher par titre ou mot-clé...', es: 'Buscar evento por título o palabra clave...' },
  upcoming_events_title: { it: 'Prossimi Eventi', en: 'Upcoming Events', de: 'Kommende Events', fr: 'Événements à Venir', es: 'Próximos Eventos' },
  archived_events_title: { it: 'Archivio Eventi Passati', en: 'Past Events Archive', de: 'Archiv vergangener Events', fr: 'Archive des Événements Passés', es: 'Archivo de Eventos Pasados' },
  no_upcoming_events: { it: 'Nessun evento in programma trovato per i criteri selezionati.', en: 'No upcoming events found for the selected criteria.', de: 'Keine kommenden Veranstaltungen für die Kriterien gefunden.', fr: 'Aucun événement à venir trouvé per i criteri selezionati.', es: 'No se encontraron próximos eventos para los criterios seleccionados.' },
  no_past_events: { it: 'Nessun evento passato presente nell\'archivio.', en: 'No past events found in the archive.', de: 'Keine vergangenen Events im Archiv vorhanden.', fr: 'Aucun événement passé trouvé dans l\'archive.', es: 'No hay eventos pasados en el archivo.' },

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
  fallback_notice: { it: '(Visualizzato in italiano come fallback)', en: '(Displayed in Italian as fallback)', de: '(Auf Italienisch als Fallback angezeigt)', fr: '(Affiché en italien par défaut)', es: '(Mostrado en italiano como fallback)' },

  // Official Website Reference
  official_site_btn: { it: 'Sito Ufficiale valdiscalve.it', en: 'Official valdiscalve.it Site', de: 'Offizielle Website valdiscalve.it', fr: 'Site Officiel valdiscalve.it', es: 'Sitio Oficial valdiscalve.it' },

  // Privacy & Legal Notice Modal
  privacy_title: { it: 'Informativa Privacy & Cookie', en: 'Privacy & Cookie Notice', de: 'Datenschutz & Cookie-Hinweis', fr: 'Politique de Confidentialité & Cookies', es: 'Aviso de Privacidad y Cookies' },
  privacy_sub: { it: 'Trasparenza e Tutela dei Dati', en: 'Transparency & Data Protection', de: 'Transparenz & Datenschutz', fr: 'Transparence & Protection des Données', es: 'Transparencia y Protección de Datos' },
  privacy_item1_title: { it: 'ℹ️ Finalità del Portale:', en: 'ℹ️ Portal Purpose:', de: 'ℹ️ Zweck des Portals:', fr: 'ℹ️ Objectif du Portail:', es: 'ℹ️ Propósito del Portal:' },
  privacy_item1_desc: { it: 'Questo sito ha finalità meramente informative e turistiche per la promozione del territorio e degli eventi dei Comuni della Val di Scalve.', en: 'This website is strictly for tourist information and promotion of territory and events of Scalve Valley municipalities.', de: 'Diese Website dient rein touristischen Informationszwecken zur Förderung der Region und Veranstaltungen im Scalvetal.', fr: 'Ce site est uniquement à des fins d\'information touristique pour la promotion del territorio ed eventi del Val di Scalve.', es: 'Este sitio web es meramente informativo y turístico para la promoción del territorio y eventos del Valle di Scalve.' },
  privacy_item2_title: { it: '🍪 Zero Cookie di Profilazione:', en: '🍪 Zero Profiling Cookies:', de: '🍪 Keine Profiling-Cookies:', fr: '🍪 Zéro Cookie de Profilage:', es: '🍪 Cero Cookies de Perfilado:' },
  privacy_item2_desc: { it: 'Questo portale non fa alcun uso di cookie di profilazione, tracciamento pubblicitario o analytics di terze parti.', en: 'This portal does not use any profiling cookies, commercial tracking or third-party analytics.', de: 'Dieses Portal verwendet keine Profiling-Cookies, Werbe-Tracking oder Analytics von Drittanbietern.', fr: 'Ce portail n\'utilise aucun cookie de profilage, traçage publicitaire ou outil d\'analyse tiers.', es: 'Este portal no utiliza cookies de perfilado, seguimiento publicitario ni analíticas de terceros.' },
  privacy_item3_title: { it: '🔐 Archiviazione Tecnica:', en: '🔐 Technical Storage:', de: '🔐 Technische Speicherung:', fr: '🔐 Stockage Technique:', es: '🔐 Almacenamiento Técnico:' },
  privacy_item3_desc: { it: 'L\'unico storage impiegato riguarda i token di autenticazione tecnica strettamente indispensabili per l\'accesso riservato al pannello di amministrazione (Supabase Auth).', en: 'The only storage used is essential technical session tokens for restricted administrator authentication (Supabase Auth).', de: 'Die einzige Speicherung betrifft notwendige technische Sitzungstoken für den Administratorbereich (Supabase Auth).', fr: 'Le seul stockage utilisé concerne les jetons techniques d\'authentification indispensables à l\'espace administrateur (Supabase Auth).', es: 'El único almacenamiento utilizado corresponde a tokens técnicos de autenticación para el área administrativa (Supabase Auth).' },
  privacy_item4_title: { it: '📜 Licenza Open Source:', en: '📜 Open Source License:', de: '📜 Open-Source-Lizenz:', fr: '📜 Licence Open Source:', es: '📜 Licencia Open Source:' },
  privacy_item4_desc: { it: 'Il codice sorgente di questo progetto è rilasciato sotto licenza GNU General Public License v3.0 (GPL-3.0) senza alcuna garanzia.', en: 'The source code of this project is released under GNU General Public License v3.0 (GPL-3.0) without warranty of any kind.', de: 'Der Quellcode dieses Projekts steht unter der GNU General Public License v3.0 (GPL-3.0) ohne jegliche Gewährleistung.', fr: 'Le code source de ce projet est publié sous licence GNU General Public License v3.0 (GPL-3.0) sans aucune garantie.', es: 'El código fuente de este proyecto se publica bajo la licencia GNU General Public License v3.0 (GPL-3.0) sin ninguna garantía.' },
  privacy_btn_close: { it: 'Ho Compreso e Chiudi', en: 'I Understand & Close', de: 'Verstanden & Schließen', fr: 'J\'ai compris & Fermer', es: 'Entendido y Cerrar' }
};

const SUPPORTED_LANG_CODES = ['it', 'en', 'de', 'fr', 'es'];

const getInitialLanguage = () => {
  const saved = localStorage.getItem('scalve_lang');
  if (saved && SUPPORTED_LANG_CODES.includes(saved)) {
    return saved;
  }

  if (typeof navigator !== 'undefined') {
    const rawLang = (navigator.language || (navigator.languages && navigator.languages[0]) || '').slice(0, 2).toLowerCase();
    if (SUPPORTED_LANG_CODES.includes(rawLang)) {
      return rawLang;
    }
  }

  // Fallback ad Inglese ('en') se la lingua del browser non è supportata
  return 'en';
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage);

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
