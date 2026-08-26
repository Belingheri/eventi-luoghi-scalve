export const CATEGORIES = [
  { id: 'all', label: { it: 'Tutti i Luoghi', en: 'All Places', de: 'Alle Orte', fr: 'Tous les lieux', es: 'Todos los lugares' } },
  { id: 'trekking', label: { it: 'Trekking & Escursioni', en: 'Trekking & Hiking', de: 'Wandern & Trekking', fr: 'Randonnée & Trekking', es: 'Senderismo y Trekking' } },
  { id: 'storia', label: { it: 'Storia & Cultura', en: 'History & Culture', de: 'Geschichte & Kultur', fr: 'Histoire & Culture', es: 'Historia y Cultura' } },
  { id: 'natura', label: { it: 'Natura & Paesaggi', en: 'Nature & Landscapes', de: 'Natur & Landschaften', fr: 'Nature & Paysages', es: 'Naturaleza y Paisajes' } },
  { id: 'borghi', label: { it: 'Borghi & Tradizioni', en: 'Villages & Traditions', de: 'Dörfer & Traditionen', fr: 'Villages & Traditions', es: 'Pueblos y Tradiciones' } }
];

export const MUNICIPALITIES = [
  { id: 'all', name: { it: 'Tutti i Comuni', en: 'All Municipalities', de: 'Alle Gemeinden', fr: 'Toutes les communes', es: 'Todos los municipios' } },
  { id: 'schilpario', name: { it: 'Schilpario', en: 'Schilpario', de: 'Schilpario', fr: 'Schilpario', es: 'Schilpario' } },
  { id: 'vilminore', name: { it: 'Vilminore di Scalve', en: 'Vilminore di Scalve', de: 'Vilminore di Scalve', fr: 'Vilminore di Scalve', es: 'Vilminore di Scalve' } },
  { id: 'colere', name: { it: 'Colere', en: 'Colere', de: 'Colere', fr: 'Colere', es: 'Colere' } },
  { id: 'azzone', name: { it: 'Azzone', en: 'Azzone', de: 'Azzone', fr: 'Azzone', es: 'Azzone' } }
];

export const INITIAL_PLACES = [
  {
    id: 'diga-gleno',
    category: 'trekking',
    municipality: 'vilminore',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    coordinates: '46.0028, 10.0717',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=46.0028,10.0717',
    rating: 4.9,
    featured: true,
    title: {
      it: 'Ruderi della Diga del Gleno',
      en: 'Gleno Dam Ruins',
      de: 'Ruinen der Gleno-Talsperre',
      fr: 'Ruines du barrage del Gleno',
      es: 'Ruinas de la presa del Gleno'
    },
    description: {
      it: 'Un luogo mitico ed emozionante, testimonianza storica del crollo della diga nel 1923. Oggi è meta di una tra le escursioni trekking più panoramiche ed affascinanti delle Alpi Orobiche.',
      en: 'A mythical and moving site witnessing the historic collapse of the dam in 1923. Today it is one of the most scenic hiking destinations in the Orobie Alps.',
      de: 'Ein mystischer und bewegender Ort, der vom historischen Einsturz der Talsperre im Jahr 1923 zeugt. Heute ist er ein beliebtes Wanderziel in den Bergamasker Alpen.',
      fr: 'Un lieu mythique et émouvant, témoin de l\'effondrement historique du barrage en 1923. Aujourd\'hui, c\'est l\'une des randonnées les plus panoramiques des Alpes Orobies.',
      es: 'Un lugar mítico y conmovedor, testigo del colapso histórico de la presa en 1923. Hoy es uno de los destinos de senderismo más panorámicos de los Alpes Orobies.'
    },
    practicalInfo: {
      it: 'Percorso raggiungibile a piedi da Vilminore (frazione Pianezza). Tempo di percorrenza: circa 1h 15m. Dislivello: +300m. Consigliati scarponcini da trekking.',
      en: 'Hike accessible on foot from Vilminore (Pianezza hamlet). Walking time: approx. 1h 15m. Elevation gain: +300m. Hiking boots recommended.',
      de: 'Zu Fuß erreichbar von Vilminore (Ortsteil Pianezza). Gehzeit: ca. 1 Std. 15 Min. Höhenmeter: +300m. Wanderschuhe empfohlen.',
      fr: 'Sentier accessible à pied depuis Vilminore (hameau Pianezza). Durée: env. 1h 15m. Dénivelé: +300m. Chaussures de rando conseillées.',
      es: 'Ruta accesible a pie desde Vilminore (aldea Pianezza). Tiempo de caminata: aprox. 1h 15m. Desnivel: +300m. Calzado de montaña recomendado.'
    }
  },
  {
    id: 'miniere-schilpario',
    category: 'storia',
    municipality: 'schilpario',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    coordinates: '46.0125, 10.1583',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=46.0125,10.1583',
    externalLinkUrl: 'https://www.miniereschilpario.it',
    externalLinkLabel: {
      it: 'Sito Ufficiale Miniere',
      en: 'Official Mining Site',
      de: 'Offizielle Bergbau-Website',
      fr: 'Site Officiel de la Mine',
      es: 'Sitio Web Oficial'
    },
    rating: 4.8,
    featured: true,
    title: {
      it: 'Parco Minerario di Schilpario',
      en: 'Schilpario Mining Park',
      de: 'Bergbaupark Schilpario',
      fr: 'Parc minier de Schilpario',
      es: 'Parque Minero de Schilpario'
    },
    description: {
      it: 'Un viaggio nel cuore della terra a bordo del trenino dei minatori. Oltre 2 km di gallerie illuminate guidano i visitatori alla scoperta della dura vita nell\'estrazione del ferro.',
      en: 'A journey into the heart of the earth aboard the miners\' train. Over 2 km of lit tunnels guide visitors to discover the historic iron mining history.',
      de: 'Eine Reise in das Herz der Erde an Bord des Bergarbeiterzuges. Über 2 km beleuchtete Stollen führen durch die Geschichte des Eisenerzabbaus.',
      fr: 'Un voyage au cœur de la terre à bord du petit train des mineurs. Plus de 2 km de galeries éclairées font découvrir l\'histoire de l\'extraction du fer.',
      es: 'Un viaje al corazón de la tierra a bordo del tren de los mineros. Más de 2 km de galerías iluminadas muestran la historia de la extracción del hierro.'
    },
    practicalInfo: {
      it: 'Visite guidate su prenotazione. Temperatura interna di 7°C costante: si raccomanda abbigliamento caldo e giacca impermeabile.',
      en: 'Guided tours by reservation. Constant internal temperature of 7°C: warm clothing and waterproof jacket recommended.',
      de: 'Führungen auf Anfrage. Kontinuierliche Innentemperatur von 7°C: Warme Kleidung und Regenjacke empfohlen.',
      fr: 'Visites guidées sur réservation. Température intérieure constante de 7°C: vêtements chauds et veste imperméable recommandés.',
      es: 'Visitas guiadas previa reserva. Temperatura interna constante de 7°C: se recomienda ropa de abrigo y chaqueta impermeable.'
    }
  },
  {
    id: 'cascate-vo',
    category: 'natura',
    municipality: 'schilpario',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    coordinates: '46.0053, 10.1342',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=46.0053,10.1342',
    rating: 4.7,
    featured: true,
    title: {
      it: 'Cascate del Vò',
      en: 'Vò Waterfalls',
      de: 'Vò-Wasserfälle',
      fr: 'Cascades du Vò',
      es: 'Cascadas del Vò'
    },
    description: {
      it: 'Spettacolare salto d\'acqua immerso nelle abetaie della Val di Scalve. Facilmente raggiungibile con una passeggiata adatta anche alle famiglie.',
      en: 'A spectacular waterfall nestled in the pine forests of Scalve Valley. Easily accessible via a pleasant walk suitable for families.',
      de: 'Ein spektakulärer Wasserfall inmitten der Fichtenwälder des Scalvetals. Leicht erreichbar über einen familienfreundlichen Spazierweg.',
      fr: 'Une cascade spectaculaire nichée au cœur dei forêts de sapins de la Val di Scalve. Accessible par une promenade adaptée aux familles.',
      es: 'Una cascada espectacular rodeada de abetales en el Valle di Scalve. Fácilmente accesible mediante un paseo ideal para familias.'
    },
    practicalInfo: {
      it: 'Partenza dallo chalet di Schilpario. Percorso pianeggiante di circa 40 minuti lungo il torrente Vò. Area pic-nic attrezzata.',
      en: 'Starting from Schilpario chalet. Flat 40-minute trail along the stream. Equipped picnic area.',
      de: 'Start beim Chalet Schilpario. Flacher, 40-minütiger Weg entlang des Baches. Picknickplatz vorhanden.',
      fr: 'Départ du chalet de Schilpario. Sentier plat d\'environ 40 min le long du torrent. Aire de pique-nique équipée.',
      es: 'Salida desde el chalet de Schilpario. Ruta llana de unos 40 minutos a lo largo del arroyo. Zona de picnic equipada.'
    }
  },
  {
    id: 'passo-vivione',
    category: 'natura',
    municipality: 'schilpario',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    coordinates: '46.0333, 10.2000',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=46.0333,10.2000',
    rating: 4.9,
    featured: false,
    title: {
      it: 'Passo del Vivione (1828 m)',
      en: 'Vivione Pass (1828 m)',
      de: 'Vivione-Pass (1828 m)',
      fr: 'Col del Vivione (1828 m)',
      es: 'Paso del Vivione (1828 m)'
    },
    description: {
      it: 'Valico alpino mozzafiato che collega la Val di Scalve alla Val Camonica. Punto di partenza per escursioni ai laghi alpini e al rifugio.',
      en: 'Breathtaking mountain pass connecting Scalve Valley to Val Camonica. Ideal starting point for hikes to alpine lakes and refuges.',
      de: 'Spektakulärer Alpenpass, der das Scalvetal mit dem Val Camonica verbindet. Ausgangspunkt für Wanderungen zu Bergseen.',
      fr: 'Col alpin spectaculaire reliant la Val di Scalve au Val Camonica. Point de départ ideal pour les randonnées vers les lacs de montagne.',
      es: 'Espectacular puerto de montaña que conecta el Valle di Scalve con Val Camonica. Punto de partida hacia lagos alpinos y refugios.'
    },
    practicalInfo: {
      it: 'Aperto nel periodo estivo (Maggio-Ottobre). Presente rifugio con ristorante panoramico e parcheggio in quota.',
      en: 'Open during summer (May-October). Refuge available with panoramic restaurant and high-altitude parking.',
      de: 'Im Sommer geöffnet (Mai-Oktober). Berggasthof mit Panoramarestaurant vorhanden.',
      fr: 'Ouvert en été (Mai-Octobre). Refuge avec restaurant panoramique et parking.',
      es: 'Abierto en verano (Mayo-Octubre). Refugio con restaurante panorámico y aparcamiento.'
    }
  },
  {
    id: 'colere-ski',
    category: 'natura',
    municipality: 'colere',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80',
    coordinates: '45.9750, 10.0833',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=45.9750,10.0833',
    rating: 4.8,
    featured: false,
    title: {
      it: 'Colere Infinite Mountain 2200',
      en: 'Colere Ski & Trail Resort',
      de: 'Skigebiet Colere 2200',
      fr: 'Station de Ski Colere 2200',
      es: 'Estación de Esquí Colere 2200'
    },
    description: {
      it: 'Moderna stazione sciistica ai piedi della grandiosa parete nord della Presolana. In estate offre percorsi per downhill, e-bike e trekking in quota.',
      en: 'Modern ski resort at the foot of the impressive north face of Presolana. Summer activity includes downhill mountain biking, e-biking and high altitude hiking.',
      de: 'Modernes Skigebiet am Fuße der gewaltigen Presolana-Nordwand. Im Sommer ideal für E-Bike und Höhenwanderungen.',
      fr: 'Station moderne au pied de la majestueuse face nord de la Presolana. En été: VTT électrique, downhill et randonnée.',
      es: 'Estación moderna al pie de la pared norte de la Presolana. En verano ofrece rutas para e-bike y senderismo de alta montaña.'
    },
    practicalInfo: {
      it: 'Impianti di risalita di ultima generazione a cabinovia. Noleggio attrezzatura alla partenza di Carbonera.',
      en: 'State-of-the-art cable car lifts. Equipment rental available at the Carbonera base station.',
      de: 'Moderne Gondelbahnen. Ausrüstungsverleih an der Talstation Carbonera.',
      fr: 'Télécabines modernes de dernière génération. Location de matériel disponible au départ de Carbonera.',
      es: 'Telecabinas de última generación. Alquiler de material en la base de Carbonera.'
    }
  },
  {
    id: 'museo-etnografico',
    category: 'storia',
    municipality: 'schilpario',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
    coordinates: '46.0100, 10.1550',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=46.0100,10.1550',
    rating: 4.6,
    featured: false,
    title: {
      it: 'Museo Etnografico di Schilpario',
      en: 'Schilpario Ethnographic Museum',
      de: 'Volkskundemuseum Schilpario',
      fr: 'Musée Ethnographique de Schilpario',
      es: 'Museo Etnográfico de Schilpario'
    },
    description: {
      it: 'Una straordinaria collezione di oggetti, attrezzi e testimonianze della vita contadina, artigianale e comunitaria della montagna scalvina nei secoli scorsi.',
      en: 'An extraordinary collection of tools and historic items witnessing alpine farm and artisan life in Scalve Valley across the centuries.',
      de: 'Eine beeindruckende Sammlung von Werkzeugen und Gegenständen des alpinen Bauern- und Handwerkslebens.',
      fr: 'Une collection extraordinaire d\'outils et témoignages de la vie paysanne et artisanale des siècles passés.',
      es: 'Una extraordinaria colección de herramientas y objetos históricos que muestran la vida campesina y artesanal de la montaña.'
    },
    practicalInfo: {
      it: 'Aperto nei weekend e durante i periodi festivi. Disponibili visite per gruppi su prenotazione.',
      en: 'Open on weekends and holidays. Group visits available upon request.',
      de: 'An Wochenenden und Feiertagen geöffnet. Gruppenführungen auf Anfrage.',
      fr: 'Ouvert les week-ends et jours fériés. Visites de groupe sur réservation.',
      es: 'Abierto fines de semana y festivos. Visitas para grupos bajo reserva.'
    }
  },
  {
    id: 'giovetto-paline',
    category: 'natura',
    municipality: 'azzone',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    coordinates: '45.9667, 10.1167',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=45.9667,10.1167',
    rating: 4.7,
    featured: false,
    title: {
      it: 'Riserva Naturale Giovetto di Paline',
      en: 'Giovetto di Paline Nature Reserve',
      de: 'Naturschutzgebiet Giovetto di Paline',
      fr: 'Réserve Naturelle Giovetto di Paline',
      es: 'Reserva Natural Giovetto di Paline'
    },
    description: {
      it: 'Area protetta regionale famosa per la protezione della formica rufa. Boschi incontaminati e sentieri didattici perfetti per il birdwatching e il relax.',
      en: 'Regional protected area famous for the preservation of the red wood ant (Formica rufa). Unspoiled forests and educational trails.',
      de: 'Regionales Schutzgebiet, bekannt für den Schutz der Roten Waldameise. Unberührte Wälder und Lehrpfade.',
      fr: 'Réserve naturelle régionale réputée pour la protection des fourmis rousses. Forêts préservées et sentiers pédagogiques.',
      es: 'Área protegida regional famosa por la conservación de la hormiga roja. Bosques virgenes y senderos educativos.'
    },
    practicalInfo: {
      it: 'Accesso libero tutto l\'anno. Centro visitatori aperto nei mesi estivi.',
      en: 'Free access year-round. Visitor center open during summer months.',
      de: 'Ganzjährig frei zugänglich. Besucherzentrum im Sommer geöffnet.',
      fr: 'Accès libre toute l\'année. Centre des visiteurs ouvert en été.',
      es: 'Acceso libre todo el año. Centro de visitantes abierto en verano.'
    }
  }
];

export const INITIAL_EVENTS = [
  {
    id: 'sagra-capu-2026',
    date: '2026-09-12',
    time: '18:30',
    location: 'Piazza Just, Schilpario',
    municipality: 'schilpario',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Pro Loco Schilpario',
    title: {
      it: '30ª Sagra dei Capù e del Fieno',
      en: '30th Capù & Hay Festival',
      de: '30. Fest der Capù & des Heus',
      fr: '30ème Fête des Capù et du Foin',
      es: '30ª Fiesta de los Capù y del Heno'
    },
    description: {
      it: 'La celebre festa gastronomica dedicata ai "Capù" (involtini di verza ripieni tradizionali scalvini), accompagnata da musica dal vivo, mercatini e rievocazione dei mestieri di una volta.',
      en: 'The famous gastronomic festival dedicated to "Capù" (traditional stuffed cabbage rolls), accompanied by live music, artisanal markets and folk traditions.',
      de: 'Das berühmte Gastronomiefest rund um die "Capù" (gefüllte Wirsingrouladen), mit Live-Musik und traditionellem Handwerk.',
      fr: 'La célèbre fête gastronomique dédiée aux "Capù" (choux farcis traditionnels), avec musique live et marché artisanal.',
      es: 'La famosa fiesta gastronómica dedicada a los "Capù" (rollos de col rellenos tradicionales), con música en vivo y mercado.'
    }
  },
  {
    id: 'gleno-trail-2026',
    date: '2026-10-04',
    time: '09:00',
    location: 'Piazza Cesare Battisti, Vilminore',
    municipality: 'vilminore',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80',
    organizer: 'G.S. Scalve Running',
    externalLinkUrl: 'https://www.scalverunning.it',
    externalLinkLabel: {
      it: 'Iscrizioni & Regolamento',
      en: 'Registration & Rules',
      de: 'Anmeldung & Reglement',
      fr: 'Inscriptions & Règlement',
      es: 'Inscripciones y Reglamento'
    },
    title: {
      it: 'Gleno Trail & Walk 2026',
      en: 'Gleno Mountain Trail 2026',
      de: 'Gleno Bergrennen 2026',
      fr: 'Trail du Gleno 2026',
      es: 'Carrera de Montaña Gleno 2026'
    },
    description: {
      it: 'Corsa in montagna e camminata non competitiva di 18km con passaggio spettacolare ai ruderi della Diga del Gleno. Ristoro finale con prodotti tipici locali.',
      en: '18km mountain running race and non-competitive walk passing right by the iconic Gleno Dam ruins. Local food tasting at the finish line.',
      de: '18 km Berglauf und Volksmarsch mit Vorbeilauf an den eindrucksvollen Ruinen der Gleno-Talsperre. Zielverpflegung mit regionalen Spezialitäten.',
      fr: 'Course en montagne de 18 km et marche non compétitive passant par les ruines du barrage del Gleno. Dégustation finale.',
      es: 'Carrera de montaña de 18 km y marcha no competitiva pasando por las ruinas de la Presa del Gleno. Degustación final de productos locales.'
    }
  },
  {
    id: 'mercatini-natale-2026',
    date: '2026-12-19',
    time: '10:00',
    location: 'Piazza Risorgimento, Colere',
    municipality: 'colere',
    image: 'https://images.unsplash.com/photo-1543589077-47d5199647ce?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Pro Loco Colere',
    title: {
      it: 'Mercatini di Natale e Sci in Quota',
      en: 'Christmas Markets & Alpine Ski',
      de: 'Weihnachtsmarkt & Skivergnügen',
      fr: 'Marché de Noël & Ski en altitude',
      es: 'Mercado de Navidad y Esquí en la Cumbre'
    },
    description: {
      it: 'Atmosfera magica tra casette in legno, vin brulé, prodotti di artigianato locale e la possibilità di sciare sulle piste innevate di Colere.',
      en: 'Magical atmosphere with wooden chalets, mulled wine, local crafts and ski opportunities on the slopes of Colere.',
      de: 'Magische Atmosphäre mit Holzhütten, Glühwein, lokalem Kunsthandwerk und Skispaß auf den Pisten.',
      fr: 'Atmosphère magique avec chalets en bois, vin chaud, artisanat local et ski sur les pistes enneigées.',
      es: 'Ambiente mágico con casetas de madera, vino caliente, artesanía local y esquí en las pistas de Colere.'
    }
  },
  {
    id: 'festa-formagella-2026-past',
    date: '2026-05-15',
    time: '10:00',
    location: 'Azzone Centro',
    municipality: 'azzone',
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Comune di Azzone',
    title: {
      it: 'Festa della Formagella Scalvina (Edizione Primaverile)',
      en: 'Scalvina Cheese Festival (Spring Edition)',
      de: 'Käsefest der Formagella Scalvina',
      fr: 'Fête du Fromage Scalvina',
      es: 'Fiesta del Queso Formagella Scalvina'
    },
    description: {
      it: 'Degustazione e laboratorio di produzione della formagella e dei formaggi tipici di malga della Val di Scalve.',
      en: 'Tasting and workshop on traditional Scalve valley cheeses and mountain formagella.',
      de: 'Verkostung und Workshop zur Herstellung von traditionellem Scalve-Käse und Almkäse.',
      fr: 'Dégustation et atelier de fabrication des fromages traditionnels et de la formagella della Val di Scalve.',
      es: 'Cata y taller de elaboración de queso tradicional e formagella de la Val di Scalve.'
    }
  }
];
