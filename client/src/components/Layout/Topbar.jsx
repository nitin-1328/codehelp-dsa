import React from 'react';
import {
  Search,
  Bell,
  Radio,
  FolderOpen,
  ChevronRight,
  PanelLeft,
  Sparkles
} from 'lucide-react';
import { useCourse } from '../../context/CourseContext';

export default function Topbar({ currentView, setCurrentView, openSearchModal, openFolderModal }) {
  const { currentLesson, currentModule, progress } = useCourse();

  return (
    <header className="h-14 bg-[#111116] border-b border-[#21222d] px-5 flex items-center justify-between flex-shrink-0 select-none sticky top-0 z-30">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2.5 text-xs text-[#828699]">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="hover:text-white transition-colors"
        >
          <PanelLeft className="w-4 h-4 text-[#6e7287] hover:text-white" />
        </button>

        <span
          className="hover:text-white cursor-pointer transition-colors"
          onClick={() => setCurrentView('dashboard')}
        >
          Home
        </span>
        <ChevronRight className="w-3 h-3 text-[#454859]" />

        {currentView === 'dashboard' ? (
          <span className="text-white font-medium">Dashboard</span>
        ) : currentView === 'practice' ? (
          <>
            <span
              className="hover:text-white cursor-pointer transition-colors"
              onClick={() => setCurrentView('practice')}
            >
              Practice
            </span>
            <ChevronRight className="w-3 h-3 text-[#454859]" />
            <span className="text-white font-medium">LeetCode Problem Suggestions</span>
          </>
        ) : (
          <>
            <span
              className="hover:text-white cursor-pointer transition-colors"
              onClick={() => setCurrentView('courses')}
            >
              Courses
            </span>
            <ChevronRight className="w-3 h-3 text-[#454859]" />
            <span className="text-[#828699] truncate max-w-[120px] hidden sm:inline">
              {currentModule?.title || '...'}
            </span>
            <ChevronRight className="w-3 h-3 text-[#454859] hidden sm:inline" />
            <span className="text-white font-medium truncate max-w-[200px] md:max-w-[300px]">
              {currentLesson?.title || 'LC 179 Largest Numbe...'}
            </span>
          </>
        )}

      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <button
          onClick={openSearchModal}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#181922] border border-[#272838] hover:border-[#3d3f57] text-[#828699] text-xs transition-all w-48 md:w-60 justify-between group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#6c7085] group-hover:text-white transition-colors" />
            <span className="text-[#727588]">Search...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#21222f] text-[#8e92a8] rounded border border-[#2d2f42]">
            Ctrl K
          </kbd>
        </button>

        {/* Video Folder Link Button */}
        <button
          onClick={openFolderModal}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            progress.videoFolder
              ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-400 hover:bg-emerald-900/40'
              : 'bg-[#181922] border-[#272838] text-[#9ca0b0] hover:text-white hover:border-[#3d3f57]'
          }`}
          title={progress.videoFolder ? `Linked to: ${progress.videoFolder}` : 'Link your downloaded video folder'}
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">
            {progress.videoFolder ? 'Videos Linked' : 'Link Videos'}
          </span>
          {progress.videoFolder && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg text-[#828699] hover:text-white hover:bg-[#181922] transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 px-1 min-w-[15px] h-[15px] rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-[#111116]">
            9+
          </span>
        </button>

        {/* Live Dashboard Button */}
        <button
          onClick={() => setCurrentView(currentView === 'dashboard' ? 'courses' : 'dashboard')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            currentView === 'dashboard'
              ? 'bg-[#1f202c] border-[#36384d] text-white hover:bg-[#282a3a]'
              : 'bg-[#181922] border-[#272838] text-[#b4b7c9] hover:text-white hover:border-[#3e415a]'
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>Live Dashboard</span>
        </button>
      </div>
    </header>
  );
}
