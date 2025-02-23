import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './EducationForm.css';

function EducationForm({ onSubmit }) {
  const { register, handleSubmit, reset } = useForm();
  const [education, setEducation] = useState([]);

  const submitForm = (data) => {
    const newEducation = [...education, data];
    setEducation(newEducation);
    onSubmit(newEducation);
    reset();
  };

  return (
    <form className="formSection" onSubmit={handleSubmit(submitForm)}>
      <h3>Education</h3>
      <div>
        <label>School:</label>
        <input {...register('school', { required: true })} />
      </div>
      <div>
        <label>Degree:</label>
        <input {...register('degree')} />
      </div>
      <div>
        <label>Duration:</label>
        <input {...register('duration')} />
      </div>
      <button type="submit">Add</button>
      <ul>
        {education.map((edu, i) => (
          <li key={i}> {edu.school} - {edu.degree} ({edu.duration}) </li>
        ))}
      </ul>
    </form>
  );
}

export default EducationForm;