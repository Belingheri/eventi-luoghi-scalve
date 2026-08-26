import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import Header from './components/Header';
import HomeView from './views/HomeView';
import PlacesView from './views/PlacesView';
import EventsView from './views/EventsView';
import AdminView from './views/AdminView';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedMunicipalityFilter, setSelectedMunicipalityFilter] = useState('all');

  return (
    <LanguageProvider>
      <DataProvider>
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
          
          {/* Header Bar */}
          <Header currentView={currentView} setCurrentView={setCurrentView} />

          {/* Main Content Area */}
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
            {currentView === 'home' && (
              <HomeView 
                setCurrentView={setCurrentView} 
                setSelectedMunicipalityFilter={setSelectedMunicipalityFilter} 
              />
            )}
            {currentView === 'places' && (
              <PlacesView 
                initialMunicipality={selectedMunicipalityFilter} 
              />
            )}
            {currentView === 'events' && (
              <EventsView />
            )}
            {currentView === 'admin' && (
              <AdminView />
            )}
          </main>

        </div>
      </DataProvider>
    </LanguageProvider>
  );
}
