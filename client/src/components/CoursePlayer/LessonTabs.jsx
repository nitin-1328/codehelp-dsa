import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Bookmark,
  FileText,
  Edit3,
  HelpCircle,
  ExternalLink,
  Code2,
  Clock,
  HardDrive,
  Save,
  CheckCircle2,
  Circle,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { useCourse } from '../../context/CourseContext';
import { getProblemsForModule } from '../../data/practiceProblems';

export default function LessonTabs() {
  const {
    currentLesson,
    currentModule,
    progress,
    activeTab,
    setActiveTab,
    toggleLessonComplete,
    toggleBookmark,
    toggleProblemSolved,
    nextLesson,
    prevLesson,
    saveNote
  } = useCourse();

  const isCompleted = progress.completedLessons?.includes(currentLesson?.id);
  const isBookmarked = progress.bookmarks?.includes(currentLesson?.id);
  const solvedSet = new Set(progress.solvedProblems || []);

  // Local state for notes
  const [noteContent, setNoteContent] = useState('');
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [openHints, setOpenHints] = useState({});

  useEffect(() => {
    if (currentLesson) {
      setNoteContent(progress.notes?.[currentLesson.id] || currentLesson.notes || '');
      setSaveStatus('Saved');
    }
  }, [currentLesson?.id, progress.notes]);

  const handleNoteChange = (text) => {
    setNoteContent(text);
    setSaveStatus('Saving...');
    const timer = setTimeout(() => {
      if (currentLesson) {
        saveNote(currentLesson.id, text);
        setSaveStatus('Saved');
      }
    }, 600);
    return () => clearTimeout(timer);
  };

  const handleQuizAnswer = (qIdx, optIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const toggleHint = (id) => {
    setOpenHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Recommended LeetCode problems for current module/lesson
  const moduleProblems = currentModule?.id ? getProblemsForModule(currentModule.id) : [];

  return (
    <div className="space-y-4">
      {/* Title & Lesson Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <h2 className="text-xl font-bold text-white tracking-tight">
          {currentLesson?.title || 'Intro to C++'}
        </h2>

        {/* Action Buttons: Prev (<), Mark Complete (✓), Next (>) */}
        <div className="flex items-center gap-2">
          {/* Previous Lesson */}
          <button
            onClick={prevLesson}
            className="p-2 rounded-lg bg-[#181923] hover:bg-[#232535] border border-[#272838] text-[#8e92a6] hover:text-white transition-colors"
            title="Previous Lesson"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Mark Complete Checkmark */}
          <button
            onClick={() => toggleLessonComplete(currentLesson?.id)}
            className={`p-2 rounded-lg border transition-all ${
              isCompleted
                ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400 hover:bg-emerald-600/30'
                : 'bg-[#181923] hover:bg-[#232535] border-[#272838] text-[#8e92a6] hover:text-white'
            }`}
            title={isCompleted ? 'Watched (Click to unmark)' : 'Mark as Watched (+50 Score)'}
          >
            <Check className={`w-4 h-4 ${isCompleted ? 'stroke-[2.5]' : ''}`} />
          </button>

          {/* Next Lesson Button */}
          <button
            onClick={nextLesson}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#181923] hover:bg-[#232535] border border-[#272838] text-xs font-semibold text-white transition-colors"
          >
            <span>Next Lesson</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs Header Row (Summary, Notes, Practice, Quiz, Bookmark) */}
      <div className="flex items-center justify-between border-b border-[#21222e] pb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'summary'
                ? 'bg-[#1f202c] text-white shadow-sm'
                : 'text-[#828699] hover:text-white hover:bg-[#161720]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Summary</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'practice'
                ? 'bg-purple-900/40 text-purple-300 border border-purple-600/40 shadow-sm'
                : 'text-[#828699] hover:text-white hover:bg-[#161720]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Practice Problems</span>
            {moduleProblems.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-purple-600 text-white text-[10px] font-mono">
                {moduleProblems.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'notes'
                ? 'bg-[#1f202c] text-white shadow-sm'
                : 'text-[#828699] hover:text-white hover:bg-[#161720]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Notes</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'quiz'
                ? 'bg-[#1f202c] text-white shadow-sm'
                : 'text-[#828699] hover:text-white hover:bg-[#161720]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Quiz</span>
          </button>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => toggleBookmark(currentLesson?.id)}
          className={`p-2 rounded-lg border transition-colors ${
            isBookmarked
              ? 'bg-purple-900/30 border-purple-500/50 text-purple-400'
              : 'bg-transparent border-transparent text-[#6e7288] hover:text-white hover:bg-[#181923]'
          }`}
          title={isBookmarked ? 'Bookmarked' : 'Add to bookmarks'}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-purple-400' : ''}`} />
        </button>
      </div>

      {/* 1. Summary Panel */}
      {activeTab === 'summary' && (
        <div className="bg-[#14141b] border border-[#21222e] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-purple-400">
              Problem Overview
            </h3>
            {currentLesson?.lcNumber && (
              <a
                href={`https://leetcode.com/problems/${currentLesson.lcTitle?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#202230] hover:bg-[#2b2d3f] border border-[#2d3043] text-xs font-medium text-amber-400 transition-colors"
              >
                <span>LeetCode #{currentLesson.lcNumber}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <p className="text-sm text-[#a3a7be] leading-relaxed">
            {currentLesson?.summary ||
              'In this lecture, Love Babbar covers the complete intuition, algorithm breakdown, edge case handling, and optimal code implementation for this DSA topic.'}
          </p>

          {/* Complexity Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-[#181923] border border-[#272839] flex items-center gap-3">
              <Clock className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="text-[10px] text-[#787c93] uppercase font-bold tracking-wider">
                  Time Complexity
                </span>
                <p className="text-xs font-mono font-semibold text-white">
                  O(N log N) / O(N)
                </p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-[#181923] border border-[#272839] flex items-center gap-3">
              <HardDrive className="w-4 h-4 text-purple-400" />
              <div>
                <span className="text-[10px] text-[#787c93] uppercase font-bold tracking-wider">
                  Space Complexity
                </span>
                <p className="text-xs font-mono font-semibold text-white">
                  O(1) Auxiliary / O(N)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Practice (LeetCode) Panel */}
      {activeTab === 'practice' && (
        <div className="bg-[#14141b] border border-[#21222e] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">
                Recommended LeetCode Problems for {currentModule?.title || 'this Module'}
              </h3>
            </div>
            <span className="text-xs text-[#80849c]">
              Solve these after watching the lecture to build muscle memory
            </span>
          </div>

          {moduleProblems.length === 0 ? (
            <p className="text-xs text-[#6e7287] py-6 text-center">
              No specific problems registered for this introductory module yet. Check the main Practice Hub!
            </p>
          ) : (
            <div className="space-y-3">
              {moduleProblems.map((prob) => {
                const isSolved = solvedSet.has(prob.id);
                const isHintOpen = !!openHints[prob.id];

                return (
                  <div
                    key={prob.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isSolved
                        ? 'bg-emerald-950/15 border-emerald-900/40'
                        : 'bg-[#181923] border-[#252636] hover:border-[#383a50]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-3">
                        <button
                          onClick={() => toggleProblemSolved(prob.id)}
                          className={`mt-0.5 sm:mt-0 p-1 rounded-md transition-colors ${
                            isSolved ? 'text-emerald-400 bg-emerald-950/50' : 'text-[#55586d] hover:text-white'
                          }`}
                          title={isSolved ? 'Solved (Click to unmark)' : 'Mark as Solved (+100 Score)'}
                        >
                          {isSolved ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                        </button>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
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
                            <span className="text-xs font-mono text-[#767a90]">#{prob.lcNumber}</span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-[#1f2130] text-[#9397af]">
                              {prob.pattern}
                            </span>
                          </div>

                          <h4
                            className={`text-sm font-bold ${
                              isSolved ? 'text-emerald-300 line-through opacity-80' : 'text-white'
                            }`}
                          >
                            {prob.title}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => toggleHint(prob.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#202130] hover:bg-[#2b2d42] border border-[#2d3043] text-xs text-[#a1a5be] hover:text-white flex items-center gap-1.5"
                        >
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                          <span>{isHintOpen ? 'Hide Hint' : 'Hint'}</span>
                        </button>

                        <a
                          href={prob.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/20"
                        >
                          <span>Solve</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {isHintOpen && (
                      <div className="mt-3 pt-3 border-t border-[#232435] text-xs text-[#9ea2b9] bg-[#111218] p-3 rounded-lg flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Hint / Key Pattern: </strong>
                          {prob.hint}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 3. Notes Panel */}
      {activeTab === 'notes' && (
        <div className="bg-[#14141b] border border-[#21222e] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Lecture Notes</h3>
            </div>
            <span className="text-xs text-[#6e7287] flex items-center gap-1.5 font-mono">
              <Save className="w-3 h-3" />
              {saveStatus}
            </span>
          </div>

          <textarea
            value={noteContent}
            onChange={(e) => handleNoteChange(e.target.value)}
            rows={10}
            placeholder="Write your personal notes, code snippets, edge cases or dry run logs here... Automatically saved."
            className="w-full bg-[#0e0e13] border border-[#242533] rounded-lg p-3 text-xs md:text-sm text-gray-200 font-mono focus:outline-none focus:border-purple-500/60 leading-relaxed resize-y"
          />
        </div>
      )}

      {/* 4. Quiz Panel */}
      {activeTab === 'quiz' && (
        <div className="bg-[#14141b] border border-[#21222e] rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            Lecture Comprehension Quiz
          </h3>

          {currentLesson?.quiz && currentLesson.quiz.length > 0 ? (
            <div className="space-y-4">
              {currentLesson.quiz.map((q, qIdx) => {
                const selected = selectedAnswers[qIdx];
                const isCorrect = selected === q.answer;

                return (
                  <div key={qIdx} className="p-4 rounded-lg bg-[#181923] border border-[#262838] space-y-3">
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      {qIdx + 1}. {q.question}
                    </p>

                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selected === optIdx;
                        let optionStyle = 'bg-[#12131a] border-[#252636] text-[#9a9eb2] hover:bg-[#1a1b26] hover:text-white';

                        if (selected !== undefined) {
                          if (optIdx === q.answer) {
                            optionStyle = 'bg-emerald-950/40 border-emerald-600/60 text-emerald-300 font-medium';
                          } else if (isChosen && !isCorrect) {
                            optionStyle = 'bg-red-950/40 border-red-600/60 text-red-300';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleQuizAnswer(qIdx, optIdx)}
                            className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {selected !== undefined && optIdx === q.answer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-[#71758a] py-6 text-center">
              No quiz questions for this lesson yet. Check the Practice tab to solve the LeetCode problems!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
