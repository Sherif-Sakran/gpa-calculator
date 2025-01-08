import React from 'react'

const NewGPA = ({newGPA, totalCreditHours}) => {
  return (
<div
    style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
    }}
  >
    <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Summary</h2>
    <table style={{ width: "100%", textAlign: "left" }}>
      <tbody>
        <tr>
          <td><strong>New GPA:</strong></td>
          <td>{newGPA.toFixed(4)}</td>
        </tr>
        <tr>
          <td><strong>Total Credit Hours:</strong></td>
          <td>{totalCreditHours || "0"}</td>
        </tr>
        <tr>
          <td><strong>Total Credit Points:</strong></td>
          <td>{newGPA * totalCreditHours || "0"}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default NewGPA