import React from "react";

const ButtonDec = (props) => {
  return (
    <>
      <button
        className="button"
        type="decrypt"
        onClick={(e) => {
          props.handleDecrypt(e);
        }}
      >
        Decrypt
      </button>
    </>
  );
};

export default ButtonDec;
