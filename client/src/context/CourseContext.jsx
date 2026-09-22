import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
  const [curriculum, setCurriculum] = useState({ modules: [] });
  const [progress, setProgress] = useState({
    rank: 1000,
    score: 0,
    streak: 1,
    currentLessonId: 'mod-learn-c--les-1',
    completedLessons: [],
    bookmarks: [],
    notes: {},
    videoFolder: '',
    videoMappings: {},
    solvedProblems: []
  });

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'notes' | 'quiz' | 'practice'
  const [rightTab, setRightTab] = useState('modules'); // 'modules' | 'discussions' | 'ai'
  const [localVideoBlobs, setLocalVideoBlobs] = useState({}); // For in-browser file picker fallback


  // Fetch initial curriculum and progress
  useEffect(() => {
    async function loadData() {
      try {
        const [currRes, progRes] = await Promise.all([
          fetch('/api/curriculum').then(r => r.json()),
          fetch('/api/progress').then(r => r.json())
        ]);
        setCurriculum(currRes);
        if (progRes) {
          setProgress(progRes);
        }
      } catch (err) {
        console.error('Failed to load data from server:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Save progress helper
  const syncProgress = async (newProgress) => {
    setProgress(newProgress);
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProgress)
      });
    } catch (err) {
      console.error('Failed to sync progress:', err);
    }
  };

  // Find current lesson and module
  let currentLesson = null;
  let currentModule = null;
  let allLessons = [];

  if (curriculum?.modules) {
    for (const mod of curriculum.modules) {
      for (const les of mod.lessons) {
        allLessons.push({ ...les, moduleId: mod.id, moduleTitle: mod.title });
        if (les.id === progress.currentLessonId) {
          currentLesson = les;
          currentModule = mod;
        }
      }
    }
  }

  // Fallback to first lesson if not found
  if (!currentLesson && allLessons.length > 0) {
    currentLesson = allLessons[0];
    currentModule = curriculum.modules[0];
  }

  // Navigation handlers
  const selectLesson = (lessonId) => {
    const updated = { ...progress, currentLessonId: lessonId };
    syncProgress(updated);
  };

  const toggleLessonComplete = (lessonId) => {
    const completedSet = new Set(progress.completedLessons || []);
    let newScore = progress.score;
    let earned = false;

    if (completedSet.has(lessonId)) {
      completedSet.delete(lessonId);
      newScore = Math.max(0, newScore - 50);
    } else {
      completedSet.add(lessonId);
      newScore += 50;
      earned = true;
      // Confetti celebration
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch (e) {}
    }

    const updated = {
      ...progress,
      completedLessons: Array.from(completedSet),
      score: newScore
    };
    syncProgress(updated);
  };

  const toggleBookmark = (lessonId) => {
    const bookmarkedSet = new Set(progress.bookmarks || []);
    if (bookmarkedSet.has(lessonId)) {
      bookmarkedSet.delete(lessonId);
    } else {
      bookmarkedSet.add(lessonId);
    }
    syncProgress({ ...progress, bookmarks: Array.from(bookmarkedSet) });
  };

  const toggleProblemSolved = (problemId) => {
    const solvedSet = new Set(progress.solvedProblems || []);
    let newScore = progress.score;
    if (solvedSet.has(problemId)) {
      solvedSet.delete(problemId);
      newScore = Math.max(0, newScore - 100);
    } else {
      solvedSet.add(problemId);
      newScore += 100;
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    }
    syncProgress({
      ...progress,
      solvedProblems: Array.from(solvedSet),
      score: newScore
    });
  };

  const saveNote = (lessonId, noteText) => {

    const updatedNotes = { ...progress.notes, [lessonId]: noteText };
    syncProgress({ ...progress, notes: updatedNotes });
  };

  const nextLesson = () => {
    const idx = allLessons.findIndex(l => l.id === progress.currentLessonId);
    if (idx !== -1 && idx < allLessons.length - 1) {
      selectLesson(allLessons[idx + 1].id);
    }
  };

  const prevLesson = () => {
    const idx = allLessons.findIndex(l => l.id === progress.currentLessonId);
    if (idx > 0) {
      selectLesson(allLessons[idx - 1].id);
    }
  };

  // Video folder scan
  const scanFolder = async (folderPath) => {
    try {
      const res = await fetch('/api/scan-videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderPath })
      });
      const data = await res.json();
      if (data.success) {
        setProgress(prev => ({
          ...prev,
          videoFolder: folderPath,
          videoMappings: data.videoMappings
        }));
        return data;
      }
      return { success: false, error: data.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Manual local video file attachment (via file input / drag drop)
  const attachLocalFile = (lessonId, file) => {
    const blobUrl = URL.createObjectURL(file);
    setLocalVideoBlobs(prev => ({
      ...prev,
      [lessonId]: blobUrl
    }));
  };

  // Progress metrics calculation
  const totalLessons = allLessons.length || 1;
  const completedCount = (progress.completedLessons || []).length;
  const progressPercent = Math.round((completedCount / totalLessons) * 1000) / 10; // e.g. 21.5%

  return (
    <CourseContext.Provider
      value={{
        curriculum,
        progress,
        loading,
        currentLesson,
        currentModule,
        allLessons,
        activeTab,
        setActiveTab,
        rightTab,
        setRightTab,
        localVideoBlobs,
        selectLesson,
        toggleLessonComplete,
        toggleBookmark,
        toggleProblemSolved,
        saveNote,

        nextLesson,
        prevLesson,
        scanFolder,
        attachLocalFile,
        progressPercent,
        completedCount,
        totalLessons
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) throw new Error('useCourse must be used within CourseProvider');
  return context;
}
