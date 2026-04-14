import React from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../features/fileSlice";

const UploadFile = () => {
  const dispatch = useDispatch();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadFile(file));
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
    </div>
  );
};

export default UploadFile;