import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { DiagnosticTest } from './components/DiagnosticTest';
import { Course } from './types';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'diagnostic' | 'dashboard'>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('dashboard');
  };

  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view as 'home' | 'diagnostic' | 'dashboard')}
          onOpenDiagnostic={() => setCurrentView('diagnostic')}
        />

        <main style={{ flexGrow: 1 }}>
          {currentView === 'home' && (
            <Home
              onStartDiagnostic={() => setCurrentView('diagnostic')}
              onSelectCourse={handleSelectCourse}
            />
          )}

          {currentView === 'diagnostic' && (
            <DiagnosticTest
              onComplete={() => setCurrentView('dashboard')}
              onNavigateToPricing={() => {
                setCurrentView('home');
                setTimeout(() => {
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />
          )}

          {currentView === 'dashboard' && (
            <Dashboard
              onStartDiagnostic={() => setCurrentView('diagnostic')}
              selectedCourse={selectedCourse}
            />
          )}
        </main>
      </div>
    </AuthProvider>
  );
};
