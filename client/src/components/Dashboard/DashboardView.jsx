import React, { useState } from 'react';
import {
  Film,
  CheckCircle2,
  Clock,
  PlayCircle,
  Bookmark,
  Code2,
  Calendar,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useCourse } from '../../context/CourseContext';

export default function DashboardView({ setCurrentView }) {
  const {
    curriculum,
    progress,
    currentLesson,
    currentModule,
    selectLesson,
    allLessons,
    progressPercent,
    completedCount,
    totalLessons
  } = useCourse();

  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'modules' | 'bookmarks'

  const completedSet = new Set(progress.completedLessons || []);
  const solvedCount = (progress.solvedProblems || []).length;
  const bookmarkedLessons = allLessons.filter(l => progress.bookmarks?.includes(l.id));

  // Calculate total hours estimated (45m average per video)
  const totalHours = Math.round((totalLessons * 45) / 60);
  const watchedHours = Math.round((completedCount * 45) / 60);

  // Weekly study data: videos watched this week
  const weeklyActivity = [
    { day: 'Mon', videos: 0 },
    { day: 'Tue', videos: 0 },
    { day: 'Wed', videos: 0 },
    { day: 'Thu', videos: 0 },
    { day: 'Fri', videos: 0 },
    { day: 'Sat', videos: 0 },
    { day: 'Sun', videos: completedCount }
  ];


  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Course Progress Report</h1>
          <p className="text-sm text-[#828699] mt-1">
            Real-time track of your completed lectures, study hours, and DSA preparation.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('courses')}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-all self-start sm:self-auto shadow-md shadow-purple-600/25"
        >
          <PlayCircle className="w-4 h-4" />
          <span>Resume Current Video</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#21222e] pb-3">
        {[
          { id: 'summary', label: 'Overview Report' },
          { id: 'modules', label: 'All Modules Progress' },
          { id: 'bookmarks', label: `Bookmarks (${bookmarkedLessons.length})` }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#22232f] text-white shadow-sm'
                  : 'text-[#828699] hover:text-white hover:bg-[#161720]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'summary' && (
        <>
          {/* Top 4 Progress Report Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Videos Watched */}
            <div className="bg-[#14141b] border border-[#21222e] rounded-xl p-5 relative overflow-hidden group hover:border-[#35374b] transition-all">
              <div className="flex items-center justify-between text-[#8a8ea2] text-xs font-medium mb-3">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-purple-400" />
                  <span>Videos Watched</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300">
                  {progressPercent}%
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
                  {completedCount}
                </span>
                <span className="text-xs text-[#73778c]">of {totalLessons} videos</span>
              </div>
              <div className="w-full bg-[#1e202b] h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  style={{ width: `${progressPercent}%` }}
                  className="bg-purple-500 h-full rounded-full transition-all duration-500"
                />
              </div>
            </div>

            {/* 2. Course Completed */}
            <div className="bg-[#14141b] border border-[#21222e] rounded-xl p-5 relative overflow-hidden group hover:border-[#35374b] transition-all">
              <div className="flex items-center justify-between text-[#8a8ea2] text-xs font-medium mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Course Completed</span>
                </div>
                <span className="text-xs font-semibold text-emerald-400">On Track</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-emerald-400 tracking-tight font-mono">
                  {progressPercent}%
                </span>
                <span className="text-xs text-[#73778c]">{totalLessons - completedCount} videos left</span>
              </div>
              <div className="w-full bg-[#1e202b] h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  style={{ width: `${progressPercent}%` }}
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                />
              </div>
            </div>

            {/* 3. Study Hours */}
            <div className="bg-[#14141b] border border-[#21222e] rounded-xl p-5 relative overflow-hidden group hover:border-[#35374b] transition-all">
              <div className="flex items-center justify-between text-[#8a8ea2] text-xs font-medium mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Watch Time</span>
                </div>
                <span className="text-xs text-[#8a8ea2]">Estimated</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
                  {watchedHours} hrs
                </span>
                <span className="text-xs text-[#73778c]">of ~{totalHours} hrs</span>
              </div>
              <div className="w-full bg-[#1e202b] h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  style={{ width: `${(watchedHours / totalHours) * 100}%` }}
                  className="bg-blue-500 h-full rounded-full transition-all duration-500"
                />
              </div>
            </div>

            {/* 4. LeetCode Practice */}
            <div className="bg-[#14141b] border border-[#21222e] rounded-xl p-5 relative overflow-hidden group hover:border-[#35374b] transition-all">
              <div className="flex items-center justify-between text-[#8a8ea2] text-xs font-medium mb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <span>LeetCode Solved</span>
                </div>
                <button
                  onClick={() => setCurrentView('practice')}
                  className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-0.5"
                >
                  <span>Practice</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
                  {solvedCount}
                </span>
                <span className="text-xs text-amber-400 font-semibold">Problems Done</span>
              </div>
              <div className="w-full bg-[#1e202b] h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  style={{ width: `${Math.min(100, (solvedCount / 50) * 100)}%` }}
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Continue Watching Card */}
          <div className="bg-gradient-to-r from-[#171824] via-[#1a1b2a] to-[#171824] border border-[#2a2c3d] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                <PlayCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-purple-400 uppercase">
                  Current Lesson
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {currentLesson?.title || 'Intro to C++'}
                </h3>
                <p className="text-xs text-[#828699] mt-0.5">
                  Module: {currentModule?.title || 'Learn C++'} • Duration: {currentLesson?.duration || '45:00'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('courses')}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-lg shadow-purple-600/25 flex items-center gap-2 flex-shrink-0"
            >
              <span>Play Video Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekly Videos Completed Chart */}
          <div className="bg-[#14141b] border border-[#21222e] rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  Videos Completed This Week
                </h2>
                <p className="text-xs text-[#828699] mt-0.5">
                  Daily consistency tracking for your DSA prep
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-[#1a1c29] border border-[#2f3248] text-xs font-semibold text-purple-300">
                  Total This Week: {weeklyActivity.reduce((acc, c) => acc + c.videos, 0)} videos
                </span>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="relative pt-4">
              <div className="h-44 flex flex-col justify-between text-[11px] text-[#55586b] font-mono select-none">
                {[4, 3, 2, 1, 0].map((val) => (
                  <div key={val} className="flex items-center gap-4">
                    <span className="w-6 text-right">{val}</span>
                    <div className="flex-1 border-b border-[#1c1d29]" />
                  </div>
                ))}
              </div>

              <div className="absolute inset-x-0 bottom-0 left-10 h-44 flex items-end justify-around px-4">
                {weeklyActivity.map((item, idx) => {
                  const maxVal = 4;
                  const heightPercent = Math.min(100, (item.videos / maxVal) * 100);

                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="flex items-end h-36">
                        <div
                          style={{ height: `${Math.max(8, heightPercent)}%` }}
                          className={`w-8 sm:w-12 rounded-t-md transition-all relative ${
                            item.videos > 0
                              ? 'bg-gradient-to-t from-purple-700 to-indigo-500 group-hover:brightness-125'
                              : 'bg-[#222433]'
                          }`}
                          title={`${item.day}: ${item.videos} videos watched`}
                        >
                          {item.videos > 0 && (
                            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white font-mono">
                              {item.videos}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[11px] text-[#71758a] font-medium group-hover:text-white transition-colors">
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modules Breakdown Tab */}
      {(activeTab === 'modules' || activeTab === 'summary') && (
        <div className="bg-[#14141b] border border-[#21222e] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Film className="w-5 h-5 text-purple-400" />
              Module Completion Breakdown ({curriculum?.modules?.length || 23} Modules)
            </h2>
            <span className="text-xs text-[#828699]">
              Click any module to continue watching
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {(curriculum?.modules || []).map((mod) => {
              const modLessons = mod.lessons || [];
              const modCompleted = modLessons.filter(l => completedSet.has(l.id)).length;
              const modPercent = modLessons.length > 0 ? Math.round((modCompleted / modLessons.length) * 100) : 0;
              const isAllDone = modCompleted === modLessons.length && modLessons.length > 0;

              return (
                <div
                  key={mod.id}
                  onClick={() => {
                    const firstUnwatched = modLessons.find(l => !completedSet.has(l.id)) || modLessons[0];
                    if (firstUnwatched) selectLesson(firstUnwatched.id);
                    setCurrentView('courses');
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer group ${
                    isAllDone
                      ? 'bg-emerald-950/15 border-emerald-900/40 hover:border-emerald-500/60'
                      : 'bg-[#171822] border-[#252636] hover:border-purple-500/50 hover:bg-[#1a1c2a]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors truncate pr-2">
                      {mod.title}
                    </h3>
                    <span className="text-xs font-mono font-bold text-purple-400 flex-shrink-0">
                      {modPercent}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#717589] mb-2 font-mono">
                    <span>
                      {modCompleted} / {modLessons.length} Videos Watched
                    </span>
                    {isAllDone && (
                      <span className="text-emerald-400 text-[11px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    )}
                  </div>

                  <div className="w-full bg-[#202230] h-1.5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${modPercent}%` }}
                      className={`h-full rounded-full transition-all duration-300 ${
                        isAllDone ? 'bg-emerald-500' : 'bg-purple-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bookmarks Tab */}
      {activeTab === 'bookmarks' && (
        <div className="bg-[#14141b] border border-[#21222e] rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-purple-400 fill-purple-400" />
            Bookmarked Lessons ({bookmarkedLessons.length})
          </h2>
          <p className="text-xs text-[#828699] mb-6">
            Quickly return to important concepts, tricky interview questions, and revision lectures.
          </p>

          {bookmarkedLessons.length === 0 ? (
            <div className="text-center py-12 text-[#6a6d80] text-sm">
              No lessons bookmarked yet. Click the bookmark icon in the video player to save lessons here.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bookmarkedLessons.map((les) => (
                <div
                  key={les.id}
                  onClick={() => {
                    selectLesson(les.id);
                    setCurrentView('courses');
                  }}
                  className="p-4 rounded-lg bg-[#181922] border border-[#262838] hover:border-purple-500/50 hover:bg-[#1e1f2c] cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                      {les.moduleTitle}
                    </span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {les.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-[#717589]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {les.duration}
                      </span>
                    </div>
                  </div>
                  <PlayCircle className="w-6 h-6 text-[#5f637a] group-hover:text-purple-400 transition-colors" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
