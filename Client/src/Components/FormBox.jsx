import React from "react";
// import { useState } from "react";

const FormBox = (props) => {
  // console.log(props.name);
  return (
    <div className="flex w-full">
      <form
        id={`UploadForm ${props.name}`}
        onSubmit={(e) => props.handleForm(e, props.name)}
      >
        <input
          key={props.name}
          className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-2 file:border-black file:border-dashed hover:file:border-dotted file:text-sm file:font-semibold file:bg-green-50 file:text-violet-700 hover:file:bg-green-100"
          type="file"
          name="file"
          onChange={props.handleFile}
        />
        <button
          disabled={props.uploaded}
          className="file-upload-button disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent font-mono disabled:text-slate-300 disabled:hover:text-green-600"
          type="submit"
        >
          {props.uploaded ? "Uploaded Successfully" : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default FormBox;
