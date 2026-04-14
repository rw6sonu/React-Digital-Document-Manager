import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storage } from "../firebase/firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject
} from "firebase/storage";

export const uploadFile = createAsyncThunk(
  "files/uploadFile",
  async (file) => {
    const fileRef = ref(storage, `files/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    return {
      name: file.name,
      url,
      type: file.type,
      size: file.size,
      date: new Date().toISOString()
    };
  }
);

export const fetchFiles = createAsyncThunk(
  "files/fetchFiles",
  async () => {
    const listRef = ref(storage, "files/");
    const res = await listAll(listRef);

    const files = await Promise.all(
      res.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return {
          name: item.name,
          url
        };
      })
    );

    return files;
  }
);

// Delete File
export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async (fileName) => {
    const fileRef = ref(storage, `files/${fileName}`);
    await deleteObject(fileRef);
    return fileName;
  }
);

const fileSlice = createSlice({
  name: "files",
  initialState: {
    files: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files.push(action.payload);
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.files = action.payload;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.files = state.files.filter(
          (file) => file.name !== action.payload
        );
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default fileSlice.reducer;

