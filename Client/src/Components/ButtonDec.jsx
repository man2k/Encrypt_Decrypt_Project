import React from "react";

const ButtonDec = (props) => {
  return (
    <>
      <button
        className="button"
        type="decrypt"
        onClick={() => {
          props.handleDecrypt();
        }}
      >
        Decrypt
      </button>
    </>
  );
};

export default ButtonDec;
