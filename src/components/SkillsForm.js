import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './SkillsForm.css';

function SkillsForm({ onSubmit }) {
  const { register, handleSubmit, reset } = useForm();
  const [skills, setSkills] = useState({ techStack: [], transferable: [] });

  const submitForm = (data) => {
    const newSkills = {
      techStack: [...skills.techStack, data.techStack].filter(Boolean),
      transferable: [...skills.transferable, data.transferable].filter(Boolean),
    };
    setSkills(newSkills);
    onSubmit(newSkills);
    reset();
  };

  return (
    <form className="formSection" onSubmit={handleSubmit(submitForm)}>
      <h3>Skills</h3>
      <div>
        <label>Tech Stack:</label>
        <input {...register('techStack')} />
      </div>
      <div>
        <label>Transferable Skills:</label>
        <input {...register('transferable')} />
      </div>
      <button type="submit">Add</button>
      <div>
        <h4>Tech Stack</h4>
        <ul>{skills.techStack.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
        <h4>Transferable Skills</h4>
        <ul>{skills.transferable.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
      </div>
    </form>
  );
}

export default SkillsForm;