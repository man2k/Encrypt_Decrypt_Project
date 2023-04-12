import React from "react";

const Textbox = (props) => {
  return (
    <div>
      <input type="text" value={props.key} />
    </div>
  );
};

Textbox.propTypes = {};

export default Textbox;
