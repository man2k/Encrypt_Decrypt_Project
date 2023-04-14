import React from "react";

const InputKeyBox = (props) => {
  return (
    <div className="flex flex-row ml-16 w-full h-10">
      <input
        type="text"
        name="key"
        id="key"
        className="key w-3/4"
        onChange={(e) => {
          props.setKeyDec(e.target.value);
          //   console.log(e.target.value);
        }}
      />
    </div>
  );
};

export default InputKeyBox;
