import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './InterestsForm.css';

function InterestsForm({ onSubmit }) {
  const { register, handleSubmit, reset } = useForm();
  const [interests, setInterests] = useState([]);

  const submitForm = (data) => {
    const newInterests = [...interests, data.interest].filter(Boolean);
    setInterests(newInterests);
    onSubmit(newInterests);
    reset();
  };

  return (
    <form className="formSection" onSubmit={handleSubmit(submitForm)}>
      <h3>Interests</h3>
      <div>
        <label>Interest:</label>
        <input {...register('interest')} />
      </div>
      <button type="submit">Add</button>
      <ul>
        {interests.map((interest, i) => (
          <li key={i}>{interest}</li>
        ))}
      </ul>
    </form>
  );
}

export default InterestsForm;