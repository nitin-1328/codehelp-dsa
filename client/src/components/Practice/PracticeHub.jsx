import React, { useState } from 'react';
import {
  Code2,
  ExternalLink,
  CheckCircle2,
  Circle,
  Lightbulb,
  Search,
  Filter,
  PlayCircle,
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Flame,
  Check,
  Award
} from 'lucide-react';
import { useCourse } from '../../context/CourseContext';
import { getAllPracticeProblems, practiceProblemsDatabase } from '../../data/practiceProblems';

export default function PracticeHub({ setCurrentView }) {
  const { currentLesson, currentModule, progress, toggleProblemSolved, selectLesson } = useCourse();
  const [selectedModuleFilter, setSelectedModuleFilter] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openHints, setOpenHints] = useState({});

  const allProblems = getAllPracticeProblems();
  const solvedSet = new Set(progress.solvedProblems || []);

  const toggleHint = (id) => {
    setOpenHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter problems
  const filteredProblems = allProblems.filter((p) => {
    const matchesModule =
      selectedModuleFilter === 'all'
        ? true
        : selectedModuleFilter === 'current'
        ? p.moduleId === currentModule?.id
        : p.moduleId === selectedModuleFilter;

    const matchesDifficulty =
      selectedDifficulty === 'all' ? true : p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.pattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(p.lcNumber).includes(searchQuery);

    return matchesModule && matchesDifficulty && matchesSearch;
  });

  const solvedCount = allProblems.filter(p => solvedSet.has(p.id)).length;
  const practicePercent = Math.round((solvedCount / (allProblems.length || 1)) * 100);

  // Current lecture specific problems
  const currentLectureProblems = currentModule?.id ? (practiceProblemsDatabase[currentModule.id] || []) : [];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#21222e] pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Code2 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">LeetCode Practice Hub</h1>
          </div>
          <p className="text-sm text-[#828699] mt-1.5">
            Targeted LeetCode practice problems recommended after each video to solidify your DSA concepts.
          </p>
        </div>

        {/* Solved Stats Card */}
        <div className="flex items-center gap-4 bg-[#14141b] border border-[#232433] rounded-xl px-5 py-3">
          <div>
            <span className="text-[11px] font-semibold text-[#8b8fa3] uppercase tracking-wider block">
              LeetCode Solved
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                {solvedCount}
              </span>
              <span className="text-xs text-[#6e7287]">/ {allProblems.length} Problems</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-[#2b2d42] flex items-center justify-center text-xs font-bold text-white bg-[#1a1b26]">
            {practicePercent}%
          </div>
        </div>
      </div>

      {/* Current Video Recommendation Highlight */}
      {currentLectureProblems.length > 0 && (
        <div className="bg-gradient-to-r from-purple-950/30 via-[#181926] to-[#14141d] border border-purple-500/30 rounded-2xl p-5 space-y-3 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                Recommended For Current Lecture: {currentLesson?.title || currentModule?.title}
              </span>
            </div>
            <button
              onClick={() => setSelectedModuleFilter('current')}
              className="text-xs text-purple-400 hover:text-purple-300 underline font-semibold text-left sm:text-right"
            >
              Filter to this module ({currentLectureProblems.length} problems)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {currentLectureProblems.slice(0, 3).map((prob) => {
              const isSolved = solvedSet.has(prob.id);
              return (
                <div
                  key={prob.id}
                  className="p-3.5 rounded-xl bg-[#13141c] border border-[#26283b] flex items-center justify-between gap-3 group hover:border-purple-500/50 transition-all"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          prob.difficulty === 'Easy'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                            : prob.difficulty === 'Medium'
                            ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                            : 'bg-red-950/60 text-red-400 border border-red-800/40'
                        }`}
                      >
                        {prob.difficulty}
                      </span>
                      <span className="text-[10px] text-[#717589] font-mono">#{prob.lcNumber}</span>
                    </div>
                    <p className="text-xs font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                      {prob.title}
                    </p>
                  </div>

                  <a
                    href={prob.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-[#1f2030] hover:bg-purple-600 text-white transition-colors flex-shrink-0"
                    title="Solve on LeetCode"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#63677e] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems by name, pattern, or LC#..."
            className="w-full bg-[#14141b] border border-[#252636] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-[#63677e] focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Module Filter */}
          <select
            value={selectedModuleFilter}
            onChange={(e) => setSelectedModuleFilter(e.target.value)}
            className="bg-[#14141b] border border-[#252636] text-xs text-[#a4a8c0] rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Modules ({allProblems.length})</option>
            {currentModule?.id && (
              <option value="current">Current Module: {currentModule.title}</option>
            )}
            <option value="mod-arrays">Arrays</option>
            <option value="mod-sorting-and-searching">Sorting and Searching</option>
            <option value="mod-strings">Strings</option>
            <option value="mod-recursion">Recursion</option>
            <option value="mod-bt-and-dnc">BT & DnC</option>
            <option value="mod-linked-lists">Linked Lists</option>
            <option value="mod-stacks">Stacks</option>
            <option value="mod-queues">Queues</option>
            <option value="mod-trees">Trees</option>
            <option value="mod-bsts">BSTs</option>
            <option value="mod-heaps">Heaps</option>
            <option value="mod-dynamic-programming">Dynamic Programming</option>
            <option value="mod-graphs">Graphs</option>
            <option value="mod-bonus-module">BONUS Module</option>
            <option value="mod-extra-leetcode-problems">Extra LeetCode Problems</option>
          </select>

          {/* Difficulty Filter */}
          {['all', 'easy', 'medium', 'hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                selectedDifficulty === diff
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#14141b] border border-[#252636] text-[#868a9f] hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-3">
        {filteredProblems.length === 0 ? (
          <div className="text-center py-12 text-[#686c82] text-xs bg-[#14141b] rounded-2xl border border-[#21222e]">
            No problems match your current search/filter.
          </div>
        ) : (
          filteredProblems.map((prob) => {
            const isSolved = solvedSet.has(prob.id);
            const isHintOpen = !!openHints[prob.id];

            return (
              <div
                key={prob.id}
                className={`bg-[#14141b] border rounded-xl p-4 transition-all ${
                  isSolved
                    ? 'border-emerald-900/40 bg-emerald-950/10'
                    : 'border-[#232433] hover:border-[#35374b]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left: Checkbox + Title + Badges */}
                  <div className="flex items-start sm:items-center gap-3">
                    <button
                      onClick={() => toggleProblemSolved(prob.id)}
                      className={`mt-0.5 sm:mt-0 p-1 rounded-md transition-colors ${
                        isSolved
                          ? 'text-emerald-400 bg-emerald-950/50'
                          : 'text-[#505467] hover:text-white'
                      }`}
                      title={isSolved ? 'Solved (Click to unmark)' : 'Mark as Solved (+100 Score)'}
                    >
                      {isSolved ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            prob.difficulty === 'Easy'
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                              : prob.difficulty === 'Medium'
                              ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                              : 'bg-red-950/60 text-red-400 border border-red-800/40'
                          }`}
                        >
                          {prob.difficulty}
                        </span>

                        <span className="text-xs font-mono text-[#8b8fa3]">
                          LeetCode #{prob.lcNumber}
                        </span>

                        <span className="text-[11px] px-2 py-0.5 rounded bg-[#1e202d] text-[#8e92aa] border border-[#2b2d3d]">
                          {prob.pattern}
                        </span>
                      </div>

                      <h3
                        className={`text-sm font-bold ${
                          isSolved ? 'text-emerald-200 line-through opacity-80' : 'text-white'
                        }`}
                      >
                        {prob.title}
                      </h3>

                      {prob.recommendedAfter && (
                        <span className="text-[11px] text-[#6d7187] block">
                          Suggested after video: <strong className="text-[#a4a8be]">{prob.recommendedAfter}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => toggleHint(prob.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#1a1b26] hover:bg-[#252636] border border-[#292b3c] text-xs text-[#a3a7be] hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isHintOpen ? 'Hide Hint' : 'Hint'}</span>
                      {isHintOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    <a
                      href={prob.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/20"
                    >
                      <span>Solve on LeetCode</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Collapsible Hint Drawer */}
                {isHintOpen && (
                  <div className="mt-3 pt-3 border-t border-[#20212e] text-xs text-[#a5a9c0] bg-[#101117] p-3 rounded-lg flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <strong className="text-white">Approach / Intuition: </strong>
                      {prob.hint}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
