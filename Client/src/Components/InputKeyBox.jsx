import React from "react";

const InputKeyBox = (props) => {
  return (
    <div className="flex flex-row w-full h-10">
      <input
        className="key w-full placeholder:text-gray-500 placeholder:italic"
        type="text"
        name="key"
        id="key"
        placeholder="Your Secret Key"
        onChange={(e) => {
          props.setKeyDec(e.target.value);
        }}
      />
    </div>
  );
};

export default InputKeyBox;
