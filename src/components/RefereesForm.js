import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './RefereesForm.css';

function RefereesForm({ onSubmit }) {
  const { register, handleSubmit, reset } = useForm();
  const [referees, setReferees] = useState([]);

  const submitForm = (data) => {
    const newReferees = [...referees, data];
    setReferees(newReferees);
    onSubmit(newReferees);
    reset();
  };

  return (
    <form className="formSection" onSubmit={handleSubmit(submitForm)}>
      <h3>Referees</h3>
      <div>
        <label>Name:</label>
        <input {...register('name', { required: true })} />
      </div>
      <div>
        <label>Title:</label>
        <input {...register('title')} />
      </div>
      <div>
        <label>Mobile:</label>
        <input {...register('mobile')} />
      </div>
      <div>
        <label>Email:</label>
        <input {...register('email')} type="email" />
      </div>
      <button type="submit">Add</button>
      <ul>
        {referees.map((ref, i) => (
          <li key={i}> {`${ref.name} - ${ref.title}`} </li>
        ))}
      </ul>
    </form>
  );
}

export default RefereesForm;