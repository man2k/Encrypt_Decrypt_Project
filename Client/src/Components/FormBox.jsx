import React from "react";
// import { useState } from "react";

const FormBox = (props) => {
  return (
    <div className="flex w-full ml-16">
      <form id="UploadForm" onSubmit={props.handleForm}>
        <input type="file" name="file" onChange={props.handleFile} />
        <button className="file-upload-button" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default FormBox;
