import React, { useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const uploadRequest = useCallback(({ file }) => {
    const data = new FormData();
    data.append("file", document);
    data.append("name", file.name);
    axios.post("/upload-document", data);
  });
  const handleUploadFile = useCallback((e) => {
    const target = e.target;
    const files = target.files;
    const file = files[0];
    uploadRequest({ file });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Upload File:</p>
        <input type="file" onChange={handleUploadFile}></input>
      </header>
    </div>
  );
}

export default App;
