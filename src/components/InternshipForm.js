import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './InternshipForm.module.css'; 

function InternshipForm({ onSubmit = () => {} }) {
  const { register, handleSubmit, reset } = useForm();
  const [internships, setInternships] = useState([]);

  const submitForm = (data) => {

    const responsibilities = data.responsibilities.split('.').map(r => r.trim()).filter(Boolean);
    const newInternships = [...internships, { ...data, responsibilities }];
    setInternships(newInternships);
    if (typeof onSubmit === 'function') {
      onSubmit(newInternships);
    }
    reset();
  };

  const deleteLast = () => {
    if (internships.length === 0) return;
    const newInternships = internships.slice(0, -1);
    setInternships(newInternships);
    if (typeof onSubmit === 'function') {
      onSubmit(newInternships);
    }
  };

  return (
    <form className={styles.formSection} onSubmit={handleSubmit(submitForm)}>
      <h3>Internships</h3>
      <div>
        <label className={styles.label}>Company:</label>
        <input {...register('company', { required: true })} className={styles.input} />
      </div>
      <div>
        <label className={styles.label}>Location:</label>
        <input {...register('location')} className={styles.input} />
      </div>
      <div>
        <label className={styles.label}>Duration:</label>
        <input {...register('duration')} className={styles.input} />
      </div>
      <div>
        <label className={styles.label}>Role:</label>
        <input {...register('role')} className={styles.input} />
      </div>
      <div>
        <label className={styles.label}>Responsibilities (period-separated):</label>
        <input
          {...register('responsibilities')}
  
          className={styles.input}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.buttonAdd}>Add</button>
        <button type="button" onClick={deleteLast} className={styles.buttonDelete}>Undo</button>
      </div>
      <ul className={styles.list}>
        {internships.map((intern, i) => (
          <li key={i}>
            {`${intern.company} - ${intern.role} (${intern.duration})`}
            {intern.responsibilities.length > 0 && (
              <div className={styles.responsibilities}>
                {intern.responsibilities.map((resp, j) => (
                  <div key={j}>{resp}</div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default InternshipForm;