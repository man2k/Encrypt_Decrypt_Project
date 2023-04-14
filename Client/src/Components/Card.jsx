import React from "react";
// import styled from "styled-components";
const Card = (props) => (
  <div className="flex flex-row w-3/4 text-sm">
    <h2 className="">Your Key</h2>
    {/* <div>Save it and keep it safe</div> */}
    <h3 className="box-border h-50 w-100 p-4 border-2 my-10">
      {props.password}
    </h3>
  </div>
);
export default Card;
