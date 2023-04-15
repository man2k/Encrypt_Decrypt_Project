import React from "react";

const ButtonEnc = (props) => {
  return (
    <>
      <button
        className="button"
        type="encrypt"
        onClick={() => {
          props.handleEncrypt(props.setKey, props.UserChoice);
          // props.setEncrypted(true);
        }}
      >
        Encrypt
      </button>
    </>
  );
};

export default ButtonEnc;
