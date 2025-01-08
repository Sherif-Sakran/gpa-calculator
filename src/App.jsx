import React, { useState, useEffect } from "react";
import NewGPA from "./components/NewGPA";
import CoursesTable from "./components/CoursesTable";

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

  const [counter, setCounter] = useState(1);

  // Calculate GPA automatically whenever inputs change
  useEffect(() => {
    calculateGPA();
  }, [creditsEarned, currentGPA, courses]);

  

  const addCourse = () => {
    const finalCourseName = courseName === ""? "Course " + counter : courseName;
    setCounter(counter + 1);
    setCourses([
      ...courses,
      { creditHour: selectedCreditHour, letterGrade: selectedLetterGrade, courseName: finalCourseName, includedInGPA: true },
    ]);
    setCourseName("");
  };

  const removeCourseFromGPA = () => {
    if(totalCreditHours < selectedCreditHour)
      {alert("Number of credits earned cannot be less than number of credits in a course");

      return;
      }
    const finalCourseName = courseName === ""? "Course " + counter : courseName;
    setCounter(counter + 1);
    setCourses([
      ...courses,
      { creditHour: -1*selectedCreditHour, letterGrade: selectedLetterGrade, courseName: finalCourseName+ " (removed from GPA)", includedInGPA: true },
    ]);
    setCourseName("");

  }

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
    setCounter(1);
    setTotalCreditHours(0);
  };

  return (
<div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "800px", margin: "auto" }}>
  <h1 style={{ fontSize: "28px", textAlign: "center", color: "#333", marginBottom: "20px" }}>
    GPA Calculator
  </h1>

  {/* Input Section */}
  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "20px",
      backgroundColor: "#f9f9f9",
    }}
  >
    <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Enter Your Details</h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
      <div>
        <label><strong>Credits Earned:</strong></label>
        <input
          type="number"
          value={creditsEarned}
          onChange={(e) => setCreditsEarned(e.target.value)}
          placeholder="e.g., 90"
          style={{ width: "95%", padding: "8px", marginTop: "5px" }}
        />
      </div>
      <div>
        <label><strong>Current GPA:</strong></label>
        <input
          type="number"
          step="0.01"
          value={currentGPA}
          onChange={(e) => setCurrentGPA(e.target.value)}
          placeholder="e.g., 3.5"
          style={{ width: "95%", padding: "8px", marginTop: "5px" }}
        />
      </div>
      <div>
        <label><strong>Credit Hour:</strong></label>
        <select
          value={selectedCreditHour}
          onChange={(e) => setSelectedCreditHour(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        >
          {["3", "2", "1"].map((credit) => (
            <option key={credit} value={credit}>
              {credit}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label><strong>Grade:</strong></label>
        <select
          value={selectedLetterGrade}
          onChange={(e) => setSelectedLetterGrade(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        >
          {Object.keys(gradePoints).map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
      <button
        onClick={addCourse}
        style={{
          backgroundColor: "#28a745",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Course
      </button>
      <button
        onClick={removeCourseFromGPA}
        style={{
          backgroundColor: "#ffc107",
          color: "black",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Remove from GPA
      </button>
      <button
        onClick={reset}
        style={{
          backgroundColor: "#dc3545",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Reset
      </button>
    </div>
  </div>

  {/* Course List Section */}
  <div>
    <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Courses</h2>
  </div>
  <CoursesTable courses={courses} updateCourse={updateCourse} removeCourse={removeCourse} toggleCourseInclusion={toggleCourseInclusion} gradePoints={gradePoints} />

  {/* Summary Section */}
  <NewGPA newGPA={newGPA} totalCreditHours={totalCreditHours}/>
</div>


  );
}

export default App;
