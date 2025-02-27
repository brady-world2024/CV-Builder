import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './SkillsForm.module.css'; 

function SkillsForm({ onSubmit = () => {} }) {
  const { register, handleSubmit, reset } = useForm();
  const [skills, setSkills] = useState({ techStack: [], transferable: [] });

  const submitForm = (data) => {
    const newSkills = {
      techStack: [...skills.techStack, data.techStack].filter(Boolean),
      transferable: [...skills.transferable, data.transferable].filter(Boolean),
    };
    setSkills(newSkills);
    if (typeof onSubmit === 'function') {
      onSubmit(newSkills);
    }
    reset();
  };

  const deleteLast = () => {
    if (skills.techStack.length === 0 && skills.transferable.length === 0) return;
    const newSkills = {
      techStack: skills.techStack.slice(0, -1),
      transferable: skills.transferable.slice(0, -1),
    };
    setSkills(newSkills);
    if (typeof onSubmit === 'function') {
      onSubmit(newSkills);
    }
  };

  return (
    <form className={styles.formSection} onSubmit={handleSubmit(submitForm)}>
      <h3>Skills</h3>
      <div>
        <label className={styles.label}>Tech Stack:</label>
        <input {...register('techStack')} className={styles.input} />
      </div>
      <div>
        <label className={styles.label}>Transferable Skills:</label>
        <input {...register('transferable')} className={styles.input} />
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.buttonAdd}>Add</button>
        <button type="button" onClick={deleteLast} className={styles.buttonDelete}>Undo</button>
      </div>
      <div>
        <h4>Tech Stack</h4>
        <ul className={styles.list}>
          {skills.techStack.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
        <h4>Transferable Skills</h4>
        <ul className={styles.list}>
          {skills.transferable.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>
    </form>
  );
}

export default SkillsForm;