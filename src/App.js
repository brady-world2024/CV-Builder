import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import PersonalInfoForm from './components/PersonalInfoForm';
import StatementForm from './components/StatementForm';
import SkillsForm from './components/SkillsForm';
import EducationForm from './components/EducationForm';
import ProjectForm from './components/ProjectForm';
import WorkExperienceForm from './components/WorkExperienceForm';
import InternshipForm from './components/InternshipForm';
import InterestsForm from './components/InterestsForm';
import RefereesForm from './components/RefereesForm';
import CVTemplate from './components/CVTemplate';
import ExportButtons from './components/ExportButtons';
import './App.css';

function App() {
  const [cvData, setCvData] = useState({
    personalInfo: { name: '', location: '', phone: '', email: '', portfolio: '' },
    statement: '',
    skills: { techStack: [], transferable: [] },
    education: [],
    projects: [],
    workExperience: [],
    internships: [],
    interests: [],
    referees: [],
  });

  const updateData = (section, data) => {
    setCvData((prev) => ({ ...prev, [section]: data }));
  };


  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

 
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <div className={`appContainer ${darkMode ? 'dark' : 'light'}`}>
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="content">
        <PersonalInfoForm onSubmit={(data) => updateData('personalInfo', data)} />
        <StatementForm onSubmit={(data) => updateData('statement', data)} />
        <SkillsForm onSubmit={(data) => updateData('skills', data)} />
        <EducationForm onSubmit={(data) => updateData('education', data)} />
        <ProjectForm onSubmit={(data) => updateData('projects', data)} />
        <WorkExperienceForm onSubmit={(data) => updateData('workExperience', data)} />
        <InternshipForm onSubmit={(data) => updateData('internships', data)} />
        <InterestsForm onSubmit={(data) => updateData('interests', data)} />
        <RefereesForm onSubmit={(data) => updateData('referees', data)} />
        <h2>Preview</h2>
        <CVTemplate data={cvData} />
        <ExportButtons data={cvData} />
      </div>
    </div>
  );
}

export default App;
