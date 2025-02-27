import ReactDOMServer from 'react-dom/server';
import htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';
import React from 'react';
import CVTemplate from './CVTemplate'; 

const generateWord = (data) => {
  try {
   
    const htmlString = ReactDOMServer.renderToStaticMarkup(<CVTemplate data={data} exportForWord={true} />);

  
    const inlineCSS = `
      .cvTemplate { width: 210mm; margin: 0 auto; font-size: inherit; }
      hr { border: 1px solid #e0e0e0; margin: 10px 0; }
      h1, h2, p, div, span { font-size: inherit; color: #555; margin: 0 0 5px 0; }
    `;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>CV Document</title>
        <style>
          ${inlineCSS}
        </style>
      </head>
      <body>
        ${htmlString}
      </body>
      </html>
    `;

    const converted = htmlDocx.asBlob(htmlContent);
    saveAs(converted, 'cv.docx');
  } catch (error) {
    console.error('Error generating Word document:', error);
    alert('Failed to generate Word document. Please check the console for details.');
  }
};

export default generateWord;
