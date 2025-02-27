import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import CVDocument from './CVDocument'; 
import './ExportButtons.css';
import generateWord from './generateWord'; 

const generatePdfFromTemplate = async (data, pdfTemplate) => {
  try {
    const pdfDoc = await PDFDocument.load(pdfTemplate);
    const form = pdfDoc.getForm();
    
    form.getTextField('name').setText(data.personalInfo.name || 'Your Name');
    form.getTextField('location').setText(data.personalInfo.location || '');
    form.getTextField('phone').setText(data.personalInfo.phone || '');
    form.getTextField('email').setText(data.personalInfo.email || '');
    form.getTextField('portfolio').setText(data.personalInfo.portfolio || '');
    form.getTextField('statement').setText(data.statement || '');
    form.getTextField('techStack').setText(data.skills.techStack.join('; '));
    form.getTextField('transferable').setText(data.skills.transferable.join('; '));
  

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'cv_filled.pdf');
  } catch (error) {
    console.error('Error generating PDF from template:', error);
    alert('Failed to generate PDF from template. Please check the console for details.');
  }
};

function ExportButtons({ data, pdfTemplate }) {
  return (
    <div className="exportButtons">
      {pdfTemplate ? (
        <button 
          onClick={() => generatePdfFromTemplate(data, pdfTemplate)}
          className="exportButton"
        >
          Export Filled PDF
        </button>
      ) : (
        <PDFDownloadLink 
          document={<CVDocument data={data} />} 
          fileName="cv.pdf"
          className="exportButton"
        >
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
        </PDFDownloadLink>
      )}
      <button onClick={() => generateWord(data)} className="exportButton">
        Download Doc
      </button>
    </div>
  );
}

export default ExportButtons;
