import React, { useState } from "react";
import "./App.css";
import { toast } from "react-toastify";

// EditableCell component represents a cell in the table that can be edited
const EditableCell = ({ value, onDoubleClick, onBlur, onInput }) => {
  const [isEditing, setIsEditing] = useState(false);

  // EditableCell component represents a cell in the table that can be edited
  const handleDoubleClick = () => {
    setIsEditing(true);
    onDoubleClick();
  };

  // Handle blur to disable editing
  const handleBlur = () => {
    setIsEditing(false);
    onBlur();

    // Notify user about successful data update
    toast.success(" Data updated successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // Handle input to capture changes while editing
  const handleInput = (e) => {
    onInput(e.currentTarget.textContent);
  };

  return (
    <td
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      onInput={handleInput}
    >
      {value}
    </td>
  );
};
// Table component renders a table with editable cells for student data
const Table = ({ studentList, onEdit, onDelete }) => {
  // Define the order of fields in the table
  const fieldOrder = [
    "fullName",
    "dob",
    "age",
    "email",
    "mobileno",
    "gender",
    "address",
  ];

  // Handle editing of a field for a specific student
  const handleEdit = (index, field, updatedValue) => {
    const updatedStudentList = [...studentList];

    // Ensure the array at the specified index exists
    if (updatedStudentList[index]) {
      // Update the specified field in the employee object
      updatedStudentList[index][field] = updatedValue;

      // Save data to local storage using the updated state
      localStorage.setItem("studentData", JSON.stringify(updatedStudentList));
    } else {
      console.error(`Array at index ${index} is undefined.`);
    }
  };

  return (
    <div className="d-flex">
      <div className="card" id="cardtable">
        <div className="bg-primary p-2" id="tbl">
          {/* Table buttons */}
          <table className="list" id="studentList">
            <thead>
              <tr>
                {fieldOrder.map((field) => (
                  <th key={field}>{field}</th>
                ))}
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-light" id="tbl_body">
              {studentList.map((student, index) => (
                <tr key={index}>
                  {fieldOrder.map((field) => (
                    <EditableCell
                      key={field}
                      value={student[field]}
                      onDoubleClick={() =>
                        handleEdit(index, field, student[field])
                      }
                      onBlur={() => console.log("Blurred")}
                      onInput={(newValue) => handleEdit(index, field, newValue)}
                    />
                  ))}
                  <td>
                    {/* Action buttons */}
                    <button
                      className=" bg-green-500 px-6 py-2 m-2 rounded-2xl		"
                      onClick={() => onEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-800 px-4 py-2 m-2 rounded-2xl"
                      onClick={() => onDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
