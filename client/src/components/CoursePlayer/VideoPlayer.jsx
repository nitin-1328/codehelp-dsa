import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Settings,
  FolderOpen,
  Film,
  CheckCircle2
} from 'lucide-react';
import { useCourse } from '../../context/CourseContext';

export default function VideoPlayer({ openFolderModal }) {
  const { currentLesson, progress, localVideoBlobs, attachLocalFile } = useCourse();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Check if we have a mapped video file
  const serverVideoUrl = progress.videoMappings?.[currentLesson?.id]
    ? `/api/video-stream?lessonId=${currentLesson.id}`
    : null;

  const blobUrl = localVideoBlobs?.[currentLesson?.id];
  const activeVideoSrc = blobUrl || serverVideoUrl;

  // Reset video state when lesson changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [currentLesson?.id]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in notes/input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seek(Math.min(duration, currentTime + 10));
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seek(Math.max(0, currentTime - 10));
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, currentTime, duration, isMuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => {
        console.warn('Playback prevented:', err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const seek = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackRate(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFilePicked = (e) => {
    const file = e.target.files?.[0];
    if (file && currentLesson) {
      attachLocalFile(currentLesson.id, file);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={() => setShowControls(true)}
      className="relative aspect-video w-full bg-black rounded-xl overflow-hidden border border-[#232431] shadow-2xl group select-none flex items-center justify-center"
    >
      {/* Hidden file picker input for single video fallback */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFilePicked}
        accept="video/*"
        className="hidden"
      />

      {activeVideoSrc && !videoError ? (
        <video
          ref={videoRef}
          src={activeVideoSrc}
          className="w-full h-full object-contain cursor-pointer"
          onClick={togglePlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={() => setVideoError(true)}
        />
      ) : (
        /* CodeHelp Branded Thumbnail & Video Placeholder matching Screenshots 2, 3, 4, 5 */
        <div className="relative w-full h-full bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
          {/* Background grid texture */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* CodeHelp Thumbnail Artwork */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full h-full p-6 md:p-12 gap-6 bg-gradient-to-r from-black/90 via-black/70 to-red-950/40">
            {/* Left side: CodeHelp Logo + Topic Title in Red bold text */}
            <div className="flex-1 space-y-4 max-w-xl">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-red-600 flex items-center justify-center">
                  <span className="text-white font-black text-sm">🔥</span>
                </div>
                <span className="text-lg font-black tracking-wider text-red-500 font-sans">
                  CODE HELP
                </span>
              </div>

              <div className="bg-white/95 rounded-lg px-6 py-4 shadow-2xl">
                <h1 className="text-3xl md:text-5xl font-black text-red-600 tracking-tight uppercase">
                  {currentLesson?.title?.includes('Largest Number')
                    ? 'LARGEST NUMBER'
                    : currentLesson?.title || 'DSA LECTURE'}
                </h1>
              </div>

              <p className="text-xs text-[#9aa0b8] font-mono">
                {currentLesson?.lcTitle} • Lecture Duration: {currentLesson?.duration || '45:00'}
              </p>

              {/* Local Video Link Callout */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-lg bg-[#1f212f] hover:bg-[#2b2d3f] border border-[#373952] text-xs font-semibold text-white flex items-center gap-2 transition-all shadow-md"
                >
                  <Film className="w-3.5 h-3.5 text-purple-400" />
                  <span>Choose Video File</span>
                </button>

                <button
                  onClick={openFolderModal}
                  className="px-4 py-2 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-xs font-semibold text-purple-200 flex items-center gap-2 transition-all"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-purple-300" />
                  <span>Auto-Scan Video Folder</span>
                </button>
              </div>
            </div>

            {/* Big Cyan/Blue Play Button matching Screenshot 2-5 */}
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={() => {
                  if (activeVideoSrc) {
                    togglePlay();
                  } else {
                    fileInputRef.current?.click();
                  }
                }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0099ff] hover:bg-[#0088ee] hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-xl shadow-cyan-500/30 group"
                title="Play Video"
              >
                <Play className="w-7 h-7 md:w-9 md:h-9 text-white fill-white ml-1" />
              </button>
              <span className="text-[11px] text-[#7d8299] font-medium mt-3">
                {activeVideoSrc ? 'Click to Play' : 'Select video to start'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Center Play Overlay Icon when paused on active video */}
      {activeVideoSrc && !isPlaying && !videoError && (
        <button
          onClick={togglePlay}
          className="absolute z-20 w-16 h-16 rounded-full bg-[#0099ff]/90 hover:bg-[#0099ff] flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        >
          <Play className="w-7 h-7 text-white fill-white ml-1" />
        </button>
      )}

      {/* Video Custom Control Bar */}
      {activeVideoSrc && (
        <div
          className={`absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Progress Seek Bar */}
          <div className="relative w-full h-1.5 bg-white/20 hover:h-2 rounded-full cursor-pointer mb-3 group/seek">
            <div
              className="absolute top-0 left-0 h-full bg-[#0099ff] rounded-full transition-all"
              style={{
                width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              }}
            />
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seek(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-white">
            {/* Left Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="hover:text-[#0099ff] transition-colors p-1"
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
              </button>

              <button
                onClick={() => seek(Math.max(0, currentTime - 10))}
                className="hover:text-gray-300 text-gray-400 p-1"
                title="Rewind 10s"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => seek(Math.min(duration, currentTime + 10))}
                className="hover:text-gray-300 text-gray-400 p-1"
                title="Forward 10s"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Volume */}
              <div className="flex items-center gap-2 group/vol">
                <button onClick={toggleMute} className="hover:text-[#0099ff] p-1">
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-16 h-1 bg-white/30 rounded-lg accent-[#0099ff] cursor-pointer"
                />
              </div>

              {/* Time display */}
              <span className="text-xs font-mono text-gray-300 ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3 relative">
              {/* Speed Menu Toggle */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold"
                >
                  {playbackRate}x
                </button>

                {showSpeedMenu && (
                  <div className="absolute bottom-8 right-0 bg-[#161722] border border-[#2b2d3d] rounded-lg shadow-xl p-1 text-xs space-y-0.5 z-40 min-w-[70px]">
                    {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => handleSpeedChange(rate)}
                        className={`w-full text-left px-2 py-1 rounded hover:bg-[#252738] ${
                          playbackRate === rate ? 'text-purple-400 font-bold' : 'text-gray-300'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button onClick={toggleFullscreen} className="hover:text-[#0099ff] p-1">
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
