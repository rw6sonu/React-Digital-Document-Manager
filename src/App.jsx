import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Dashboard from "./pages/Dashboard";
import UploadForm from "./components/UploadForm";

function App() {
  return (
    <Provider store={store}>
      <UploadForm/>
      <Dashboard />
    </Provider>
  );
}

export default App;