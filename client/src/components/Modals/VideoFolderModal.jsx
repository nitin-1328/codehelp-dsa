import React, { useState } from 'react';
import {
  FolderOpen,
  X,
  CheckCircle2,
  AlertCircle,
  Film,
  Search,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useCourse } from '../../context/CourseContext';

export default function VideoFolderModal({ isOpen, onClose }) {
  const { progress, scanFolder } = useCourse();
  const [folderPath, setFolderPath] = useState(progress.videoFolder || '');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleScan = async (e) => {
    e.preventDefault();
    if (!folderPath.trim()) {
      setErrorMsg('Please enter a valid folder path.');
      return;
    }
    setErrorMsg('');
    setIsScanning(true);
    setScanResult(null);

    const result = await scanFolder(folderPath.trim());
    setIsScanning(false);

    if (result.success) {
      setScanResult(result);
    } else {
      setErrorMsg(result.error || 'Failed to scan directory. Please ensure the path exists.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#14141b] border border-[#262839] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#21222e]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Link Downloaded Videos</h3>
              <p className="text-xs text-[#828699]">
                Auto-match your downloaded DSA videos with curriculum lessons
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#727588] hover:text-white hover:bg-[#1f202c] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          <form onSubmit={handleScan} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#a6aabf] mb-1.5">
                Local Folder Path
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={folderPath}
                  onChange={(e) => setFolderPath(e.target.value)}
                  placeholder="e.g. C:\Users\nitin\Downloads\DSA Videos"
                  className="flex-1 bg-[#0f0f14] border border-[#282939] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white placeholder-[#585c6f] font-mono focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isScanning}
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0"
                >
                  {isScanning ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Search className="w-3.5 h-3.5" />
                  )}
                  <span>{isScanning ? 'Scanning...' : 'Scan & Link'}</span>
                </button>
              </div>
            </div>
          </form>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {scanResult && (
            <div className="p-4 rounded-xl bg-[#181924] border border-[#2a2c3f] space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Scan Complete!</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#111117] border border-[#21222e]">
                  <span className="text-[#727588]">Total Videos Found</span>
                  <p className="text-base font-bold text-white mt-0.5">
                    {scanResult.totalVideosFound}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#111117] border border-[#21222e]">
                  <span className="text-[#727588]">Matched to Lessons</span>
                  <p className="text-base font-bold text-emerald-400 mt-0.5">
                    {scanResult.matchedCount}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Guidance Box */}
          <div className="p-3.5 rounded-xl bg-[#181923] border border-[#242636] space-y-1.5 text-xs text-[#8c90a6]">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              How file auto-matching works:
            </span>
            <p>
              The scanner looks for LeetCode numbers (e.g. <code>179</code>, <code>204</code>) or title keywords in your video file names (e.g. <code>Largest Number.mp4</code> or <code>179_largest_number.mp4</code>).
            </p>
            <p>
              You can also click <strong>Choose Video File</strong> on any lecture to map a video individually!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#21222e] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1f202d] hover:bg-[#292a3c] text-white text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
