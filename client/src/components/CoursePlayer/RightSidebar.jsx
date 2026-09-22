import React, { useState, useEffect } from 'react';
import {
  Video,
  MessageSquare,
  Sparkles,
  BarChart2,
  Search,
  ChevronDown,
  ChevronRight,
  Play,
  CheckCircle2,
  Circle,
  Download,
  Award,
  Send,
  Bot,
  User,
  Film
} from 'lucide-react';
import { useCourse } from '../../context/CourseContext';

export default function RightSidebar({ onOpenCertificate }) {
  const {
    curriculum,
    progress,
    currentLesson,
    currentModule,
    selectLesson,
    progressPercent,
    completedCount,
    totalLessons,
    rightTab,
    setRightTab
  } = useCourse();

  const [searchQuery, setSearchQuery] = useState('');
  const [openModules, setOpenModules] = useState({
    'mod-extra-leetcode-problems': true,
    'mod-learn-cpp': true
  });

  // Automatically keep current module expanded
  useEffect(() => {
    if (currentModule?.id) {
      setOpenModules(prev => ({ ...prev, [currentModule.id]: true }));
    }
  }, [currentModule?.id]);



  // Discussions state
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      author: 'Rohit K.',
      time: '2 hours ago',
      text: 'Why do we need a custom comparator instead of just string comparison in LC 179?'
    },
    {
      id: 2,
      author: 'Aman Sharma',
      time: '1 hour ago',
      text: 'Because "30" > "3" lexicographically, but 330 > 303! So comparing (a+b) > (b+a) is required.'
    }
  ]);
  const [newComment, setNewComment] = useState('');

  // AI Tutor state
  const [aiChat, setAiChat] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm your CodeHelp DSA AI Assistant. Need a hint for this problem, complexity analysis, or a dry run of the edge cases?"
    }
  ]);
  const [aiInput, setAiInput] = useState('');

  const toggleModule = (modId) => {
    setOpenModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setDiscussions(prev => [
      ...prev,
      {
        id: Date.now(),
        author: 'Siddharth Rastogi',
        time: 'Just now',
        text: newComment.trim()
      }
    ]);
    setNewComment('');
  };

  const handleSendAi = (textToSend) => {
    const query = textToSend || aiInput;
    if (!query.trim()) return;

    const userMsg = { role: 'user', text: query };
    let replyText = '';

    const lower = query.toLowerCase();
    if (lower.includes('hint')) {
      replyText = `💡 **Hint for ${currentLesson?.title || 'this problem'}**:\nThink about how two strings concatenate. If you have "9" and "34", compares "934" with "349". Notice "934" > "349"! So 9 must come before 34 in the sorted sequence.`;
    } else if (lower.includes('complexity') || lower.includes('time')) {
      replyText = `⏱️ **Complexity Analysis**:\n- **Time**: O(N log N * K) where N is array length and K is max digits (string concatenation).\n- **Space**: O(N * K) to hold string representations.`;
    } else if (lower.includes('edge case') || lower.includes('zero')) {
      replyText = `⚠️ **Critical Edge Case**:\nIf all numbers are zeros like [0, 0, 0], standard concatenation yields "000". You must check if the largest element is "0", and simply return "0"!`;
    } else {
      replyText = `Here's an optimal tip for **${currentLesson?.title || 'this problem'}**: Try writing down 2-3 sample cases and trace the greedy choice. Use custom lambda comparator \`[](const string &a, const string &b){ return a + b > b + a; }\`.`;
    }

    setAiChat(prev => [...prev, userMsg, { role: 'assistant', text: replyText }]);
    setAiInput('');
  };

  // Filter modules/lessons by search
  const filteredModules = (curriculum?.modules || []).map(mod => {
    const matchingLessons = mod.lessons.filter(l =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...mod,
      lessons: matchingLessons,
      hasMatch: matchingLessons.length > 0
    };
  }).filter(m => searchQuery ? m.hasMatch : true);

  return (
    <aside className="w-80 lg:w-96 bg-[#111116] border-l border-[#21222e] flex flex-col flex-shrink-0 select-none min-h-[calc(100vh-3.5rem)]">
      {/* Top 3 Navigation Tabs (Screenshots 2-5) */}
      <div className="flex items-center justify-between p-3 border-b border-[#21222e] gap-2">
        <button
          onClick={() => setRightTab('modules')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
            rightTab === 'modules'
              ? 'bg-[#1e1f2b] text-white shadow-sm'
              : 'text-[#828699] hover:text-white hover:bg-[#161720]'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Modules</span>
        </button>

        <button
          onClick={() => setRightTab('discussions')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
            rightTab === 'discussions'
              ? 'bg-[#1e1f2b] text-white shadow-sm'
              : 'text-[#828699] hover:text-white hover:bg-[#161720]'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Discussions</span>
        </button>

        <button
          onClick={() => setRightTab('ai')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
            rightTab === 'ai'
              ? 'bg-[#1e1f2b] text-purple-300 shadow-sm'
              : 'text-[#828699] hover:text-purple-300 hover:bg-[#161720]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>AI</span>
        </button>
      </div>

      {/* MODULES TAB CONTENT */}
      {rightTab === 'modules' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Progress Header */}
          <div className="p-4 border-b border-[#21222e] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Progress</span>
              <span className="text-purple-400 font-bold font-mono">
                {progressPercent}% Completed
              </span>
            </div>

            {/* Progress Bar matching screenshots */}
            <div className="w-full bg-[#1e202b] h-1.5 rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPercent}%` }}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-500"
              />
            </div>

            {/* Analytics button link */}
            <div className="flex items-center justify-end pt-1">
              <button className="flex items-center gap-1.5 text-xs text-[#828699] hover:text-white transition-colors">
                <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Analytics</span>
              </button>
            </div>
          </div>

          {/* Search Modules Input */}
          <div className="p-3 border-b border-[#21222e]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#676b80] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Modules"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#171822] border border-[#252636] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#676b80] focus:outline-none focus:border-purple-500/60"
              />
            </div>
          </div>

          {/* Module Accordion List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#1e202b]">
            {filteredModules.map((mod) => {
              const isOpen = openModules[mod.id] || searchQuery.length > 0;
              const hasActiveLesson = mod.lessons.some(l => l.id === currentLesson?.id);

              return (
                <div key={mod.id} className="select-none">
                  {/* Module Header Row */}
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className={`w-full px-4 py-3 flex items-center justify-between text-left text-xs font-semibold transition-colors hover:bg-[#171822] ${
                      hasActiveLesson ? 'text-white' : 'text-[#b0b3c4]'
                    }`}
                  >
                    <span className="truncate pr-2">{mod.title}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[#6c7086] transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>

                  {/* Expanded Lessons List */}
                  {isOpen && (
                    <div className="bg-[#0e0e13] divide-y divide-[#191a24]">
                      {mod.lessons.map((les) => {
                        const isActive = les.id === currentLesson?.id;
                        const isDone = progress.completedLessons?.includes(les.id);
                        const hasVideo = !!progress.videoMappings?.[les.id];

                        return (
                          <div
                            key={les.id}
                            onClick={() => selectLesson(les.id)}
                            className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition-all ${
                              isActive
                                ? 'bg-purple-950/20 border-l-2 border-purple-500 text-purple-200 font-semibold'
                                : 'hover:bg-[#14151d] text-[#8e92a8]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                              {/* Status Icon */}
                              {isDone ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              ) : isActive ? (
                                <Play className="w-3.5 h-3.5 text-purple-400 fill-purple-400 flex-shrink-0" />
                              ) : (
                                <Circle className="w-3.5 h-3.5 text-[#4e5163] flex-shrink-0" />
                              )}

                              <span className={`text-xs truncate ${isActive ? 'text-white' : ''}`}>
                                {les.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              {hasVideo && (
                                <span
                                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                                  title="Local video ready"
                                />
                              )}
                              <span className="text-[11px] font-mono text-[#676a7f]">
                                {les.duration}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Download Certificate Footer */}
          <div className="p-3 border-t border-[#21222e] bg-[#111116]">
            <button
              onClick={onOpenCertificate}
              className="w-full py-2.5 px-3 rounded-lg bg-[#181923] hover:bg-[#222433] border border-[#272839] hover:border-[#383a52] text-xs font-semibold text-[#c5c8dc] hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-purple-400" />
              <span>Download Certificate</span>
            </button>
          </div>
        </div>
      )}

      {/* DISCUSSIONS TAB */}
      {rightTab === 'discussions' && (
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Discussion for {currentLesson?.title}
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {discussions.map((d) => (
              <div key={d.id} className="p-3 rounded-lg bg-[#161720] border border-[#252636] space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-purple-300">{d.author}</span>
                  <span className="text-[#696d81]">{d.time}</span>
                </div>
                <p className="text-xs text-[#a7abbf] leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="pt-3 border-t border-[#21222e] flex gap-2">
            <input
              type="text"
              placeholder="Ask a doubt or share a solution..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 bg-[#171822] border border-[#252636] rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#676b80] focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* AI TUTOR TAB */}
      {rightTab === 'ai' && (
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              DSA AI Study Buddy
            </h3>
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {[
              'Give me a hint',
              'Explain time complexity',
              'What is the edge case?'
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendAi(p)}
                className="px-2.5 py-1 rounded-full bg-[#1b1c28] hover:bg-[#26283a] border border-[#2f3148] text-[11px] text-purple-300 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {aiChat.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg text-xs leading-relaxed ${
                  msg.role === 'assistant'
                    ? 'bg-[#181926] border border-[#2c2e42] text-gray-200'
                    : 'bg-purple-900/30 border border-purple-600/40 text-purple-100 ml-4'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#868aa2] uppercase tracking-wider mb-1">
                  {msg.role === 'assistant' ? (
                    <>
                      <Bot className="w-3 h-3 text-purple-400" />
                      <span>CodeHelp AI</span>
                    </>
                  ) : (
                    <>
                      <User className="w-3 h-3 text-emerald-400" />
                      <span>You</span>
                    </>
                  )}
                </div>
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="pt-3 border-t border-[#21222e] flex gap-2">
            <input
              type="text"
              placeholder="Ask anything about this DSA problem..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendAi()}
              className="flex-1 bg-[#171822] border border-[#252636] rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#676b80] focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => handleSendAi()}
              className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
