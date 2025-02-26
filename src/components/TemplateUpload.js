import React from 'react';
import styles from './TemplateUpload.module.css'; // 引入模块化 CSS

function TemplateUpload({ onTemplateUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result 为 ArrayBuffer
      onTemplateUpload(reader.result);
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