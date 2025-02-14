// components/LatexRenderer.tsx
import React from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css"; // Import Katex styles

interface LatexRendererProps {
  tex: string;
  block?: boolean;
}

const LatexRenderer: React.FC<LatexRendererProps> = ({ tex, block = false }) => {
  return block ? <BlockMath>{tex}</BlockMath> : <InlineMath>{tex}</InlineMath>;
};

export default LatexRenderer;
