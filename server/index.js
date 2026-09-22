import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json');
const CURRICULUM_FILE = path.join(__dirname, 'curriculum.json');

// Initial default state
const defaultProgress = {
  rank: 1000,
  score: 0,
  streak: 1,
  currentLessonId: 'mod-learn-c--les-1', // 01. Intro to C++
  completedLessons: [],
  solvedProblems: [],
  bookmarks: [],
  notes: {},
  videoFolder: '',
  videoMappings: {}
};


function getProgress() {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      const data = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
      return { ...defaultProgress, ...data };
    }
  } catch (err) {
    console.error('Error reading progress file:', err);
  }
  return defaultProgress;
}

function saveProgress(data) {
  try {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving progress file:', err);
  }
}

// Ensure progress exists
if (!fs.existsSync(PROGRESS_FILE)) {
  saveProgress(defaultProgress);
}

// 1. Get Curriculum
app.get('/api/curriculum', (req, res) => {
  try {
    const raw = fs.readFileSync(CURRICULUM_FILE, 'utf-8');
    const curriculum = JSON.parse(raw);
    res.json(curriculum);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read curriculum' });
  }
});

// 2. Get Progress
app.get('/api/progress', (req, res) => {
  res.json(getProgress());
});

// 3. Update Progress
app.post('/api/progress', (req, res) => {
  const current = getProgress();
  const updated = { ...current, ...req.body };
  saveProgress(updated);
  res.json({ success: true, progress: updated });
});

// Helper to scan directory recursively for video files
const VIDEO_EXTENSIONS = ['.mp4', '.mkv', '.webm', '.avi', '.mov', '.ts', '.m4v'];

function scanVideosRecursively(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        scanVideosRecursively(fullPath, fileList);
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase();
        if (VIDEO_EXTENSIONS.includes(ext)) {
          fileList.push({
            name: item.name,
            path: fullPath,
            size: fs.statSync(fullPath).size
          });
        }
      }
    }
  } catch (e) {
    console.error(`Cannot scan dir: ${dir}`, e.message);
  }
  return fileList;
}

// 4. Scan local directory and auto-map videos
app.post('/api/scan-videos', (req, res) => {
  const { folderPath } = req.body;
  if (!folderPath || !fs.existsSync(folderPath)) {
    return res.status(400).json({ error: 'Invalid or non-existent folder path.' });
  }

  const videoFiles = scanVideosRecursively(folderPath);
  const rawCurriculum = JSON.parse(fs.readFileSync(CURRICULUM_FILE, 'utf-8'));
  const progress = getProgress();
  const newMappings = { ...progress.videoMappings };

  // Matching algorithm
  for (const mod of rawCurriculum.modules) {
    for (const lesson of mod.lessons) {
      const lcNum = lesson.lcNumber ? lesson.lcNumber.toLowerCase() : '';
      const titleWords = lesson.title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, ' ')
        .split(' ')
        .filter(w => w.length > 2 && !['and', 'the', 'for', 'with', 'using', 'in'].includes(w));

      // Try to find matching video
      for (const vid of videoFiles) {
        const vidName = vid.name.toLowerCase();
        
        let match = false;
        // Case 1: LC number matches (e.g. 179)
        if (lcNum && lcNum.length >= 2 && !['stl', 'ptr', 'rec'].includes(lcNum)) {
          const numRegex = new RegExp(`\\b${lcNum}\\b`, 'i');
          if (numRegex.test(vidName) || vidName.includes(`lc ${lcNum}`) || vidName.includes(`lc${lcNum}`)) {
            match = true;
          }
        }

        // Case 2: Multi-word title match
        if (!match) {
          const matchedWords = titleWords.filter(w => vidName.includes(w));
          if (titleWords.length > 0 && matchedWords.length >= Math.min(2, titleWords.length)) {
            match = true;
          }
        }

        if (match) {
          newMappings[lesson.id] = vid.path;
          break;
        }
      }
    }
  }

  progress.videoFolder = folderPath;
  progress.videoMappings = newMappings;
  saveProgress(progress);

  res.json({
    success: true,
    totalVideosFound: videoFiles.length,
    matchedCount: Object.keys(newMappings).length,
    videoMappings: newMappings,
    videoFiles
  });
});

// 5. Manually map a single video to a lesson
app.post('/api/map-single-video', (req, res) => {
  const { lessonId, videoPath } = req.body;
  if (!lessonId || !videoPath) {
    return res.status(400).json({ error: 'lessonId and videoPath are required' });
  }
  const progress = getProgress();
  progress.videoMappings[lessonId] = videoPath;
  saveProgress(progress);
  res.json({ success: true, videoMappings: progress.videoMappings });
});

// 6. Video Stream with HTTP 206 Range Request support
app.get('/api/video-stream', (req, res) => {
  const { path: filePathQuery, lessonId } = req.query;
  let videoPath = filePathQuery;

  if (!videoPath && lessonId) {
    const progress = getProgress();
    videoPath = progress.videoMappings[lessonId];
  }

  if (!videoPath || !fs.existsSync(videoPath)) {
    return res.status(404).json({ error: 'Video file not found or not mapped yet.' });
  }

  try {
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    const ext = path.extname(videoPath).toLowerCase();
    const mimeTypes = {
      '.mp4': 'video/mp4',
      '.mkv': 'video/x-matroska',
      '.webm': 'video/webm',
      '.mov': 'video/quicktime',
      '.avi': 'video/x-msvideo'
    };
    const contentType = mimeTypes[ext] || 'video/mp4';

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Accept-Ranges': 'bytes',
        'Content-Type': contentType,
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (err) {
    console.error('Error streaming video:', err);
    res.status(500).json({ error: 'Error streaming video file' });
  }
});

// 7. Quick directory existence check
app.post('/api/check-folder', (req, res) => {
  const { folderPath } = req.body;
  const exists = folderPath && fs.existsSync(folderPath);
  res.json({ exists });
});

// Serve static frontend in production or if dist exists
const DIST_PATH = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(DIST_PATH)) {
  app.use(express.static(DIST_PATH));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(DIST_PATH, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`CodeHelp app running at http://localhost:${PORT}`);
});

