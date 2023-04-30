import React from "react";

const ButtonDec = (props) => {
  return (
    <>
      <button
        disabled={!props.uploaded || props.decrypted}
        className="button disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent font-mono disabled:text-slate-300 disabled:hover:text-green-600"
        type="decrypt"
        onClick={(e) => {
          props.handleDecrypt(e);
        }}
      >
        {props.decrypted
          ? props.validPass
            ? "Decryption Successful"
            : "Invalid Password"
          : "Decrypt"}
      </button>
    </>
  );
};

export default ButtonDec;
