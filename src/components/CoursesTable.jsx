import React from 'react'

const CoursesTable = (props) => {
  const { courses, updateCourse, toggleCourseInclusion, removeCourse, gradePoints } = props
  console.log(gradePoints)
  const headerList = ["Course Name", "Credit Hour", "Grade", "Calculate?", "Remove"]
  return (
    <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid #ddd",
      marginBottom: "20px",
      textAlign: "left",
    }}
  >
    <thead>
      <tr>
        {headerList.map((header, index) => {return <th key={index} style={{ border: "1px solid #ddd", padding: "8px", textAlign: (index===3||index===4)&&"center"}}>{header}</th>})}
      </tr>
    </thead>
    <tbody>
      {courses.map((course, index) => (
        <tr key={index}>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            <input
              type="text"
              value={course.courseName}
              onChange={(e) => updateCourse(index, "courseName", e.target.value)}
              style={{ width: "95%", padding: "5px" }}
            />
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            <select
              value={course.creditHour}
              onChange={(e) => updateCourse(index, "creditHour", e.target.value)}
              style={{ width: "100%", padding: "5px" }}
            >
              {["3", "2", "1"].map((credit) => (
                <option key={credit} value={credit}>
                  {credit}
                </option>
              ))}
            </select>
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            <select
              value={course.letterGrade}
              onChange={(e) => updateCourse(index, "letterGrade", e.target.value)}
              style={{ width: "100%", padding: "5px" }}
            >
              {Object.keys(gradePoints).map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
            <input
              type="checkbox"
              checked={course.includedInGPA}
              onChange={() => toggleCourseInclusion(index)}
            />
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
            <button
              onClick={() => removeCourse(index)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default CoursesTable