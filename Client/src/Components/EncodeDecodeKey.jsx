import React, { useState } from "react";
import ZwspSteg from "zwsp-steg";
import { motion } from "framer-motion";
const EncodeDecodeKey = () => {
  const [input, setInput] = useState("");
  const [decInput, setDecInput] = useState("");
  const [salt, setSalt] = useState("");
  const [encodedText, setEncodedText] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const [encodeDecode, setEncDec] = useState(true);

  const handleInput = (e) => {
    if (encodeDecode) {
      setInput(e.target.value);
    } else {
      setDecInput(e.target.value);
    }
  };

  const handleSalt = (e) => {
    setSalt(e.target.value);
  };
  function handleEncode(e) {
    e.preventDefault();
    let encoded = ZwspSteg.encode(input, ZwspSteg.MODE_FULL);
    let finalStr = salt + encoded;
    setEncodedText(finalStr);
    let copyText = document.getElementById("encodedText");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
  }

  function handleDecode(e) {
    e.preventDefault();

    let decoded = ZwspSteg.decode(decInput, ZwspSteg.MODE_FULL);
    setDecodedText(decoded);
    let copyText = document.getElementById("encodedText");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
  }

  return (
    <motion.div
      className="flex flex-col mt-16 bg-inherit p-5 w-full h-full ml-6"
      animate={{ transform: "rotateY(360deg)" }}
      transition={{ type: "spring", stiffness: 100, mass: 1, duration: 0.1 }}
      key={encodeDecode}
    >
      <div className="flex justify-center">
        <input
          className="appearance-none checked:bg-blue-500 form-checkbox h-5 w-5 text-gray-600 mt-3"
          type="checkbox"
          onChange={() => {
            setEncDec(!encodeDecode);
          }}
        />
      </div>
      {encodeDecode ? (
        <h1 className="text-red-400 mb-5 mt-3 font-mono">Invisible Encoding</h1>
      ) : (
        <h1 className="text-red-500 mb-5 mt-3">Invisible Decoding</h1>
      )}
      <div>
        <div>
          {encodeDecode ? (
            <label
              className="text-red-200 font-mono font-bold"
              htmlFor="input-secret"
            >
              Input Secret Message
            </label>
          ) : (
            <label
              className="text-red-300 font-mono font-bold"
              htmlFor="encoded-input"
            >
              Input your encoded Message
            </label>
          )}
        </div>
        <div>
          <input
            className="text-sky-300 mt-3 mb-3 font-mono"
            type="text"
            id="salt"
            accept="text"
            onChange={handleInput}
          />
        </div>
      </div>
      <div>
        {encodeDecode && (
          <div>
            <label className="text-red-200 font-mono" htmlFor="salt">
              Enter any salt/story you want your secret in
            </label>
          </div>
        )}
        {encodeDecode && (
          <div>
            <input
              className="text-sky-300 mt-3 mb-3 font-mono"
              type="text"
              id="secret-message"
              accept="text"
              onChange={handleSalt}
            />
          </div>
        )}
        {encodeDecode ? (
          <div>
            <button
              className="button hover:bg-slate-900 hover:font-bold font-mono"
              onClick={(e) => {
                if (encodeDecode) {
                  handleEncode(e);
                } else {
                  handleDecode(e);
                }
              }}
            >
              Encode!
            </button>
          </div>
        ) : (
          <div>
            <button
              className="button hover:bg-slate-900 hover:font-bold"
              onClick={handleDecode}
            >
              Decode!
            </button>
          </div>
        )}
        {encodedText && (
          <div>
            <label htmlFor="EncodedText">
              <div className="mb-3">Your Encoded String Below</div>
              <input
                type="text"
                id="encodedText"
                value={encodeDecode ? encodedText : decodedText}
                readOnly="readonly"
                onClick={(e) => {
                  if (e.target.value !== "") {
                    navigator.clipboard.writeText(e.target.value);
                    let tmp = e.target.value;
                    e.target.value = "copied to clipboard..";
                    setTimeout(() => {
                      e.target.value = tmp;
                    }, 900);
                  }
                }}
              />
              <h6 className=" font-light text-xs">click to copy</h6>
            </label>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EncodeDecodeKey;
