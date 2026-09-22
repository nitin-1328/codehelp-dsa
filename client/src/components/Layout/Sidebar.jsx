import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Code2,
  ChevronRight,
  Sun,
  Moon,
  Flame,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView, isDarkMode, setIsDarkMode }) {
  // Only keep Dashboard, Courses, and Practice as explicitly requested
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'practice', label: 'Practice', icon: Code2, badge: 'LeetCode' },
  ];

  return (
    <aside className="w-64 bg-[#111116] border-r border-[#21222d] flex flex-col flex-shrink-0 select-none min-h-screen">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-5 gap-3 border-b border-[#21222d]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-red-500/20">
          <Flame className="w-5 h-5 text-white fill-white" />
        </div>
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
          <span className="text-xl font-bold tracking-tight text-white font-sans">CodeHelp</span>
        </div>
      </div>

      {/* Main Navigation: Focused on Dashboard, Courses, and Practice */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-[#1e1f2b] text-white shadow-sm'
                  : 'text-[#9ca0b0] hover:text-white hover:bg-[#171822]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-purple-400' : 'text-[#828699] group-hover:text-white'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-purple-900/50 text-purple-300 border border-purple-700/40">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-[#21222d] space-y-2">
        {/* Theme Switcher */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#9ca0b0] hover:text-white hover:bg-[#171822] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#1f202b] text-[#787c91] rounded border border-[#2b2d3d]">
            Ctrl M
          </kbd>
        </button>

        {/* User Profile Card */}
        <div className="flex items-center gap-3 p-2 rounded-lg bg-[#161720] border border-[#242533] hover:border-[#35364b] transition-colors">
          <div className="w-8 h-8 rounded-full bg-emerald-600/25 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-semibold text-xs flex-shrink-0">
            S
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">Siddharth Rastogi</p>
            <p className="text-[11px] text-[#717588] truncate">siddharth06341@...</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
        </div>
      </div>
    </aside>
  );
}
