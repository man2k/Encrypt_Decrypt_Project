import React from "react";

const ButtonEnc = (props) => {
  return (
    <>
      <button
        class="button"
        type="encrypt"
        onClick={() => {
          props.handleEncrypt(props.setKey, props.UserChoice);
        }}
      >
        Encrypt
      </button>
    </>
  );
};

export default ButtonEnc;
