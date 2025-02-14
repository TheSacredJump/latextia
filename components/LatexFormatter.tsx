import React, { useState, useEffect } from 'react';

const LatexFormatter = ({ rawLatex }) => {
  const [formattedLatex, setFormattedLatex] = useState('');

  useEffect(() => {
    if (rawLatex) {
      const formatLatex = (latex) => {
        // Clean up the latex by replacing common patterns
        let formatted = latex
          // Format limit
          .replace(/lim\(x,y\)→\(1,−1\)/g, '\\lim_{(x,y)\\to(1,-1)}')
          // Format powers
          .replace(/(\d+)2/g, '$1^2')
          // Format math environments
          .replace(/\noindent/g, '\n')
          // Add proper spacing after periods
          .replace(/\./g, '. ')
          // Format hashtags
          .replace(/#(\w+)/g, '\\text{#$1}')
          // Format implies arrow
          .replace(/→/g, '\\rightarrow')
          // Format epsilon and delta
          .replace(/ε/g, '\\varepsilon')
          .replace(/δ/g, '\\delta')
          // Format equations
          .replace(/\((1)\)/g, '\\begin{equation}\\label{eq:1}')
          .replace(/\((2)\)/g, '\\begin{equation}\\label{eq:2}')
          .replace(/\((3)\)/g, '\\begin{equation}\\label{eq:3}')
          .replace(/\((4)\)/g, '\\begin{equation}\\label{eq:4}')
          // Format timestamp
          .replace(/(\d+:\d+ [AP]M)/g, '\\hfill{$1}');

        // Split into lines and process each line
        const lines = formatted.split('\n');
        const processed = lines.map(line => {
          if (line.includes('|') || line.includes('=')) {
            // Wrap mathematical expressions in display math
            return `\\[${line}\\]`;
          }
          if (line.includes('Prove that:')) {
            return `\\textbf{${line}}`;
          }
          if (line.trim().startsWith('Proof')) {
            return '\\begin{proof}\n' + line;
          }
          return line;
        }).join('\n');

        return processed;
      };

      setFormattedLatex(formatLatex(rawLatex));
    }
  }, [rawLatex]);

  useEffect(() => {
    // Configure MathJax
    window.MathJax = {
      tex: {
        packages: ['base', 'ams', 'noerrors', 'noundefined'],
        inlineMath: [['$', '$']],
        displayMath: [['\\[', '\\]']],
        processEscapes: true,
        processEnvironments: true,
        tags: 'ams'
      },
      options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
      }
    };

    // Load MathJax
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Trigger MathJax typesetting when formatted latex changes
  useEffect(() => {
    if (formattedLatex && window.MathJax) {
      window.MathJax.typesetPromise?.()
        .catch((err) => console.error('MathJax typesetting failed:', err));
    }
  }, [formattedLatex]);

  return (
    <div className="latex-content p-6">
      <style jsx global>{`
        .latex-content {
          font-size: 16px;
          line-height: 1.6;
        }
        .latex-content .MathJax {
          overflow-x: auto;
          overflow-y: hidden;
          max-width: 100%;
        }
        .latex-content .proof {
          margin: 1em 0;
        }
        .proof::before {
          content: 'Proof.';
          font-style: italic;
        }
        .proof::after {
          content: '□';
          float: right;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: formattedLatex }} />
    </div>
  );
};

export default LatexFormatter;