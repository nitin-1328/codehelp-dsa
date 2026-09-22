import React from 'react';
import { Award, X, Download, CheckCircle2, Flame } from 'lucide-react';
import { useCourse } from '../../context/CourseContext';

export default function CertificateModal({ isOpen, onClose }) {
  const { progress } = useCourse();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#14141b] border border-[#2b2d42] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top */}
        <div className="flex items-center justify-between p-4 border-b border-[#21222e]">
          <span className="text-xs font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Official Certificate of Completion
          </span>
          <button onClick={onClose} className="p-1 rounded-lg text-[#727588] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-8 bg-[#0c0d12] flex items-center justify-center">
          <div className="w-full border-4 border-amber-500/30 rounded-xl p-8 bg-gradient-to-b from-[#141520] to-[#0f1017] text-center space-y-6 relative overflow-hidden shadow-2xl">
            {/* Background seal watermarks */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Logo */}
            <div className="flex items-center justify-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
                <Flame className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black text-white font-sans tracking-wide">
                CodeHelp
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Certificate of Excellence
              </h2>
              <p className="text-xs text-[#828699]">This is proudly presented to</p>
              <h3 className="text-2xl md:text-3xl font-black text-white py-2 tracking-tight">
                Siddharth Rastogi
              </h3>
              <p className="text-xs text-[#9ea3be] max-w-md mx-auto leading-relaxed">
                for successfully advancing through the complete curriculum of
              </p>
              <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider">
                Supreme Batch: Data Structures & Algorithms with C++
              </h4>
            </div>

            {/* Signature & Badges */}
            <div className="pt-6 border-t border-[#25273b] flex items-center justify-between text-left text-xs">
              <div>
                <span className="font-mono text-emerald-400 text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Completion
                </span>
                <p className="text-[11px] text-[#63677d] mt-0.5">
                  Platform Score: {progress.score?.toLocaleString()} • Rank: {progress.rank}
                </p>
              </div>

              <div className="text-right">
                <p className="font-serif italic text-white text-base">Love Babbar</p>
                <p className="text-[10px] uppercase tracking-wider text-[#797d95]">
                  Instructor & Mentor
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#21222e] flex items-center justify-between bg-[#121319]">
          <span className="text-xs text-[#717589]">
            Save as PDF or print for your portfolio
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8b8fa3] hover:text-white"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
