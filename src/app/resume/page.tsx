'use client'

import React, { useState } from 'react';
import { Download, LoaderCircle } from 'lucide-react';
import ResumePDF from './_components/ResumePDF';
import ResumeSheetScaler from './_components/ResumeSheetScaler';

export default function CVPreviewPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExportPDF = async () => {
    try {
      setIsGenerating(true);
      
      // Call API to generate PDF
      const response = await fetch('/api/resume/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Get PDF blob
      const pdfBlob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Resume_Natthawat_Narin.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/*
        Controls — a floating action button rather than a toolbar. A sticky bar
        would eat ~72px of a phone screen for a single button, and the point of
        this page is to show the A4 sheet as large as possible. Bottom-right
        keeps it in thumb reach on mobile and off the sheet's content on a desk.
        The safe-area inset keeps it clear of the iPhone home indicator.
        Hidden when printing.
      */}
      <button
        onClick={handleExportPDF}
        disabled={isGenerating}
        aria-label="Export resume as PDF"
        style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
        className="print:hidden fixed right-5 sm:right-8 z-20 flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm sm:text-base font-medium text-white shadow-lg shadow-green-900/25 ring-1 ring-green-700/50 transition-all duration-200 hover:bg-green-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:translate-y-0 disabled:bg-gray-400 disabled:shadow-md disabled:ring-gray-500/40 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Generating PDF...
          </>
        ) : (
          <>
            <Download size={18} />
            Export PDF
          </>
        )}
      </button>

      {/* CV Preview — full-bleed on small screens, centred on a desk. */}
      <div className="py-0 lg:py-8 print:py-0">
        <ResumeSheetScaler>
          <ResumePDF />
        </ResumeSheetScaler>
      </div>

      <style jsx>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:py-0 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          @page {
            margin: 0;
            size: A4;
          }
        }
      `}</style>
    </div>
  );
}