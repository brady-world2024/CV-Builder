import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './WorkExperienceForm.css';

function WorkExperienceForm({ onSubmit }) {
  const { register, handleSubmit, reset } = useForm();
  const [workExperience, setWorkExperience] = useState([]);

  const submitForm = (data) => {
    const responsibilities = data.responsibilities.split(',').map((r) => r.trim());
    const newWork = [...workExperience, { ...data, responsibilities }];
    setWorkExperience(newWork);
    onSubmit(newWork);
    reset();
  };

  return (
    <form className="formSection" onSubmit={handleSubmit(submitForm)}>
      <h3>Work Experience</h3>
      <div>
        <label>Company:</label>
        <input {...register('company', { required: true })} />
      </div>
      <div>
        <label>Location:</label>
        <input {...register('location')} />
      </div>
      <div>
        <label>Duration:</label>
        <input {...register('duration')} />
      </div>
      <div>
        <label>Role:</label>
        <input {...register('role')} />
      </div>
      <div>
        <label>Responsibilities (comma-separated):</label>
        <input {...register('responsibilities')} />
      </div>
      <button type="submit">Add</button>
      <ul>
        {workExperience.map((exp, i) => (
          <li key={i}> {`${exp.company} - ${exp.role} (${exp.duration})`} </li>
        ))}
      </ul>
    </form>
  );
}

export default WorkExperienceForm;