import React, { useState } from "react";
import ZwspSteg from "zwsp-steg";

const EncodeKey = () => {
  const [input, setInput] = useState("");
  const [salt, setSalt] = useState("");
  const [encodedText, setEncodedText] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSalt = (e) => {
    setSalt(e.target.value);
  };
  function handleEncode() {
    let encoded = ZwspSteg.encode(input, ZwspSteg.MODE_FULL);
    let finalStr = salt + encoded;
    console.log("Final", finalStr);
    setEncodedText(finalStr);
    let copyText = document.getElementById("encodedText");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
    // alert("Copied the text: " + copyText.value);
    /*let decoded = ZwspSteg.decode(finalStr, ZwspSteg.MODE_FULL);
    console.log(decoded);
    let finalInput = "";
    if (salt != "") {
      const longestL =
        encoded.length < salt.length ? salt.length : encoded.length;
      for (let i = 0; i < encoded.length; i++) {
        let salty = salt.charAt(i);
        let inputy = encoded.charAt(i);
        finalInput += (salty ? "" : salty) + (inputy ? "" : inputy);
      }
    }*/
  }

  return (
    <div className="flex flex-col mt-16">
      <h1 className="text-slate-800 mb-5">Invisible Encoding</h1>
      <div>
        <div>
          <label className="text-slate-900" htmlFor="input-secret">
            Input Secret Message
          </label>
        </div>
        <div>
          <input
            className="text-slate-500 mt-3 mb-3"
            type="text"
            id="secret-message"
            accept="text"
            onChange={handleInput}
          />
        </div>
      </div>
      <div>
        <div>
          <label className="text-slate-900" htmlFor="salt">
            Enter any salt/story you want your secret in
          </label>
        </div>
        <div>
          <input
            className="text-slate-900 mt-3 mb-3"
            type="text"
            id="secret-message"
            accept="text"
            onChange={handleSalt}
          />
        </div>
        <div>
          <button
            className="button hover:bg-slate-900 hover:font-bold"
            onClick={handleEncode}
          >
            Encode!
          </button>
        </div>
        <div>
          <label htmlFor="EncodedText">
            <div className="mb-3">Your Encoded String Below</div>
            <input
              type="text"
              id="encodedText"
              value={encodedText}
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
      </div>
    </div>
  );
};

export default EncodeKey;
