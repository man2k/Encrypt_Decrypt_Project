import React, { useState } from "react";
import axios from "axios";
import FileDownload from "js-file-download";

const baseUrl = "http://localhost:3000";

function ImgSteganography() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleFile1Change = (event) => {
    setFile1(event.target.files[0]);
    // console.log("file Changed");
  };

  const handleFile2Change = (event) => {
    setFile2(event.target.files[0]);
    // console.log("image Changed");
  };

  const handleSubmit = async (event) => {
    // console.log(event);
    event.preventDefault();
    if (file1 && file2) {
      console.log("files checked");
      // e.preventDefault();
      const formData = new FormData();
      try {
        formData.append("file", file1);
        formData.append("fileName", file1.name);
        formData.append("image", file2);
        formData.append("imageName", file2.name);
        // console.log(formData);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data; boundary=MyBoundary",
          },
        };
        await axios
          .post(`${baseUrl}/upload/steg`, formData, config)
          .then((res) => {
            setUploaded(true);
            FileDownload(res.data, "steganographed.jpg");
            // axios.get(`${baseUrl}/execsteg`).then((res) => {
            // console.log(res);
            // });
          });
      } catch (error) {
        // console.log(error);
      }
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-md flex flex-col mt-16">
      <h1 className="text-slate-800 mb-5">Steganography</h1>
      <form className="flex w-full flex-col" onSubmit={handleSubmit}>
        <input
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-1 file:border-dashed hover:file:border-dotted file:text-sm file:font-semibold file:bg-green-50 file:text-violet-700 hover:file:bg-green-100"
          type="file"
          name="file"
          onChange={handleFile1Change}
        />
        <br />
        <input
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-1 file:border-dashed hover:file:border-dotted file:text-sm file:font-semibold file:bg-green-50 file:text-violet-700 hover:file:bg-green-100"
          name="image"
          type="file"
          onChange={handleFile2Change}
          accept="image/*"
        />
        <h6 className="text-xs mb-2">(The file must be an image)</h6>
        <button
          className="bg-[#444] text-slate-900 cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-[0.2s] ease-[ease-in-out] m-28 mt-3 px-5 py-2.5 rounded-[5px] border-[none] hover:bg-gray-900 hover:shadow-[0_4px_6px_rgba(0,0,0,0.4)"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ImgSteganography;
