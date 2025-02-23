import React from 'react';
import { useForm } from 'react-hook-form';
import './PersonalInfoForm.css';

function PersonalInfoForm({ onSubmit }) {
  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    onSubmit(data);
  };

  return (
    <form className="formSection" onSubmit={handleSubmit(submitForm)}>
      <h3>Personal Information</h3>
      <div>
        <label>Name:</label>
        <input {...register('name', { required: true })} />
      </div>
      <div>
        <label>Location:</label>
        <input {...register('location')} />
      </div>
      <div>
        <label>Phone:</label>
        <input {...register('phone')} />
      </div>
      <div>
        <label>Email:</label>
        <input {...register('email')} type="email" />
      </div>
      <div>
        <label>Portfolio:</label>
        <input {...register('portfolio')} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default PersonalInfoForm;