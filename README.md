# CodeHelp DSA Preparation Platform Replica

A full-featured replica of the **CodeHelp** DSA learning platform designed for local DSA preparation with your downloaded course videos.

## 🚀 Quick Start

To run the application:

```bash
# Start the full app (Backend + Frontend together)
npm start
```
Then open your browser at **[http://localhost:5000](http://localhost:5000)**.

To run with Hot-Module-Reloading (HMR) for development:
```bash
npm run dev
```

---

## 📽️ Linking Your Downloaded Videos

1. In the app top bar, click the **"Link Videos"** button (or click **"Choose Video File"** on any video).
2. Enter the full folder path where your downloaded DSA videos are stored (e.g., `C:\Users\nitin\Downloads\DSA Videos`).
3. Click **Scan & Link**.
4. The scanner automatically detects and links your video files (`.mp4`, `.mkv`, `.webm`, `.avi`, `.mov`) by matching:
   - LeetCode problem numbers (e.g. `179`, `204`, etc.)
   - Lecture title keywords (e.g. `Largest Number`, `Kadane`, `Binary Search`)
5. Videos are streamed directly with **HTTP 206 Partial Content Range support** for instant seeking and scrubbing.
6. You can also pick individual video files for any lecture at any time.

---

## 🌟 Key Features

### 1. Global Dashboard
- **Platform Rank**: `1,000` (Current rank)
- **Platform Score**: `5,324` (Total coins earned)
- **Platform Streak**: `18` (Daily streak tracker)
- **Rank & Score Progress**: Interactive weekly bar chart with dual bars (Rank in blue, Score in purple).
- **Tabs**: `Summary`, `Metrics` (topic breakdown), and `Bookmarks`.

### 2. Video Player & Classroom
- Custom HTML5 video player with seek bar, playback speed (`0.5x` - `2x`), time counter, volume slider, theater mode, and fullscreen.
- **Action Buttons**:
  - `Previous Lesson` (`<`)
  - `Mark Complete` (`✓`) with +50 points score reward and confetti celebration!
  - `Next Lesson` (`>`)
- **Sub-Tabs**:
  - **Summary**: Problem breakdown, LeetCode link, time & space complexity cards.
  - **Notes**: Full personal note-taking editor with live auto-save to local persistent storage.
  - **Quiz**: Interactive multiple-choice questions with instant validation.
  - **Bookmark** button.

### 3. Curriculum Navigator
- 28 complete modules from the CodeHelp curriculum:
  - Maths Practice Problems
  - Practice Problems – Arrays
  - C++ STL
  - Sorting and Searching
  - Practice Problems – SnS
  - Strings & String Practice
  - Pointers and Basic Maths
  - Recursion & Recursion Practice
  - BT and DnC (Backtracking & Divide and Conquer)
  - Practice Problems – Queues
  - Trees & BSTs
  - Heaps
  - Maps n Tries
  - DP L1 & DP Practice
  - Graphs L1 & Graphs L2
  - BONUS Module & Career Preparation
- Live progress tracker (e.g. `21.5% Completed`).
- **Discussions Tab**: Community Q&A feed.
- **AI Tutor Tab**: DSA study buddy for hints, time complexity, and edge case explanations.
- **Download Certificate**: Official CodeHelp completion certificate generator.

### ⌨️ Keyboard Shortcuts
- `Space`: Play / Pause video
- `Arrow Left` / `Arrow Right`: Seek backward/forward 10 seconds
- `F`: Toggle Fullscreen
- `M`: Toggle Mute
- `Ctrl + K`: Quick Search across all topics and LeetCode problems
- `Ctrl + M`: Toggle Dark / Light mode
