import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './ProjectForm.module.css'; 

function ProjectForm({ onSubmit = () => {} }) {
  const { register, handleSubmit, reset } = useForm();
  const [projects, setProjects] = useState([]);

  const submitForm = (data) => {
    const newProjects = [...projects, data];
    setProjects(newProjects);
    if (typeof onSubmit === 'function') {
      onSubmit(newProjects);
    }
    reset();
  };

  const deleteLast = () => {
    if (projects.length === 0) return;
    const newProjects = projects.slice(0, -1);
    setProjects(newProjects);
    if (typeof onSubmit === 'function') {
      onSubmit(newProjects);
    }
  };

  return (
    <form className={styles.formSection} onSubmit={handleSubmit(submitForm)}>
      <h3>Projects</h3>
      <div>
        <label className={styles.label}>Name:</label>
        <input {...register('name', { required: true })} className={styles.input} />
      </div>
      <div>
        <label className={styles.label}>Link:</label>
        <input {...register('link')} className={styles.input} />
      </div>
      <div>
        <label className={styles.label}>Description:</label>
        <textarea {...register('description')} rows="3" className={styles.textarea} />
      </div>
      <div>
        <label className={styles.label}>System Architecture:</label>
        <textarea {...register('systemArchitecture')} rows="3" className={styles.textarea} />
      </div>
      <div>
        <label className={styles.label}>Tech Stack:</label>
        <input {...register('techStack')} className={styles.input} />
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.buttonAdd}>Add</button>
        <button type="button" onClick={deleteLast} className={styles.buttonDelete}>Undo</button>
      </div>
      <ul className={styles.list}>
        {projects.map((proj, i) => (
          <li key={i}>
            {proj.name} ({proj.link}) - {proj.description && `Description: ${proj.description}`}{' '}
            {proj.systemArchitecture && `System Architecture: ${proj.systemArchitecture}`}{' '}
            {proj.techStack && `Tech Stack: ${proj.techStack}`}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default ProjectForm;