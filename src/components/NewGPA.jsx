import React from 'react'

const NewGPA = ({newGPA, totalCreditHours}) => {
  return (
    <div
    style={{
    //   position: "absolute",
    //   top: "80px",
    //   left: "560px",
    //   padding: "10px",
    //   backgroundColor: "#f4f4f4",
      borderRadius: "5px",
    //   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      fontSize: "16px",
      maxWidth: "400px",
    }}
  >
<div style={{ marginTop: "20px", fontSize: "18px" }}>
  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
    <tbody>
      <tr>
        <td style={{ padding: "10px", border: "1px solid #ccc" }}><strong>New GPA:</strong></td>
        <td style={{ padding: "10px", border: "1px solid #ccc" }}>{newGPA.toFixed(4)}</td>
      </tr>
      <tr>
        <td style={{ padding: "10px", border: "1px solid #ccc" }}><strong>Total Credit Hours:</strong></td>
        <td style={{ padding: "10px", border: "1px solid #ccc" }}>{totalCreditHours || "0"}</td>
      </tr>
      <tr>
        <td style={{ padding: "10px", border: "1px solid #ccc" }}><strong>Total Credit Points:</strong></td>
        <td style={{ padding: "10px", border: "1px solid #ccc" }}>
          {newGPA * totalCreditHours || "0"}
        </td>
      </tr>
    </tbody>
  </table>
</div>

  </div>
  )
}

export default NewGPA