import "./App.css";

import { useState } from "react";
// import { Select, Option } from "@material-tailwind/react";
import axios from "axios";
import FileDownload from "js-file-download";

// import ChipherList from "./assets/Data/ChipherList";

import FormBox from "./Components/FormBox";
import ButtonEnc from "./Components/ButtonEnc";
import ButtonDec from "./Components/ButtonDec";
import InputKeyBox from "./Components/InputKeyBox";
import EncodeDecodeKey from "./Components/EncodeDecodeKey";
import Card from "./Components/Card";
import SelectBox from "./Components/SelectBox";
import ImgSteganography from "./Components/ImgSteganography";

const baseUrl = "https://enc-dec-uem-prod.vercel.app";

function App() {
  //States
  const [file, setFile] = useState();
  const [fileDec, setFileDec] = useState();
  const [UserChoice, setChoice] = useState("");
  const [UserDecChoice, setDecChoice] = useState("");
  const [key, setKey] = useState("");
  const [keyDec, setKeyDec] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [encrypted, setEncrypted] = useState(false);

  //Functions
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileDec = (e) => {
    setFileDec(e.target.files[0]);
    // console.log(fileDec);
  };

  const handleForm = async (e, opname) => {
    e.preventDefault();
    // console.log(opname);
    const formData = new FormData();
    try {
      formData.append("file", opname === "enc" ? file : fileDec);
      formData.append("fileName", opname === "enc" ? file.name : fileDec.name);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data; boundary=MyBoundary",
        },
      };
      await axios
        .post(`${baseUrl}/upload/${opname}`, formData, config)
        .then((res) => {
          setUploaded(true);
        });
    } catch (error) {
      console.log(error);
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
        setEncrypted(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrypt = async () => {
    const url = `${baseUrl}/decrypt/${UserDecChoice}`;

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
    <div className="App flex flex-auto flex-col justify-between">
      <div className="flex flex-row justify-around mb-5">
        <div>
          <h1 className="w-full mb-5">Encryption</h1>
          <div className="flex flex-col w-full space-y-5">
            <FormBox
              name="enc"
              handleForm={handleForm}
              handleFile={handleFile}
            />
            <SelectBox setChoice={setChoice} type="Encryption" />
            <div>
              <ButtonEnc
                handleEncrypt={handleEncrypt}
                setKey={setKey}
                UserChoice={UserChoice}
              />
            </div>
            <div className="flex w-full">
              {encrypted && <Card password={key} />}
            </div>
          </div>
        </div>
        <div>
          <h1 className="w-full mb-5">Decryption</h1>
          <div className="flex flex-col w-full space-y-5">
            <FormBox
              name="dec"
              handleForm={handleForm}
              handleFile={handleFileDec}
            />
            <SelectBox setChoice={setDecChoice} type="Decryption" />
            {UserDecChoice && <InputKeyBox setKeyDec={setKeyDec} />}
            <div>
              {keyDec && (
                <ButtonDec
                  handleDecrypt={handleDecrypt}
                  keyDec={keyDec}
                  UserChoice={UserDecChoice}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between mb-10 gap-5">
        <EncodeDecodeKey />
        <ImgSteganography />
      </div>
    </div>
  );
}
export default App;
