'use client'

import React, { useState } from 'react';
import { Download, LoaderCircle } from 'lucide-react';
import ResumePDF from './_components/ResumePDF';

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
      {/* Controls - Hidden when printing */}
      <div className="print:hidden bg-white shadow-lg p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={handleExportPDF}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <LoaderCircle size={20} className="animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download size={20} />
                Export PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* CV Preview */}
      <div className="py-8 print:py-0">
        <div className="flex justify-center">
          <ResumePDF />
        </div>
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