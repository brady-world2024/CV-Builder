import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './ProjectForm.css';

function ProjectForm({ onSubmit }) {
  const { register, handleSubmit, reset } = useForm();
  const [projects, setProjects] = useState([]);

  const submitForm = (data) => {
    const newProjects = [...projects, data];
    setProjects(newProjects);
    onSubmit(newProjects);
    reset();
  };

  return (
    <form className="formSection" onSubmit={handleSubmit(submitForm)}>
      <h3>Projects</h3>
      <div>
        <label>Name:</label>
        <input {...register('name', { required: true })} />
      </div>
      <div>
        <label>Link:</label>
        <input {...register('link')} />
      </div>
      <div>
        <label>Description:</label>
        <textarea {...register('description')} rows="3" />
      </div>
      <div>
        <label>Tech Stack:</label>
        <input {...register('techStack')} />
      </div>
      <button type="submit">Add</button>
      <ul>
        {projects.map((proj, i) => (
          <li key={i}> {`${proj.name} (${proj.link}) - ${proj.techStack}`} </li>
        ))}
      </ul>
    </form>
  );
}

export default ProjectForm;