import React, { useState, useEffect } from 'react';
import { CourseProvider } from './context/CourseContext';
import Sidebar from './components/Layout/Sidebar';
import Topbar from './components/Layout/Topbar';
import DashboardView from './components/Dashboard/DashboardView';
import CoursePlayerView from './components/CoursePlayer/CoursePlayerView';
import PracticeHub from './components/Practice/PracticeHub';
import VideoFolderModal from './components/Modals/VideoFolderModal';
import QuickSearchModal from './components/Modals/QuickSearchModal';
import CertificateModal from './components/Modals/CertificateModal';

function AppContent() {
  const [currentView, setCurrentView] = useState('courses'); // 'dashboard' | 'courses' | 'practice'
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Global keyboard shortcuts (Ctrl+K for search, Ctrl+M for theme)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        setIsDarkMode((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${isDarkMode ? 'dark bg-[#0e0e13]' : 'bg-gray-100'}`}>
      {/* Left Sidebar */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0d0d12]">
        {/* Topbar */}
        <Topbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          openSearchModal={() => setIsSearchModalOpen(true)}
          openFolderModal={() => setIsFolderModalOpen(true)}
        />

        {/* View Switcher: Dashboard, Courses, and LeetCode Practice */}
        <main className="flex-1 flex overflow-hidden">
          {currentView === 'dashboard' ? (
            <DashboardView setCurrentView={setCurrentView} />
          ) : currentView === 'practice' ? (
            <PracticeHub setCurrentView={setCurrentView} />
          ) : (
            <CoursePlayerView
              openFolderModal={() => setIsFolderModalOpen(true)}
              onOpenCertificate={() => setIsCertificateOpen(true)}
            />
          )}
        </main>
      </div>


      {/* Global Modals */}
      <VideoFolderModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
      />

      <QuickSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        setCurrentView={setCurrentView}
      />

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CourseProvider>
      <AppContent />
    </CourseProvider>
  );
}
