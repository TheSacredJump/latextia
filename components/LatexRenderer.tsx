// components/LatexRenderer.tsx
import React, { useEffect, useRef } from "react";

interface LatexRendererProps {
  tex: string;
  block?: boolean;
}

const LatexRenderer: React.FC<LatexRendererProps> = ({ tex, block = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && window.MathJax) {
      containerRef.current.innerHTML = block ? `$$${tex}$$` : `$${tex}$`;
      window.MathJax.typesetPromise?.([containerRef.current])
        .catch((err) => console.error('MathJax typesetting failed:', err));
    }
  }, [tex, block]);

  return <div ref={containerRef} />;
};

export default LatexRenderer;
