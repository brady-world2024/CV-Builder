import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import  './InternshipForm.css';

function InternshipForm({ onSubmit }) {
  const { register, handleSubmit, reset } = useForm();
  const [internships, setInternships] = useState([]);

  const submitForm = (data) => {
    const responsibilities = data.responsibilities.split(',').map((r) => r.trim());
    const newInternships = [...internships, { ...data, responsibilities }];
    setInternships(newInternships);
    onSubmit(newInternships);
    reset();
  };

  return (
    <form className="formSection" onSubmit={handleSubmit(submitForm)}>
      <h3>Internships</h3>
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
        {internships.map((intern, i) => (
          <li key={i}> {`${intern.company} - ${intern.role} (${intern.duration})`} </li>
        ))}
      </ul>
    </form>
  );
}

export default InternshipForm;