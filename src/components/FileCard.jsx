import React, { useState } from "react";

const FileCard = ({ file, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(file);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "15px",
      background: "#fff"
    }}>
      
      {isEditing ? (
        <>
          <input
            name="name"
            value={editData.name}
            onChange={handleChange}
          />
          <input
            name="title"
            value={editData.title}
            onChange={handleChange}
          />
          <input
            name="category"
            value={editData.category}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
          />

          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h3>{file.title}</h3>
          <p><strong>Name:</strong> {file.name}</p>
          <p><strong>Category:</strong> {file.category}</p>
          <p><strong>Description:</strong> {file.description}</p>
          <p><strong>File:</strong> {file.fileName}</p>

          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={onDelete} style={{ marginLeft: "10px", color: "red" }}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default FileCard;