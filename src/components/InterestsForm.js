import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './InterestsForm.module.css'; // 改为模块化 CSS

function InterestsForm({ onSubmit = () => {} }) {
  const { register, handleSubmit, reset } = useForm();
  const [interests, setInterests] = useState([]);

  const submitForm = (data) => {
    const newInterests = [...interests, data.interest].filter(Boolean);
    setInterests(newInterests);
    if (typeof onSubmit === 'function') {
      onSubmit(newInterests);
    }
    reset();
  };

  const deleteLast = () => {
    if (interests.length === 0) return;
    const newInterests = interests.slice(0, -1);
    setInterests(newInterests);
    if (typeof onSubmit === 'function') {
      onSubmit(newInterests);
    }
  };

  return (
    <form className={styles.formSection} onSubmit={handleSubmit(submitForm)}>
      <h3>Interests</h3>
      <div>
        <label className={styles.label}>Interest:</label>
        <input {...register('interest')} className={styles.input} />
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.buttonAdd}>Add</button>
        <button type="button" onClick={deleteLast} className={styles.buttonDelete}>Delete Last</button>
      </div>
      <ul className={styles.list}>
        {interests.map((interest, i) => (
          <li key={i}>{interest}</li>
        ))}
      </ul>
    </form>
  );
}

export default InterestsForm;