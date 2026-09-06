// src/app/resume/cv-preview/page.tsx
import React from 'react';
import ResumePDF from '../_components/ResumePDF';

export default function CVPreviewPage() {
  return (
    <div className="min-h-screen bg-white">
      <ResumePDF />
    </div>
  );
}