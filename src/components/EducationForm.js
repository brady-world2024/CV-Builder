import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './EducationForm.module.css'; 

function EducationForm({ onSubmit = () => {} }) {
  const { register, handleSubmit, reset } = useForm();
  const [education, setEducation] = useState([]);

  const submitForm = (data) => {
    const newEducation = [...education, data];
    setEducation(newEducation);
    if (typeof onSubmit === 'function') {
      onSubmit(newEducation);
    }
    reset();
  };

  const deleteLast = () => {
    if (education.length === 0) return;
    const newEducation = education.slice(0, -1);
    setEducation(newEducation);
    if (typeof onSubmit === 'function') {
      onSubmit(newEducation);
    }
  };

  return (
    <form className={styles.formSection} onSubmit={handleSubmit(submitForm)}>
      <h3>Education</h3>
      <div>
        <label className={styles.label}>School:</label>
        <input {...register('school', { required: true })} className={styles.input} />
      </div>
      <div>
        <label className={styles.label}>Degree:</label>
        <input {...register('degree')} className={styles.input} />
      </div>
      <div>
        <label className={styles.label}>Duration:</label>
        <input {...register('duration')} className={styles.input} />
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.buttonAdd}>Add</button>
        <button type="button" onClick={deleteLast} className={styles.buttonDelete}>Undo</button>
      </div>
      <ul className={styles.list}>
        {education.map((edu, i) => (
          <li key={i}>{edu.school} - {edu.degree} ({edu.duration})</li>
        ))}
      </ul>
    </form>
  );
}

export default EducationForm;