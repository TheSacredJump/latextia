import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageBytes = await file.arrayBuffer();
    
    const prompt = `Convert these handwritten notes into a mix of Markdown and LaTeX. Follow these requirements:

1. Use Markdown for:
   - Headings (# ## ###)
   - Bullet points and numbered lists
   - Basic text formatting (bold, italic)
   - Simple paragraphs and text content
   
2. Use LaTeX for all mathematical content:
   - Equations and formulas (using $ or $$)
   - Mathematical symbols and operators
   - Matrices and arrays
   - Complex mathematical expressions
   - Special mathematical environments (align, equation, etc)

3. Format guidelines:
   - Keep mathematical expressions in LaTeX syntax with $ or $$ delimiters
   - Use markdown # for section headings
   - Use markdown * or - for bullet points
   - Use markdown ** or __ for bold text
   - Use markdown * or _ for italic text
   - Preserve any specific formatting and layout

Return the content as a mix of Markdown and LaTeX without any additional formatting or explanations. Mathematical expressions should be properly escaped and enclosed in LaTeX delimiters.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: file.type,
          data: Buffer.from(imageBytes).toString('base64')
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ latex: text });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}