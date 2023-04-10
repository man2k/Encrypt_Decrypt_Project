import React from "react";
// import { useState } from "react";

const FormBox = (props) => {
  return (
    <>
      <form id="UploadForm" onSubmit={props.handleForm}>
        <input type="file" name="file" onChange={props.handleFile} />
        <button class="file-upload-button" type="submit">
          Upload
        </button>
      </form>
    </>
  );
};

export default FormBox;
