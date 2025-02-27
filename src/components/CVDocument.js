import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const computeBaseFontSize = (data) => {
    // eslint-disable-next-line no-unused-vars
  const countArray = (arr) => arr.length;
  const totalItems =
    1 + // Personal Info
    1 + // Statement
    (data.skills.techStack.length + data.skills.transferable.length) +
    data.education.length +
    data.projects.length +
    data.workExperience.reduce((sum, exp) => sum + (exp.responsibilities ? exp.responsibilities.length : 0), 0) +
    data.internships.reduce((sum, intern) => sum + (intern.responsibilities ? intern.responsibilities.length : 0), 0) +
    data.interests.length +
    data.referees.length;
  return Math.max(8, Math.min(12, 1564 / (totalItems * 30)));
};

const computeHeadingMultipliers = (baseFontSize) => {
  if (baseFontSize > 10) {
    return { h1: 1.8, h2: 1.4 };
  } else {
    return { h1: 1.6, h2: 1.2 };
  }
};


const createStyles = (baseFontSize, h1Multiplier, h2Multiplier) =>
  StyleSheet.create({
    page: {
      padding: 20,
      fontFamily: 'Helvetica',
      backgroundColor: '#fff',
    },
    container: {
      width: '100%',
      marginBottom: 10,
    },
    h1: {
      fontSize: baseFontSize * h1Multiplier,
      color: '#2c3e50',
      marginBottom: 10,
      borderBottomWidth: 1.5,
      borderBottomColor: '#3498db',
      paddingBottom: 3,
    },
    h2: {
      fontSize: baseFontSize * h2Multiplier,
      color: '#2980b9',
      marginTop: 8,
      marginBottom: 4,
    },
    text: {
      fontSize: baseFontSize,
      color: '#555',
      marginBottom: 3,
    },
    boldText: {
      fontSize: baseFontSize,
      color: '#555',
      fontWeight: 'bold',
    },
    hr: {
      borderBottomWidth: 0.5,
      borderBottomColor: '#e0e0e0',
      marginVertical: 10,
    },
    link: {
      color: '#3498db',
      textDecoration: 'none',
    },
    experienceContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    leftColumn: {
      width: '25%',
    },
    rightColumn: {
      width: '75%',
    },
  });

const CVDocument = ({ data }) => {
 
  const baseFontSize = computeBaseFontSize(data);
  const { h1: h1Multiplier, h2: h2Multiplier } = computeHeadingMultipliers(baseFontSize);
  const styles = createStyles(baseFontSize, h1Multiplier, h2Multiplier);

  return (
    <Document>
 
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>

          <Text style={styles.h1}>{data.personalInfo.name || 'Your Name'}</Text>
          <Text style={styles.text}>{data.personalInfo.location}</Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Phone:</Text> {data.personalInfo.phone}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Email:</Text> {data.personalInfo.email}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>My Portfolio:</Text>{' '}
            <Text style={styles.link}>{data.personalInfo.portfolio}</Text>
          </Text>
          <View style={styles.hr} />

   
          <Text style={styles.h1}>PERSONAL STATEMENT</Text>
          <Text style={styles.text}>{data.statement || 'Your personal statement goes here'}</Text>
          <View style={styles.hr} />

      
          <Text style={styles.h1}>SKILLS</Text>
          <Text style={styles.h2}>Tech Stack</Text>
          {data.skills.techStack.map((skill, i) => (
            <Text key={i} style={styles.text}>{skill}</Text>
          ))}
          <Text style={styles.h2}>Transferable Skills</Text>
          {data.skills.transferable.map((skill, i) => (
            <Text key={i} style={styles.text}>{skill}</Text>
          ))}
          <View style={styles.hr} />

          <Text style={styles.h1}>EDUCATION</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={styles.container}>
              <Text style={styles.h2}>{edu.school}</Text>
              <Text style={styles.text}>{edu.degree} ({edu.duration})</Text>
            </View>
          ))}
          <View style={styles.hr} />
        </View>
      </Page>


      <Page size="A4" style={styles.page}>
        <View style={styles.container}>

          <Text style={styles.h1}>PROJECTS</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={styles.container}>
              <Text style={styles.h2}>
                {proj.name} ({proj.link})
              </Text>
              <Text style={styles.text}>{proj.description}</Text>
              {proj.systemArchitecture && (
                <View style={styles.container}>
                  <Text style={styles.text}>
                    <Text style={styles.boldText}>System Architecture:</Text>
                  </Text>

                  {proj.systemArchitecture.split(';').map((arch, j) =>
                    arch.trim() ? <Text key={j} style={styles.text}>{arch.trim()}</Text> : null
                  )}
                </View>
              )}
              <Text style={styles.text}>
                <Text style={styles.boldText}>Tech Stack:</Text> {proj.techStack}
              </Text>
            </View>
          ))}
          <View style={styles.hr} />

          <Text style={styles.h1}>WORK EXPERIENCE</Text>
          {data.workExperience.map((exp, i) => (
            <View key={i} style={styles.experienceContainer}>
              <View style={styles.leftColumn}>
                <Text style={styles.text}>{exp.company}</Text>
                <Text style={styles.text}>{exp.location}</Text>
                <Text style={styles.text}>{exp.duration}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.text}>{exp.role}</Text>
                {exp.responsibilities &&
                  exp.responsibilities.map((resp, j) => (
                    <Text key={j} style={styles.text}>{resp}</Text>
                  ))}
              </View>
            </View>
          ))}
          <View style={styles.hr} />

          <Text style={styles.h1}>INTERNSHIPS</Text>
          {data.internships.map((intern, i) => (
            <View key={i} style={styles.experienceContainer}>
              <View style={styles.leftColumn}>
                <Text style={styles.text}>{intern.company}</Text>
                <Text style={styles.text}>{intern.location}</Text>
                <Text style={styles.text}>{intern.duration}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.text}>{intern.role}</Text>
                {intern.responsibilities &&
                  intern.responsibilities.map((resp, j) => (
                    <Text key={j} style={styles.text}>{resp}</Text>
                  ))}
              </View>
            </View>
          ))}
          <View style={styles.hr} />

          <Text style={styles.h1}>INTERESTS</Text>
          {data.interests.map((interest, i) => (
            <Text key={i} style={styles.text}>{interest}</Text>
          ))}
          <View style={styles.hr} />

     
          <Text style={styles.h1}>REFEREES</Text>
          {data.referees.map((ref, i) => (
            <View key={i} style={styles.container}>
              <Text style={styles.text}>{ref.name}</Text>
              <Text style={styles.text}>{ref.title}</Text>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Mobile:</Text> {ref.mobile}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Email:</Text> {ref.email}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CVDocument;
