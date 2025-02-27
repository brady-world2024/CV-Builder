import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './WorkExperienceForm.module.css'; 

function WorkExperienceForm({ onSubmit = () => {} }) {
  const { register, handleSubmit, reset } = useForm();
  const [workExperience, setWorkExperience] = useState([]);

  const submitForm = (data) => {
 
    const responsibilities = data.responsibilities.split('.').map(r => r.trim()).filter(Boolean);
    const newWork = [...workExperience, { ...data, responsibilities }];
    setWorkExperience(newWork);
    if (typeof onSubmit === 'function') {
      onSubmit(newWork);
    }
    reset();
  };

  const deleteLast = () => {
    if (workExperience.length === 0) return;
    const newWork = workExperience.slice(0, -1);
    setWorkExperience(newWork);
    if (typeof onSubmit === 'function') {
      onSubmit(newWork);
    }
  };

  return (
    <form className={styles.formSection} onSubmit={handleSubmit(submitForm)}>
      <h3>Work Experience</h3>
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
        {workExperience.map((exp, i) => (
          <li key={i}>
            {`${exp.company} - ${exp.role} (${exp.duration})`}
            {exp.responsibilities.length > 0 && (
              <div className={styles.responsibilities}>
                {exp.responsibilities.map((resp, j) => (
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

export default WorkExperienceForm;