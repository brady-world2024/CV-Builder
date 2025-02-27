import React from 'react';
import styles from './TemplateUpload.module.css';

// 示例：提取 PDF 模板中每级标题的字体大小、颜色和列表样式
// 这里仅返回一个模拟结果，实际使用时需要集成 PDF 解析库来解析 ArrayBuffer 获取样式信息
async function extractTemplateStyles(arrayBuffer) {
  // TODO: 使用 pdf-lib 或其它 PDF 解析库来提取模板中的样式信息
  // 此处返回模拟数据
  return {
    headingStyles: {
      h1: { fontSize: 24, color: '#000000' },
      h2: { fontSize: 20, color: '#333333' },
      h3: { fontSize: 18, color: '#666666' },
    },
    listStyle: {
      bullet: '•',
      spacing: 8,
    },
  };
}

function TemplateUpload({ onTemplateUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const arrayBuffer = reader.result;
      const extractedStyles = await extractTemplateStyles(arrayBuffer);

      onTemplateUpload({ rawTemplate: arrayBuffer, styles: extractedStyles });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className={styles.templateUpload}>
      <label className={styles.label}>Import CV Template:</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className={styles.input}
      />
    </div>
  );
}

export default TemplateUpload;
