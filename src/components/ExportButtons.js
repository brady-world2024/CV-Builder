import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFDocument } from 'pdf-lib';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import CVDocument from './CVDocument'; // 导入独立文件
import './ExportButtons.css';

// 生成 Word 文档（保持不变）
const generateWord = async (data) => {
  try {
    const response = await fetch('/template.docx');
    if (!response.ok) throw new Error('Failed to load template');
    const arrayBuffer = await response.arrayBuffer();
    const zip = new PizZip(arrayBuffer);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
    doc.setData({
      name: data.personalInfo.name || 'Your Name',
      location: data.personalInfo.location,
      email: data.personalInfo.email,
      phone: data.personalInfo.phone,
      portfolio: data.personalInfo.portfolio,
      statement: data.statement || 'Your personal statement goes here',
      techStack: data.skills.techStack.join('; '),
      transferable: data.skills.transferable.join('; '),
      education: data.education,
      projects: data.projects,
      workExperience: data.workExperience.map(exp => ({
        ...exp,
        responsibilities: exp.responsibilities.join('; ')
      })),
      internships: data.internships.map(intern => ({
        ...intern,
        responsibilities: intern.responsibilities.join('; ')
      })),
      interests: data.interests.join('; '),
      referees: data.referees,
    });
    doc.render();
    const out = doc.getZip().generate({ type: 'blob' });
    saveAs(out, 'cv.docx');
  } catch (error) {
    console.error('Error generating Word document:', error);
    alert('Failed to generate Word document. Please check the console for details.');
  }
};

// 如果上传了PDF模板，则使用pdf-lib进行填充导出；否则使用CVDocument导出与预览一致的PDF
const generatePdfFromTemplate = async (data, pdfTemplate) => {
  try {
    const pdfDoc = await PDFDocument.load(pdfTemplate);
    const form = pdfDoc.getForm();
    // 假设模板中预置了对应字段，具体名称需与你的模板一致
    form.getTextField('name').setText(data.personalInfo.name || 'Your Name');
    form.getTextField('location').setText(data.personalInfo.location || '');
    form.getTextField('phone').setText(data.personalInfo.phone || '');
    form.getTextField('email').setText(data.personalInfo.email || '');
    form.getTextField('portfolio').setText(data.personalInfo.portfolio || '');
    form.getTextField('statement').setText(data.statement || '');
    form.getTextField('techStack').setText(data.skills.techStack.join('; '));
    form.getTextField('transferable').setText(data.skills.transferable.join('; '));
    // 可继续设置其它字段……

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
        <button onClick={() => generatePdfFromTemplate(data, pdfTemplate)}>
          Export Filled PDF
        </button>
      ) : (
        <PDFDownloadLink document={<CVDocument data={data} />} fileName="cv.pdf">
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
        </PDFDownloadLink>
      )}
      <button onClick={() => generateWord(data)}>Download Word</button>
    </div>
  );
}

export default ExportButtons;