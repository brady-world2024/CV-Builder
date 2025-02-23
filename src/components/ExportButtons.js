import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import './ExportButtons.css'; // 确保路径正确

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { margin: 10 },
  title: { fontSize: 24, marginBottom: 10 },
  text: { fontSize: 12 },
});

const CVDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.text}>Email: {data.email}</Text>
        <Text style={styles.text}>Phone: {data.phone}</Text>
        <Text style={styles.text}>Education:</Text>
        {data.education.map((edu, index) => (
          <Text key={index} style={styles.text}>
            {edu.school} - {edu.degree} ({edu.duration})
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

function ExportButtons({ data }) {
  const generateWord = () => {
    // 这里只是占位逻辑，实际需要加载模板文件
    const templateContent = `
      {name}
      Email: {email}
      Phone: {phone}
      Education:
      {#education}{school} - {degree} ({duration})\n{/education}
    `;
    const zip = new PizZip();
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
    doc.loadZip(zip); // 空的zip会导致错误，稍后解决
    doc.setData(data);
    doc.render();
    const out = doc.getZip().generate({ type: 'blob' });
    saveAs(out, 'cv.docx');
  };

  return (
    <div className="exportButtons">
      <PDFDownloadLink document={<CVDocument data={data} />} fileName="cv.pdf">
        {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
      </PDFDownloadLink>
      <button onClick={generateWord}>Download Word</button>
    </div>
  );
}

export default ExportButtons;