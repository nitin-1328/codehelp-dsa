import fs from 'fs';
import path from 'path';

const baseDir = 'C:\\Users\\nitin\\OneDrive\\Desktop\\TelegramMedia\\video';
const curriculumFile = 'c:\\Users\\nitin\\OneDrive\\Desktop\\codehelp\\server\\curriculum.json';
const progressFile = 'c:\\Users\\nitin\\OneDrive\\Desktop\\codehelp\\server\\data\\progress.json';

const folders = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

const modules = [];
const videoMappings = {};
let allLessonsList = [];

for (const f of folders) {
  // Clean module title: remove "01. ", "02. ", etc.
  const rawFolderName = f.name;
  const cleanModuleTitle = rawFolderName.replace(/^\d+\.\s*/, '');
  const moduleId = 'mod-' + cleanModuleTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const fullDirPath = path.join(baseDir, rawFolderName);
  const files = fs.readdirSync(fullDirPath)
    .filter(file => /\.(mp4|mkv|webm|avi|mov)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const lessons = [];

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    const fullVideoPath = path.join(fullDirPath, fileName);
    const baseName = fileName.replace(/\.[^/.]+$/, ''); // remove extension
    const cleanLessonTitle = baseName.replace(/^\d+\.\s*/, ''); // remove leading "01. "

    // Check if it has LC number
    let lcNumber = '';
    const lcMatch = cleanLessonTitle.match(/LC\s*(\d+)/i);
    if (lcMatch) {
      lcNumber = lcMatch[1];
    }

    const lessonId = `${moduleId}-les-${i + 1}`;

    const lesson = {
      id: lessonId,
      title: cleanLessonTitle,
      duration: '45:00', // standard estimate
      lcNumber: lcNumber,
      lcTitle: cleanLessonTitle,
      summary: `Complete lecture on ${cleanLessonTitle} by Love Babbar. Covers full intuition, code dry run, time and space complexity, and edge cases.`,
      notes: `# ${cleanLessonTitle}\n\n- Topic: ${cleanModuleTitle}\n- File: ${fileName}\n\n### Key Concepts:\n- In this lecture, Love Babbar breaks down the intuition and optimal implementation for ${cleanLessonTitle}.\n\n### Summary & Edge Cases:\n- Make sure to review edge cases and write down clean code.`,
      quiz: [
        {
          question: `What is the core focus of the lecture: "${cleanLessonTitle}"?`,
          options: [
            `Understanding the fundamentals and optimal approach for ${cleanLessonTitle}`,
            'Skipping edge cases',
            'Using arbitrary O(N^3) brute force without optimization',
            'None of the above'
          ],
          answer: 0
        }
      ]
    };

    lessons.push(lesson);
    videoMappings[lessonId] = fullVideoPath;
    allLessonsList.push(lesson);
  }

  modules.push({
    id: moduleId,
    title: cleanModuleTitle,
    lessons
  });
}

// Write updated curriculum
const curriculumData = {
  courseTitle: "Supreme Batch: DSA with C++",
  instructor: "Love Babbar",
  modules
};

fs.writeFileSync(curriculumFile, JSON.stringify(curriculumData, null, 2), 'utf-8');
console.log(`Updated curriculum with ${modules.length} modules and ${allLessonsList.length} total lessons.`);

// Load and update progress
let currentProgress = {};
if (fs.existsSync(progressFile)) {
  try {
    currentProgress = JSON.parse(fs.readFileSync(progressFile, 'utf-8'));
  } catch (e) {}
}

// Find Largest Number lesson or default to first
const largestNumLesson = allLessonsList.find(l => l.title.includes('Largest Number')) || allLessonsList[0];

const updatedProgress = {
  rank: currentProgress.rank || 1000,
  score: currentProgress.score || 5324,
  streak: currentProgress.streak || 18,
  currentLessonId: largestNumLesson ? largestNumLesson.id : allLessonsList[0].id,
  completedLessons: currentProgress.completedLessons || [allLessonsList[0].id, allLessonsList[1].id, allLessonsList[2].id],
  bookmarks: currentProgress.bookmarks || [largestNumLesson?.id],
  notes: currentProgress.notes || {},
  videoFolder: baseDir,
  videoMappings
};

fs.writeFileSync(progressFile, JSON.stringify(updatedProgress, null, 2), 'utf-8');
console.log(`Saved progress with ${Object.keys(videoMappings).length} mapped videos.`);
