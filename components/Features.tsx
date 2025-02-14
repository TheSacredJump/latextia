"use client";

import React from 'react';
import { FileText, Stethoscope, GraduationCap } from 'lucide-react';

const Features = () => {
  return (
    <div id="features" className="py-24 bg-gradient-to-b from-white/80 to-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Transform Handwriting to Digital Text
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Powerful AI technology that converts handwritten notes into beautifully formatted digital documents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 - Note Formatting */}
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">
              Format Your Notes
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Convert handwritten notes into professionally formatted LaTeX documents. Perfect for students, researchers, and professionals who need clean, structured documentation.
            </p>
          </div>

          {/* Feature 2 - Doctor's Notes */}
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Stethoscope className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">
              Medical Transcription
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Accurately interpret and digitize doctor's handwritten notes and prescriptions. Streamline medical documentation and reduce errors in healthcare settings.
            </p>
          </div>

          {/* Feature 3 - Student Writing */}
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">
              Student Work Digitization
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Help teachers quickly digitize and grade student assignments. Easily convert handwritten homework and exam responses into searchable digital text.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
