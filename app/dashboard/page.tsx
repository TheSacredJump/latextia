"use client"

import React, { useState, useEffect } from 'react';
import { FileText, Settings, Upload, User, Menu, ArrowLeft, Home } from 'lucide-react';
import { UserButton } from "@clerk/nextjs";
import Image from 'next/image';
import LatexFormatter from '@/components/LatexFormatter';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setContent] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

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

  // Trigger MathJax typesetting when content changes
  useEffect(() => {
    if (content && window.MathJax) {
      window.MathJax.typesetPromise?.()
        .catch((err) => console.error('MathJax typesetting failed:', err));
    }
  }, [content]);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setIsProcessing(true);
      
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/process-image', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to process image');
        }

        const data = await response.json();
        setContent(data.latex);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Render the content with proper styling
  const renderContent = () => {
    if (!content) return null;
    
    return (
      <ReactMarkdown
        components={{
          code: ({node, inline, className, children, ...props}) => {
            const match = /language-(\w+)/.exec(className || '');
            if (inline && !match) {
              // This is an inline math expression
              return <LatexFormatter rawLatex={String(children)} />;
            }
            return <code className={className} {...props}>{children}</code>;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white border-r border-neutral-200 transition-all duration-300 ${sidebarOpen ? 'w-48' : 'w-16'}`}>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-neutral-100"
        >
          {sidebarOpen ? <ArrowLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        <div className="p-4 flex flex-col gap-2 mt-12">
          <Link href="/" className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-100 text-neutral-700">
            <Home className="w-4 h-4" />
            {sidebarOpen && <span className="font-medium">Home</span>}
          </Link>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 text-green-700">
            <FileText className="w-4 h-4" />
            {sidebarOpen && <span className="font-medium">Documents</span>}
          </div>
        </div>

        <div className="absolute bottom-4 left-0 w-full px-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-48' : 'ml-16'}`}>
        <div className="p-6">
          {!selectedImage ? (
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <p className="text-sm text-yellow-700">
                  Note: AI-powered text recognition may not always be 100% accurate. Please review and verify the output before use.
                </p>
              </div>
              <label className="block w-full max-w-3xl mx-auto p-12 border-2 border-dashed border-neutral-300 rounded-lg bg-white cursor-pointer hover:border-green-500 transition-colors">
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
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <label onClick={() => window.location.reload()} className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Upload New Image</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </label>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex-1">
                  <p className="text-sm text-yellow-700">
                    Note: AI-powered text recognition may not always be 100% accurate. Please review and verify the output before use.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6 h-[calc(100vh-8rem)]">
                {/* Original Notes */}
                <div className="flex-1 rounded-lg border border-neutral-200 overflow-hidden bg-white">
                  <div className="p-3 border-b border-neutral-200 bg-neutral-50">
                    <h3 className="font-medium">Original Notes</h3>
                  </div>
                  <div className="relative h-[calc(100%-48px)]">
                    <Image 
                      src={selectedImage}
                      alt="Uploaded notes"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Output */}
                <div className="flex-1 rounded-lg border border-neutral-200 overflow-hidden bg-white">
                  <div className="p-3 border-b border-neutral-200 bg-gradient-to-br from-green-500 to-emerald-500">
                    <h3 className="font-medium text-white">Formatted Output</h3>
                  </div>
                  <div className="h-[calc(100%-48px)] overflow-auto p-4">
                    {isProcessing ? (
                      <div>
                        <p className="text-neutral-600">Processing your notes...</p>
                      </div>
                    ) : (
                      renderContent()
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}