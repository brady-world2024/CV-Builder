import React from 'react';
import './CVTemplate.css';

function CVTemplate({ data }) {
  return (
    <div className="cvTemplate">
      {/* Personal Information */}
      <h1>{data.personalInfo.name || 'Your Name'}</h1>
      <p>{data.personalInfo.location}</p>
      <p><strong>Phone:</strong> {data.personalInfo.phone}</p>
      <p><strong>Email:</strong> {data.personalInfo.email}</p>
      <p><strong>My Portfolio:</strong> <a href={data.personalInfo.portfolio}>{data.personalInfo.portfolio}</a></p>
      <hr />

      {/* Personal Statement */}
      <h2>PERSONAL STATEMENT</h2>
      <p>{data.statement || 'Your personal statement goes here'}</p>
      <hr />

      {/* Skills */}
      <h2>SKILLS</h2>
      <h3>Tech Stack</h3>
      <ul>{data.skills.techStack.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
      <h3>Transferable Skills</h3>
      <ul>{data.skills.transferable.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
      <hr />

      {/* Education */}
      <h2>EDUCATION</h2>
      <ul>
        {data.education.map((edu, i) => (
          <li key={i}>{`${edu.school} - ${edu.degree} (${edu.duration})`}</li>
        ))}
      </ul>
      <hr />

      {/* Projects */}
      <h2>PROJECTS</h2>
      {data.projects.map((proj, i) => (
        <div key={i}>
          <p><strong>{proj.name}</strong> ({proj.link})</p>
          <p>{proj.description}</p>
          <p><strong>Tech Stack:</strong> {proj.techStack}</p>
        </div>
      ))}
      <hr />

      {/* Work Experience */}
      <h2>WORK EXPERIENCE</h2>
      {data.workExperience.map((exp, i) => (
        <div key={i}>
          <p><strong>{exp.company}</strong> - {exp.location}</p>
          <p>{exp.duration} - {exp.role}</p>
          <ul>{exp.responsibilities.map((resp, j) => <li key={j}>{resp}</li>)}</ul>
        </div>
      ))}
      <hr />

      {/* Internships */}
      <h2>INTERNSHIPS</h2>
      {data.internships.map((intern, i) => (
        <div key={i}>
          <p><strong>{intern.company}</strong> - {intern.location}</p>
          <p>{intern.duration} - {intern.role}</p>
          <ul>{intern.responsibilities.map((resp, j) => <li key={j}>{resp}</li>)}</ul>
        </div>
      ))}
      <hr />

      {/* Interests */}
      <h2>INTERESTS</h2>
      <ul>{data.interests.map((interest, i) => <li key={i}>{interest}</li>)}</ul>
      <hr />

      {/* Referees */}
      <h2>REFEREES</h2>
      {data.referees.map((ref, i) => (
        <div key={i}>
          <p>{ref.name}</p>
          <p>{ref.title}</p>
          <p><strong>Mobile:</strong> {ref.mobile}</p>
          <p><strong>Email:</strong> {ref.email}</p>
        </div>
      ))}
    </div>
  );
}

export default CVTemplate;