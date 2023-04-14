import "./App.css";

import { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import axios from "axios";
import FileDownload from "js-file-download";

import ChipherList from "./assets/Data/ChipherList";

import FormBox from "./Components/FormBox";
import ButtonEnc from "./Components/ButtonEnc";
import ButtonDec from "./Components/ButtonDec";
import InputKeyBox from "./Components/InputKeyBox";
import EncodeKey from "./Components/EncodeKey";
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
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      formData.append("file", file);
      formData.append("fileName", file.name);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data; boundary=MyBoundary",
        },
      };
      await axios.post(`${baseUrl}/upload`, formData, config).then((res) => {
        setUploaded(true);
      });
    } catch (error) {
      // console.log(error);
    }
  };

  const handleEncrypt = async () => {
    const url = `${baseUrl}/encrypt/${UserChoice}`;
    try {
      await axios.get(url, { responseType: "blob" }).then((res) => {
        FileDownload(
          res.data,
          res.headers["content-disposition"].match(/filename="(.+)"/i)[1]
        );
        setKey(res.headers["x-key"]);
      });
    } catch (error) {
      // console.log(error);
    }
  };

  const handleDecrypt = async () => {
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
        if (!fileName) {
          return;
        }
        return res.arrayBuffer();
      })
      .then((blob) => {
        if (fileName) {
          FileDownload(blob, fileName);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // APP
  return (
    <div className="App flex flex-col justify-between">
      <div className="flex flex-nowrap flex-row justify-between mb-5">
        <h1 className="w-2/4">Encryption</h1>
        <h1 className="w-2/4">Decryption</h1>
      </div>
      <div className="flex flex-nowrap flex-row justify-between ">
        <div className="flex flex-col w-full space-y-5">
          <FormBox handleForm={handleForm} handleFile={handleFile} />
          <div className="ml-16 w-3/4 text-white">
            <Select
              className="h-11"
              label="SelectEncryptionType"
              onChange={(choice) => {
                setChoice(choice);
              }}
            >
              {ChipherList.map((e) => {
                return (
                  <Option
                    className="block appearance-none bg-gray-200 border border-transparent hover:bg-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    value={e.value}
                  >
                    {e.label}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className="mr-20">
            <ButtonEnc
              handleEncrypt={handleEncrypt}
              setKey={setKey}
              setEncrypted={setEncrypted}
              UserChoice={UserChoice}
            />
          </div>
          <div className="flex w-3/4 ml-11">
            {encrypted && <Card password={key} />}
          </div>
        </div>
        <div className="flex flex-col w-full space-y-5">
          <FormBox handleForm={handleForm} handleFile={handleFile} />
          <InputKeyBox setKeyDec={setKeyDec} />
          <div className="mr-20 ml-16">
            <ButtonDec handleDecrypt={handleDecrypt} keyDec={keyDec} />
          </div>
        </div>
      </div>

      <div>
        <div>
          <EncodeKey />
        </div>
      </div>
    </div>
  );
}
export default App;
