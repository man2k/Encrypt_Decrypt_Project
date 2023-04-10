import "./App.css";

import { useState } from "react";
import Select from "react-select";

import ChipherList from "./assets/Data/ChipherList";
import FormBox from "./Components/FormBox";
import ButtonEnc from "./Components/ButtonEnc";

import axios from "axios";
import FileDownload from "js-file-download";
import ButtonDec from "./Components/ButtonDec";
import InputKeyBox from "./Components/InputKeyBox";
const baseUrl = "http://localhost:3000";

function App() {
  //States
  const [file, setFile] = useState();
  const [UserChoice, setChoice] = useState("");
  const [key, setKey] = useState("");
  const [keyDec, setKeyDec] = useState("");
  const [uploaded, setUploaded] = useState(false);

  //Functions
  function handleFile(e) {
    setFile(e.target.files[0]);
    console.log(file);
  }

  function handleForm(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data; boundary=MyBoundary",
      },
    };
    axios.post(`${baseUrl}/upload`, formData, config).then((res) => {
      setUploaded(true);
    });
  }

  function handleEncrypt(setKey, UserChoice) {
    const url = `${baseUrl}/encrypt/${UserChoice}`;
    axios.get(url).then((res) => {
      setKey(res.data.key);
    });
  }

  function handleDecrypt() {
    const url = `${baseUrl}/decrypt/${UserChoice}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const json = JSON.stringify({ key: keyDec });

    axios.post(url, json, config).then((res) => {
      const fileName = res.request
        .getResponseHeader("Content-Disposition")
        .match(/filename="(.*)"/)[1];
      FileDownload(res.data, fileName);
    });
  }

  // APP
  return (
    <div className="App">
      <FormBox handleForm={handleForm} handleFile={handleFile} />
      <Select
        options={ChipherList}
        className="react-select-container"
        classNamePrefix="react-select"
        onChange={(choice) => {
          setChoice(choice.value);
          console.log(UserChoice);
        }}
      />
      <ButtonEnc
        handleEncrypt={handleEncrypt}
        setKey={setKey}
        UserChoice={UserChoice}
      />
      <div />
      {key}
      <div />
      <InputKeyBox setKeyDec={setKeyDec} />

      <ButtonDec handleDecrypt={handleDecrypt} keyDec={keyDec} />
    </div>
  );
}
export default App;
