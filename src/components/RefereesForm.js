import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './RefereesForm.module.css'; 

function RefereesForm({ onSubmit = () => {} }) {
  const { register, handleSubmit, reset } = useForm();
  const [referees, setReferees] = useState([]);

  const submitForm = (data) => {
    const newReferees = [...referees, data];
    setReferees(newReferees);
    if (typeof onSubmit === 'function') {
      onSubmit(newReferees);
    }
    reset();
  };

  const deleteLast = () => {
    if (referees.length === 0) return;
    const newReferees = referees.slice(0, -1);
    setReferees(newReferees);
    if (typeof onSubmit === 'function') {
      onSubmit(newReferees);
    }
  };

  return (
    <form className={styles.formSection} onSubmit={handleSubmit(submitForm)}>
      <h3>Referees</h3>
      <div>
        <label className={styles.label}>Name:</label>
        <input {...register('name', { required: true })} className={styles.input} />
      </div>
      <div>
        <label className={styles.label}>Title:</label>
        <input {...register('title')} className={styles.input} />
      </div>
      <div>
        <label className={styles.label}>Mobile:</label>
        <input {...register('mobile')} className={styles.input} />
      </div>
      <div>
        <label className={styles.label}>Email:</label>
        <input {...register('email')} type="email" className={styles.input} />
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.buttonAdd}>Add</button>
        <button type="button" onClick={deleteLast} className={styles.buttonDelete}>Undo</button>
      </div>
      <ul className={styles.list}>
        {referees.map((ref, i) => (
          <li key={i}>{`${ref.name} - ${ref.title}`}</li>
        ))}
      </ul>
    </form>
  );
}

export default RefereesForm;