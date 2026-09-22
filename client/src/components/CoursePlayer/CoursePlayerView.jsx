import React from 'react';
import VideoPlayer from './VideoPlayer';
import LessonTabs from './LessonTabs';
import RightSidebar from './RightSidebar';

export default function CoursePlayerView({ openFolderModal, onOpenCertificate }) {
  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
      {/* Main Video & Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {/* Video Player Box */}
        <VideoPlayer openFolderModal={openFolderModal} />

        {/* Lesson Tabs (Summary, Notes, Quiz) */}
        <LessonTabs />
      </div>

      {/* Right Modules / Discussions / AI Sidebar */}
      <RightSidebar onOpenCertificate={onOpenCertificate} />
    </div>
  );
}
