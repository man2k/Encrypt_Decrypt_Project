import React, { useState } from "react";
import axios from "axios";
import FileDownload from "js-file-download";
import { motion } from "framer-motion";

const baseUrl = "https://enc-dec-uem-prod.vercel.app";

function ImgSteganography() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState("");
  const [pass, setPass] = useState("");
  const [file2, setFile2] = useState(null);
  const [stegUnsteg, setSteg] = useState(true);
  const [wrong, setWrong] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleFile2Change = (e) => {
    setFile2(e.target.files[0]);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handleDecode = (decoded) => {
    setDecoded(decoded);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (stegUnsteg) {
      try {
        formData.append("file", file2);
        formData.append("fileName", file2.name);
        formData.append("secret", input);
        formData.append("password", pass);
        fetch(`${baseUrl}/upload/steg`, {
          method: "POST",
          body: formData,
        })
          .then((res) => {
            fetch(`${baseUrl}/execsteg`, {
              method: "GET",
            })
              .then((resp) => {
                return resp.arrayBuffer();
              })
              .then((blob) => {
                FileDownload(blob, "steganographed.png");
              });
            return res.arrayBuffer();
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data; boundary=MyBoundary",
        },
      };
      formData.append("file", file2);
      formData.append("filename", "steganographed.png");
      formData.append("password", pass);
      await axios
        .post(`${baseUrl}/unsteg`, formData, config)
        .then((res) => {
          // console.log(res.data);
          handleDecode(res.data.secret);
        })
        .catch((e) => {
          handleDecode(e.response.data.error + "...");
          setWrong(true);
          // console.log(e.response.status);
        });
    }
  };

  return (
    <motion.div
      className="flex flex-col mt-16 bg-inherit opacity-90 shadow-sm p-5 w-full h-full items-center justify-around"
      animate={{ transform: "rotateY(-360deg)" }}
      transition={{ type: "spring", stiffness: 100, mass: 1, duration: 0.1 }}
      key={stegUnsteg}
    >
      <div>
        <input
          className="appearance-none checked:bg-blue-500 form-checkbox h-5 w-5 text-gray-600 mt-5"
          type="checkbox"
          onChange={() => {
            setSteg(!stegUnsteg);
            // console.log(stegUnsteg);
          }}
        />
      </div>
      {stegUnsteg ? (
        <h1 className="text-blue-400 mb-5 font-mono">Steganography</h1>
      ) : (
        <h1 className="text-blue-500 mb-5 font-mono">Desteganography</h1>
      )}
      <form
        className="flex w-2/3 flex-col items-center justify-between"
        onSubmit={handleSubmit}
      >
        {stegUnsteg && (
          <div>
            <input
              className="block w-72 text-sm text-sky-200 font-mono"
              type="text"
              placeholder="Enter your secret message"
              name="file"
              onChange={handleInput}
            />
          </div>
        )}
        <br />
        <div className="mb-5">
          <input
            className="block w-72 text-sm text-sky-200 font-mono"
            type="password"
            placeholder="Enter your Password"
            name="password"
            onChange={handlePass}
          />
        </div>
        <input
          className="block w-auto font-mono text-sm text-sky-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-2 file:border-dashed hover:file:border-dotted file:text-sm file:font-semibold file:bg-green-50 file:text-black file:border-black hover:file:bg-green-100"
          name="image"
          type="file"
          onChange={handleFile2Change}
          accept="image/*"
        />
        <h6 className="text-xs mb-2">(The file must be an image)</h6>
        <button
          className="bg-[#444] font-mono text-white cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-[0.2s] ease-[ease-in-out] m-28 mt-3 px-5 py-2.5 rounded-[5px] border-[none] hover:bg-gray-900 hover:shadow-[0_4px_6px_rgba(0,0,0,0.4) mb-5"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="flex w-72 items-center justify-center mt-2">
        {decoded.length !== 0 && !stegUnsteg ? (
          <input
            type="text"
            id="Desteganographed_Text"
            value={decoded}
            readOnly="readonly"
            onClick={(e) => {
              document
                .getElementById("Desteganographed_Text")
                .setAttribute("valid", !wrong);
              console.log(
                document
                  .getElementById("Desteganographed_Text")
                  .getAttribute("valid")
              );
              if (e.target.value !== "" && !wrong) {
                navigator.clipboard.writeText(e.target.value);
                let tmp = e.target.value;
                e.target.value = "copied to clipboard..";
                setTimeout(() => {
                  e.target.value = tmp;
                }, 900);
              }
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </motion.div>
  );
}

export default ImgSteganography;
