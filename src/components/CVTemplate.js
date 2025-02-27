import React from 'react';
import styles from './CVTemplate.module.css'; 

function formatBySemicolon(text) {
  const parts = text.split(';').filter(item => item.trim() !== '');
  return parts.map((part, index) => {
    const colonIndex = part.indexOf(':');
    if (colonIndex !== -1) {
      const beforeColon = part.substring(0, colonIndex).trim();
      const afterColon = part.substring(colonIndex);
      return (
        <div key={index}>
          <span className="bullet">• </span>
          <strong>{beforeColon}</strong>
          {afterColon}
        </div>
      );
    } else {
      return (
        <div key={index}>
          <span className="bullet">• </span>
          {part.trim()}
        </div>
      );
    }
  });
}

const computeBaseFontSize = (data) => {
  const countArray = (arr) => arr.length;
  const totalItems =
    1 +
    1 +
    (countArray(data.skills.techStack) + countArray(data.skills.transferable)) +
    countArray(data.education) +
    countArray(data.projects) +
    data.workExperience.reduce((sum, exp) => sum + (exp.responsibilities ? exp.responsibilities.length : 0), 0) +
    data.internships.reduce((sum, intern) => sum + (intern.responsibilities ? intern.responsibilities.length : 0), 0) +
    countArray(data.interests) +
    countArray(data.referees);
  return Math.max(8, Math.min(12, 1564 / (totalItems * 30)));
};

const computeHeadingMultipliers = () => {
  return { h1: 1.3, h2: 1.1 };
};

function CVTemplate({ data, exportForWord = false, darkMode = false }) {
  const baseFontSize = computeBaseFontSize(data);
  const { h1: h1Multiplier, h2: h2Multiplier } = computeHeadingMultipliers(baseFontSize);
  const baseStyle = { fontSize: baseFontSize + 'pt' };

  return (
    <div className={`${styles.cvTemplate} ${darkMode ? styles.dark : styles.light}`} style={{ ...baseStyle }}>
      <h1 style={{ fontSize: baseFontSize * h1Multiplier + 'pt' }}>
        {data.personalInfo.name || 'Your Name'}
      </h1>
      <p>{data.personalInfo.location}</p>
      <p><strong>Phone:</strong> {data.personalInfo.phone}</p>
      <p><strong>Email:</strong> {data.personalInfo.email}</p>
      <p><strong>My Portfolio:</strong> <a href={data.personalInfo.portfolio}>{data.personalInfo.portfolio}</a></p>
      <hr />

      <h1 style={{ fontSize: baseFontSize * h1Multiplier + 'pt' }}>PERSONAL STATEMENT</h1>
      <p>{data.statement || 'Your personal statement goes here'}</p>
      <hr />

      <h1 style={{ fontSize: baseFontSize * h1Multiplier + 'pt' }}>SKILLS</h1>
      <h2 style={{ fontSize: baseFontSize * h2Multiplier + 'pt' }}>Tech Stack</h2>
      <div>
        {data.skills.techStack.map((skill, i) => (
          <div key={i}>{formatBySemicolon(skill)}</div>
        ))}
      </div>
      <h2 style={{ fontSize: baseFontSize * h2Multiplier + 'pt' }}>Transferable Skills</h2>
      <div>
        {data.skills.transferable.map((skill, i) => (
          <div key={i}>{formatBySemicolon(skill)}</div>
        ))}
      </div>
      <hr />

      <h1 style={{ fontSize: baseFontSize * h1Multiplier + 'pt' }}>EDUCATION</h1>
      {data.education.map((edu, i) => (
        <div key={i}>
          <h2 style={{ fontSize: baseFontSize * h2Multiplier + 'pt' }}>{edu.school}</h2>
          <p>{edu.degree} ({edu.duration})</p>
        </div>
      ))}
      <hr />

      <h1 style={{ fontSize: baseFontSize * h1Multiplier + 'pt' }}>PROJECTS</h1>
      {data.projects.map((proj, i) => (
        <div key={i}>
          <h2 style={{ fontSize: baseFontSize * h2Multiplier + 'pt' }}>
            {proj.name} ({proj.link})
          </h2>
          <p>{proj.description}</p>
          {proj.systemArchitecture && (
            <div>
              <p><strong>System Architecture:</strong></p>
              {formatBySemicolon(proj.systemArchitecture)}
            </div>
          )}
          <p><strong>Tech Stack:</strong> <span style={{ fontWeight: 'bold' }}>{proj.techStack}</span></p>
        </div>
      ))}
      <hr />

      <h1 style={{ fontSize: baseFontSize * h1Multiplier + 'pt' }}>WORK EXPERIENCE</h1>
      {data.workExperience.map((exp, i) =>
        exportForWord ? (
          <table key={i} style={{ width: '100%', marginBottom: '10px', tableLayout: 'fixed' }}>
            <tbody>
              <tr>
                <td style={{ width: '25%', verticalAlign: 'top', paddingRight: '10px', boxSizing: 'border-box' }}>
                  <span>{exp.company}</span>
                  <p>{exp.location}</p>
                  <p>{exp.duration}</p>
                </td>
                <td style={{ width: '75%', verticalAlign: 'top', paddingLeft: '10px', boxSizing: 'border-box' }}>
                  <span>{exp.role}</span>
                  {exp.responsibilities &&
                    exp.responsibilities.map((resp, j) => (
                      <div key={j}>{formatBySemicolon(resp)}</div>
                    ))}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div key={i} className="experience-container">
            <div className="left-column">
              <span>{exp.company}</span>
              <p>{exp.location}</p>
              <p>{exp.duration}</p>
            </div>
            <div className="right-column">
              <span>{exp.role}</span>
              {exp.responsibilities &&
                exp.responsibilities.map((resp, j) => (
                  <div key={j}>{formatBySemicolon(resp)}</div>
                ))}
            </div>
          </div>
        )
      )}
      <hr />

      <h1 style={{ fontSize: baseFontSize * h1Multiplier + 'pt' }}>INTERNSHIPS</h1>
      {data.internships.map((intern, i) =>
        exportForWord ? (
          <table key={i} style={{ width: '100%', marginBottom: '10px', tableLayout: 'fixed' }}>
            <tbody>
              <tr>
                <td style={{ width: '25%', verticalAlign: 'top', paddingRight: '10px', boxSizing: 'border-box' }}>
                  <span>{intern.company}</span>
                  <p>{intern.location}</p>
                  <p>{intern.duration}</p>
                </td>
                <td style={{ width: '75%', verticalAlign: 'top', paddingLeft: '10px', boxSizing: 'border-box' }}>
                  <span>{intern.role}</span>
                  {intern.responsibilities &&
                    intern.responsibilities.map((resp, j) => (
                      <div key={j}>{formatBySemicolon(resp)}</div>
                    ))}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div key={i} className="experience-container">
            <div className="left-column">
              <span>{intern.company}</span>
              <p>{intern.location}</p>
              <p>{intern.duration}</p>
            </div>
            <div className="right-column">
              <span>{intern.role}</span>
              {intern.responsibilities &&
                intern.responsibilities.map((resp, j) => (
                  <div key={j}>{formatBySemicolon(resp)}</div>
                ))}
            </div>
          </div>
        )
      )}
      <hr />

      <h1 style={{ fontSize: baseFontSize * h1Multiplier + 'pt' }}>INTERESTS</h1>
      <ul>
        {data.interests.map((interest, i) => (
          <li key={i}>{interest}</li>
        ))}
      </ul>
      <hr />

      <h1 style={{ fontSize: baseFontSize * h1Multiplier + 'pt' }}>REFEREES</h1>
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