import React, { useState, useEffect } from 'react';
import './CGPACalculator.css'; // Make sure this path is correct

// Grade point mapping for Anna University
const gradePointsMap = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'RA': 0,
  'SA': 0,
  'W': 0
};

const CGPACalculator = () => {
  // Initialize with one default subject
  const [subjects, setSubjects] = useState([{ grade: 'A+', credits: 4, id: Date.now() }]);
  const [cgpa, setCgpa] = useState(0);

  // Calculate CGPA whenever subjects change
  useEffect(() => {
    calculateCGPA(subjects);
  }, [subjects]); // Dependency array: recalculate when 'subjects' state changes

  const handleAddSubject = () => {
    // Add a unique ID for better React list rendering and animation
    setSubjects([...subjects, { grade: 'A+', credits: 4, id: Date.now() }]);
  };

  const handleInputChange = (id, event) => {
    const { name, value } = event.target;
    const newSubjects = subjects.map(subject => 
      subject.id === id ? { ...subject, [name]: value } : subject
    );
    setSubjects(newSubjects);
  };

  const handleDeleteSubject = (id) => {
    const newSubjects = subjects.filter(subject => subject.id !== id);
    setSubjects(newSubjects);
  };

  const handleClearAll = () => {
    setSubjects([]); // Clear all subjects
    setCgpa(0); // Reset CGPA
  };

  const calculateCGPA = (currentSubjects) => {
    let totalWeightedPoints = 0;
    let totalCredits = 0;

    currentSubjects.forEach(subject => {
      const gradePoint = gradePointsMap[subject.grade];
      const credits = parseInt(subject.credits);

      if (!isNaN(credits) && gradePoint !== undefined) {
        totalWeightedPoints += gradePoint * credits;
        totalCredits += credits;
      }
    });

    if (totalCredits === 0) {
      setCgpa(0);
    } else {
      const calculatedCGPA = (totalWeightedPoints / totalCredits).toFixed(2);
      setCgpa(calculatedCGPA);
    }
  };

  return (
    <div className="calculator-container">
      <h1>Anna University CGPA Calculator</h1>
      <p>Enter your subject grades and credits to instantly calculate your CGPA.
        This calculator uses the standard Anna University (e.g., R2017, R2021) grading system.</p>
      
      <div className="subjects-list">
        {subjects.map((subject, index) => (
          <div key={subject.id} className="subject-row">
            <div className="subject-field">
              <label htmlFor={`grade-${subject.id}`}>Grade:</label>
              <div className="tooltip-container">
    <label htmlFor={`grade-${subject.id}`}>Grade:</label>
    <select
        id={`grade-${subject.id}`}
        name="grade"
        value={subject.grade}
        onChange={e => handleInputChange(subject.id, e)}
    >
        {Object.keys(gradePointsMap).map(grade => (
            <option key={grade} value={grade}>{grade}</option>
        ))}
    </select>
    <span className="tooltip-text">O: 10, A+: 9, A: 8, B+: 7, B: 6, C: 5</span>
</div>
            </div>
            
            <div className="subject-field">
              <label htmlFor={`credits-${subject.id}`}>Credits:</label>
              <input
                id={`credits-${subject.id}`}
                type="number"
                name="credits"
                min="0"
                max="5" /* Common credit max for university subjects */
                value={subject.credits}
                onChange={e => handleInputChange(subject.id, e)}
              />
            </div>
            
            <button 
  className="delete-btn" 
  onClick={() => handleDeleteSubject(subject.id)}
  aria-label={`Delete subject with grade ${subject.grade} and credits ${subject.credits}`}
>
  Delete
</button>
          </div>
        ))}
      </div>
      
      <div className="button-group">
        <button className="add-btn" onClick={handleAddSubject}>Add Subject</button>
        <button className="clear-btn" onClick={handleClearAll}>Clear All</button>
      </div>
      
      <div className="result-box">
        <h2>Your Calculated CGPA:</h2>
        <p className="cgpa-value">{cgpa}</p>
        <p className="percentage-value">
          Equivalent Percentage: {cgpa ? (parseFloat(cgpa) * 9.5).toFixed(2) : '0.00'}%
        </p>
      </div>

      <p className="footer-note">
        *Disclaimer: This calculator is for estimation purposes. Please refer to official university results for final grades.
      </p>
    </div>
  );
};

export default CGPACalculator;