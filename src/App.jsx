import React, { useState, useEffect } from "react";
import NewGPA from "./components/NewGPA";

const gradePoints = {
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "F": 0.0,
};

function App() {
  const [creditsEarned, setCreditsEarned] = useState("0");
  const [currentGPA, setCurrentGPA] = useState("0");
  const [courses, setCourses] = useState([]); // No default course
  const [newGPA, setNewGPA] = useState(0);
  const [totalCreditHours, setTotalCreditHours] = useState(0);

  // For new course selection
  const [selectedCreditHour, setSelectedCreditHour] = useState("3");
  const [selectedLetterGrade, setSelectedLetterGrade] = useState("A");
  const [courseName, setCourseName] = useState("");

  // Calculate GPA automatically whenever inputs change
  useEffect(() => {
    calculateGPA();
  }, [creditsEarned, currentGPA, courses]);

  const addCourse = () => {
    setCourses([
      ...courses,
      { creditHour: selectedCreditHour, letterGrade: selectedLetterGrade, courseName: courseName, includedInGPA: true },
    ]);
  };

  const removeCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  };

  const updateCourse = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const toggleCourseInclusion = (index) => {
    const updatedCourses = [...courses];
    updatedCourses[index].includedInGPA = !updatedCourses[index].includedInGPA;
    setCourses(updatedCourses);
  };

  const calculateGPA = () => {
    const earnedCredits = parseFloat(creditsEarned);
    const gpa = parseFloat(currentGPA);

    if (isNaN(earnedCredits) || isNaN(gpa)) {
      setNewGPA(0);
      setTotalCreditHours(0);
      return;
    }

    let totalPoints = gpa * earnedCredits;
    let totalCredits = earnedCredits;

    courses.forEach((course) => {
      if (course.includedInGPA) { // Only include courses marked as included
        const creditHour = parseFloat(course.creditHour);
        const gradePoint = gradePoints[course.letterGrade];
        totalPoints += creditHour * gradePoint;
        totalCredits += creditHour;
      }
    });

    totalCredits? setNewGPA((totalPoints / totalCredits)) : setNewGPA(0);
    setTotalCreditHours(totalCredits);
  };

  const reset = () => {
    setCreditsEarned("0");
    setCurrentGPA("0");
    setCourses([]);
    setNewGPA(0);
    setTotalCreditHours(0);
  };

  return (
<div style={{ fontFamily: "Arial, sans-serif", padding: "10px" }}>
  <h1 style={{ fontSize: "24px" }}>GPA Calculator</h1>

  {/* Credits Earned and Current GPA Inputs */}
  <div style={{ marginBottom: "15px" }}>
    <label>
      <strong>Credits Earned:</strong>
    </label>
    <input
      type="number"
      value={creditsEarned}
      onChange={(e) => setCreditsEarned(e.target.value)}
      placeholder="Enter total credits earned"
      style={{ marginLeft: "5px", padding: "3px", fontSize: "14px", width: "150px" }}
    />
  </div>

  <div style={{ marginBottom: "15px" }}>
    <label>
      <strong>Current GPA:</strong>
    </label>
    <input
      type="number"
      step="0.01"
      value={currentGPA}
      onChange={(e) => setCurrentGPA(e.target.value)}
      placeholder="Enter current GPA"
      style={{ marginLeft: "5px", padding: "3px", fontSize: "14px", width: "150px" }}
    />
  </div>

  {/* New Course Selection */}
  <div style={{ marginBottom: "15px" }}>
    <label>
      <strong>Credit Hour:</strong>
    </label>
    <select
      value={selectedCreditHour}
      onChange={(e) => setSelectedCreditHour(e.target.value)}
      style={{ marginLeft: "5px", padding: "3px", fontSize: "14px", width: "60px" }}
    >
      {["3", "2", "1"].map((credit) => (
        <option key={credit} value={credit}>
          {credit}
        </option>
      ))}
    </select>
  </div>

  <div style={{ marginBottom: "15px" }}>
    <label>
      <strong>Grade:</strong>
    </label>
    <select
      value={selectedLetterGrade}
      onChange={(e) => setSelectedLetterGrade(e.target.value)}
      style={{ marginLeft: "5px", padding: "3px", fontSize: "14px", width: "100px" }}
    >
      {Object.keys(gradePoints).map((grade) => (
        <option key={grade} value={grade}>
          {grade}
        </option>
      ))}
    </select>
  </div>

  <div style={{ marginBottom: "15px" }}>
    <label>
      <strong>Course:</strong>
    </label>
    <input
      type="text"
      value={courseName}
      onChange={(e) => setCourseName(e.target.value)}
      style={{ marginLeft: "5px", padding: "3px", fontSize: "14px", width: "100px" }}
    >
    </input>
  </div>

  <button
    onClick={addCourse}
    style={{
      backgroundColor: "#008CBA",
      color: "white",
      padding: "6px 12px",
      marginBottom: "15px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    }}
  >
    Add Course
  </button>

  <h2 style={{ fontSize: "20px", marginTop: "10px" }}>Courses</h2>

  <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "15px", fontSize: "14px" }}>
    <thead>
      <tr>
        <th style={{ border: "1px solid #ccc", padding: "5px", textAlign: "center" }}>Course Name</th>
        <th style={{ border: "1px solid #ccc", padding: "5px", textAlign: "center" }}>Credit Hour</th>
        <th style={{ border: "1px solid #ccc", padding: "5px", textAlign: "center" }}>Grade</th>
        <th style={{ border: "1px solid #ccc", padding: "5px", textAlign: "center" }}>Include?</th>
        <th style={{ border: "1px solid #ccc", padding: "5px", textAlign: "center" }}>Remove</th>
      </tr>
    </thead>
    <tbody>
      {courses.map((course, index) => (
        <tr key={index}>
          <td style={{ border: "1px solid #ccc", padding: "5px", textAlign: "center" }}>
            <input
              type="text"
              value={course.courseName}
              onChange={(e) => updateCourse(index, "courseName", e.target.value)}
              style={{ padding: "3px", fontSize: "12px" }}
            >
            </input>
          </td>
          <td style={{ border: "1px solid #ccc", padding: "5px", textAlign: "center" }}>
            <select
              value={course.creditHour}
              onChange={(e) => updateCourse(index, "creditHour", e.target.value)}
              style={{ padding: "3px", fontSize: "12px" }}
            >
              {["3", "2", "1"].map((credit) => (
                <option key={credit} value={credit}>
                  {credit}
                </option>
              ))}
            </select>
          </td>
          <td style={{ border: "1px solid #ccc", padding: "5px", textAlign: "center" }}>
            <select
              value={course.letterGrade}
              onChange={(e) => updateCourse(index, "letterGrade", e.target.value)}
              style={{ padding: "3px", fontSize: "12px" }}
            >
              {Object.keys(gradePoints).map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </td>
          <td style={{ border: "1px solid #ccc", padding: "5px", textAlign: "center" }}>
            <input
              type="checkbox"
              checked={course.includedInGPA}
              onChange={() => toggleCourseInclusion(index)}
              style={{ width: "15px", height: "15px" }}
            />
          </td>
          <td style={{ border: "1px solid #ccc", padding: "5px", textAlign: "center" }}>
            <button
              onClick={() => removeCourse(index)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              X
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <button
    onClick={reset}
    style={{
      backgroundColor: "#d9534f",
      color: "white",
      padding: "6px 12px",
      marginBottom: "15px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      marginLeft: "10px",
    }}
  >
    Reset
  </button>

  <NewGPA newGPA={newGPA} totalCreditHours={totalCreditHours} />
</div>

  );
}

export default App;
