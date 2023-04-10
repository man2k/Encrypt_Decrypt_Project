import "./App.css";

import { useState } from "react";
import Select from "react-select";

import ChipherList from "./assets/Data/ChipherList";
import FormBox from "./Components/FormBox";
import ButtonEnc from "./Components/ButtonEnc";

import axios from "axios";
import ButtonDec from "./Components/ButtonDec";
// console.log(obj)
// let key;
const baseUrl = "http://localhost:3000";

function App() {
  //States
  const [file, setFile] = useState();
  const [UserChoice, setChoice] = useState("");
  const [key, setKey] = useState("");
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
      console.log(file);
    });
  }

  function handleEncrypt(setKey, UserChoice) {
    const url = `${baseUrl}/encrypt/${UserChoice}`;
    console.log(url);
    axios.get(url).then((res) => {
      setKey(res.data.key);
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
      <br />
      {key}
      <br />
      {/* <form class="form-container" action="http://localhost:3000/decrypt" method="GET"> */}
      <ButtonDec />
      {/* </form> */}
    </div>
  );
}
export default App;
