import "./App.css";

import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import FileDownload from "js-file-download";

import ChipherList from "./assets/Data/ChipherList";

import FormBox from "./Components/FormBox";
import ButtonEnc from "./Components/ButtonEnc";
import ButtonDec from "./Components/ButtonDec";
import InputKeyBox from "./Components/InputKeyBox";
import Card from "./Components/Card";

const baseUrl = "http://localhost:3000";

function App() {
  //States
  const [file, setFile] = useState();
  const [UserChoice, setChoice] = useState("");
  const [key, setKey] = useState("");
  const [keyDec, setKeyDec] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [encrypted, setEncrypted] = useState(false);

  //Functions
  function handleFile(e) {
    setFile(e.target.files[0]);
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

  function handleEncrypt() {
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
        responseType: "arraybuffer",
        Accept: "application/octet-stream",
      },
    };
    const json = JSON.stringify({ key: keyDec });
    let fileName;
    fetch(url, {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        fileName = res.headers.get("filename");
        return res.arrayBuffer();
      })
      .then((blob) => {
        FileDownload(blob, fileName);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // APP
  return (
    <div className="App">
      <div>
        <h1>Encryption</h1>
      </div>
      <FormBox handleForm={handleForm} handleFile={handleFile} />
      <Select
        options={ChipherList}
        className="react-select-container"
        classNamePrefix="react-select"
        onChange={(choice) => {
          setChoice(choice.value);
          // console.log(UserChoice);
        }}
      />
      <ButtonEnc
        handleEncrypt={handleEncrypt}
        setKey={setKey}
        setEncrypted={setEncrypted}
        UserChoice={UserChoice}
      />
      <div>{encrypted && <Card />}</div>

      <div />
      {key}
      <div />
      <InputKeyBox setKeyDec={setKeyDec} />

      <ButtonDec handleDecrypt={handleDecrypt} keyDec={keyDec} />
    </div>
  );
}
export default App;
