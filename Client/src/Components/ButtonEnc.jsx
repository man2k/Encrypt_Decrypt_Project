import React from "react";

const ButtonEnc = (props) => {
  return (
    <>
      <button
        disabled={props.encrypted || !props.uploaded}
        className="button disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent font-mono disabled:text-slate-300 disabled:hover:text-green-600"
        type="encrypt"
        onClick={() => {
          props.handleEncrypt(props.setKey, props.UserChoice);
          // props.setUploaded(false);
        }}
      >
        {props.encrypted
          ? "Encryption Successful"
          : props.uploaded
          ? "Encrypt"
          : ""}
      </button>
    </>
  );
};

export default ButtonEnc;
