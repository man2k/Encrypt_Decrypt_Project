import React, { useState } from "react";
// import { encode } from "../utils/steg";
import ZwspSteg from "zwsp-steg";

const Steganography = () => {
  const [input, setInput] = useState("");
  const [salt, setSalt] = useState("");
  const [encodedText, setEncodedText] = useState("");
  const handleInput = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };

  const handleSalt = (e) => {
    // console.log(e.target.value);
    setSalt(e.target.value);
  };
  function handleEncode() {
    let encoded = ZwspSteg.encode(input, ZwspSteg.MODE_FULL);
    // console.log("Encoded msg", encoded);
    // console.log(typeof encoded, encoded.length);
    let finalStr = salt + encoded;
    console.log("Final", finalStr);
    setEncodedText(finalStr);
    // Get the text field
    let copyText = document.getElementById("encodedText");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text
    alert("Copied the text: " + copyText.value);
    // let decoded = ZwspSteg.decode(finalStr, ZwspSteg.MODE_FULL);
    // console.log(decoded);
    // let finalInput = "";
    // if (salt != "") {
    //   //   const longestL =
    //   //     encoded.length < salt.length ? salt.length : encoded.length;
    //   for (let i = 0; i < encoded.length; i++) {
    //     let salty = salt.charAt(i);
    //     let inputy = encoded.charAt(i);
    //     finalInput += (salty ? "" : salty) + (inputy ? "" : inputy);
    //   }
    // }
  }

  return (
    <div>
      <h1>Invisible Encoding</h1>
      <div>
        <div>
          <label htmlFor="input-secret">Input Secret Message</label>
        </div>
        <div>
          <input
            type="text"
            id="secret-message"
            accept="text"
            onChange={handleInput}
          />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="salt">
            Enter any salt/story you want your secret in
          </label>
        </div>
        <div>
          <input
            type="text"
            id="secret-message"
            accept="text"
            onChange={handleSalt}
          />
        </div>
        <div>
          <button onClick={handleEncode}>Encode!</button>
        </div>
        <div>
          <label htmlFor="EncodedText">
            <div>Your Encoded String Below</div>
            <input
              type="text"
              id="encodedText"
              value={encodedText}
              readOnly="readonly"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Steganography;
