import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiles, deleteFile } from "../features/fileSlice";

const FileList = () => {
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.files);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  return (
    <div>
      {files.map((file, index) => (
        <div key={index}>
          <p>{file.name}</p>
          <a href={file.url} target="_blank" rel="noreferrer">View</a>
          <button onClick={() => dispatch(deleteFile(file.name))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default FileList;

