import React from 'react';
import { useForm } from 'react-hook-form';
import './StatementForm.css';

function StatementForm({ onSubmit }) {
  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    onSubmit(data.statement);
  };

  return (
    <form className="formSection" onSubmit={handleSubmit(submitForm)}>
      <h3>Personal Statement</h3>
      <textarea
        {...register('statement')}
        rows="5"
        placeholder="Enter your personal statement..."
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default StatementForm;