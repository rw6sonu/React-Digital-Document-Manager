import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../features/fileSlice";

import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Paper
} from "@mui/material";


const UploadForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    category: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.file) {
      alert("Please upload a file");
      return;
    }

    dispatch(uploadFile(formData.file));

  const newData = {
    name: formData.name,
    title: formData.title,
    category: formData.category,
    description: formData.description,
    fileName: formData.file.name,
    date: new Date().toLocaleString(),
  };

  let existingData = localStorage.getItem("documents");

  existingData = existingData ? JSON.parse(existingData) : [];
  existingData.push(newData);


  localStorage.setItem("documents", JSON.stringify(existingData));
  window.dispatchEvent(new Event("storage"));
 
    setFormData({
      name: "",
      title: "",
      category: "",
      description: "",
      file: null,
    });
  };

 return (
<Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={4} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h6" align="center">
          Upload Document
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Document Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Academic">Academic</MenuItem>
            <MenuItem value="Office">Office</MenuItem>
            <MenuItem value="Certificates">Certificates</MenuItem>
          </TextField>

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />

          {/* File Upload */}
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              hidden
              name="file"
              onChange={handleChange}
            />
          </Button>

          {/* Submit */}
          <Button type="submit" variant="contained" color="primary">
            Submit & Upload
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UploadForm;