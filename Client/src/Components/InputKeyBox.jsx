import React from "react";

const InputKeyBox = (props) => {
  return (
    <div>
      <input
        type="text"
        name="key"
        id="key"
        className="key"
        onChange={(e) => {
          props.setKeyDec(e.target.value);
          //   console.log(e.target.value);
        }}
      />
    </div>
  );
};

export default InputKeyBox;
