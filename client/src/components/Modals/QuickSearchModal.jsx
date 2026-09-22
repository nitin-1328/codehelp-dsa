import React, { useState, useEffect } from 'react';
import { Search, X, Play, BookOpen, Clock } from 'lucide-react';
import { useCourse } from '../../context/CourseContext';

export default function QuickSearchModal({ isOpen, onClose, setCurrentView }) {
  const { allLessons, selectLesson } = useCourse();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const results = allLessons.filter(l =>
    l.title.toLowerCase().includes(query.toLowerCase()) ||
    l.moduleTitle.toLowerCase().includes(query.toLowerCase()) ||
    (l.lcNumber && l.lcNumber.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#14141b] border border-[#272839] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#21222e] gap-3">
          <Search className="w-5 h-5 text-[#6c7087]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems, topics, LC number (e.g. 179, Kadane, Binary Search)..."
            className="flex-1 bg-transparent text-sm text-white placeholder-[#606478] focus:outline-none"
          />
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#20212e] text-[#8e92a8] rounded border border-[#2b2c3d]">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#6c7087] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-[#1c1d29] p-2">
          {results.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#6e7287]">
              No topics or lessons found matching "{query}"
            </div>
          ) : (
            results.map((les) => (
              <div
                key={les.id}
                onClick={() => {
                  selectLesson(les.id);
                  setCurrentView('courses');
                  onClose();
                }}
                className="p-3 rounded-lg hover:bg-[#1a1b26] cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div className="space-y-0.5 min-w-0 pr-3">
                  <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider block truncate">
                    {les.moduleTitle}
                  </span>
                  <p className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors truncate">
                    {les.title}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {les.lcNumber && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#212333] text-[#9397af]">
                      LC {les.lcNumber}
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-[#616478]">
                    {les.duration}
                  </span>
                  <Play className="w-3.5 h-3.5 text-[#54576c] group-hover:text-purple-400 transition-colors ml-1" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
