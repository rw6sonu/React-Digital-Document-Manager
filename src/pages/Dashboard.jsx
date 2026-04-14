import React, { useEffect, useState } from "react";
import FileCard from "../components/FileCard";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);

  const loadData = () => {
    const data = JSON.parse(localStorage.getItem("documents")) || [];
    setDocuments(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ DELETE
  const handleDelete = (index) => {
    const updated = [...documents];
    updated.splice(index, 1);

    localStorage.setItem("documents", JSON.stringify(updated));
    setDocuments(updated);
  };

  // ✅ UPDATE
  const handleUpdate = (index, updatedData) => {
    const updated = [...documents];
    updated[index] = updatedData;

    localStorage.setItem("documents", JSON.stringify(updated));
    setDocuments(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📁 Dashboard</h2>

      {documents.length === 0 ? (
        <p>No data found</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}>
          {documents.map((doc, index) => (
            <FileCard
              key={index}
              file={doc}
              onDelete={() => handleDelete(index)}
              onUpdate={(data) => handleUpdate(index, data)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;