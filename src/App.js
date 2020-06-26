import React, { useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import config from "./config";

function App() {
  const uploadRequest = useCallback(({ file }) => {
    const data = new FormData();
    console.log(file);
    data.append("file", file);
    data.append("name", file.name);
    axios(
      {
        url: `${config.API_URL}/upload`,
        method: "POST",
      },
      data
    )
      .then(console.log)
      .catch(console.log);
    // axios.get(`${config.API_URL}/upload`).then(console.log).catch(console.log);
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
