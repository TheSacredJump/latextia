"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FileText, Settings, Upload, User } from 'lucide-react';
import LatexRenderer from "@/components/LatexRenderer";
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  useEffect(() => {
    // Load MathJax with additional configurations
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    
    // Configure MathJax
    window.MathJax = {
      tex: {
        packages: ['base', 'ams', 'noerrors', 'noundefined'],
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
        processEnvironments: true
      },
      options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a URL for the image
      const imageUrl = URL.createObjectURL(file);
      
      // Store the image URL in localStorage
      localStorage.setItem('uploadedImage', imageUrl);
      
      // Redirect to dashboard
      router.push('/dashboard');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden pt-44">
      {/* Grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_white_100%)]" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(0 0 0 / 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(0 0 0 / 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
          }}
        />
      </div>

      <div className="relative"> 
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 via-neutral-950 to-neutral-800 tracking-wide leading-[4rem] text-5xl font-bold text-center">
            Convert your notes into beautifully <br /> formatted <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">LaTex papers</span>
        </h1>
        <p className="text-neutral-500 text-center text-lg mt-4">
            Latextia allows you to upload handwritten notes and get a LaTex formatted paper in seconds.
        </p>
        <label className="z-10 block max-w-3xl mx-auto mt-8 p-12 border-2 border-dashed border-neutral-300 rounded-lg bg-white/50 cursor-pointer hover:border-green-500 transition-colors backdrop-blur-sm">
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileUpload}
          />
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-neutral-400" />
            <p className="mt-2 text-neutral-600">Click or drag and drop to upload your notes</p>
          </div>
        </label>

        <div className="text-black mt-10 text-center text-4xl font-extrabold">Open Source. Free <span className='italic text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-500'>Forever.</span></div>

        <div className="mt-20 h-full min-h-[720px] rounded-2xl w-screen max-w-7xl mx-auto bg-white border-2 border-neutral-200 flex overflow-hidden mb-10">
            {/* Sidebar */}
            <div className="w-48 border-r border-neutral-200 p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 text-green-700">
                <FileText className="w-4 h-4" />
                <span className="font-medium">Documents</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-50 text-neutral-600">
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-50 text-neutral-600">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-50 text-neutral-600">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              <div className="flex gap-6 h-full">
                {/* Original Notes */}
                <div className="flex-1 rounded-lg border border-neutral-200 overflow-hidden">
                  <div className="p-3 border-b border-neutral-200 bg-neutral-50">
                    <h3 className="font-medium">Original Notes</h3>
                  </div>
                  <div className="relative h-[calc(100%-48px)]">
                    <Image 
                      src="/handwritten-math-proof.jpeg"
                      alt="Handwritten notes"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* LaTeX Output */}
                <div className="flex-1 rounded-lg border border-neutral-200 overflow-hidden">
                  <div className="p-3 border-b border-neutral-200 bg-gradient-to-br from-green-500 to-emerald-500">
                    <h3 className="font-medium text-white">LaTeX Output</h3>
                  </div>
                  <div className="p-4">
                    <LatexRenderer block tex="\textbf{\large Prove that:}" />
                    <LatexRenderer block tex="\lim_{(x,y) \to (1,-1)} (x^2 - 3y) = 4." />
                    
                    <LatexRenderer block tex="{Proof}" />
                    <p>By definition, given an <LatexRenderer tex="\varepsilon > 0" />, there exists <LatexRenderer tex="\delta > 0" /> such that</p>
                    <LatexRenderer block tex="\begin{equation} |(x^2 - 3y) - 4| < \varepsilon \end{equation}" />
                    <p>as long as</p>
                    <LatexRenderer block tex="\begin{equation} 0 < |(x,y) - (1,-1)| < \delta. \end{equation}" />
                    
                    <p>Applying the distance formula in inequality (2), we have that</p>
                    <LatexRenderer block tex="0 < \sqrt{(x - 1)^2 + (y + 1)^2} < \delta." />
                    
                    <p>Then, by the triangular inequality, it is justified that</p>
                    <LatexRenderer block tex="\begin{equation} |x - 1| < \delta, \quad |y + 1| < \delta. \end{equation}" />
                    
                    <p>Now, rewriting inequality (1), it turns out that</p>
                    <LatexRenderer block tex="|(x^2 - 3y) - 4| = |x^2 - 1 - 3y + 3| = |(x+1)(x-1) - 3(y+1)|." />
                    
                    <p>By the property of absolute values, we can state that</p>
                    <LatexRenderer block tex="\begin{equation} |(x^2 - 3y) - 4| = |x+1||x-1| - 3|y+1| \leq |x+1||x-1| + 3|y+1|. \end{equation}" />
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Hero;