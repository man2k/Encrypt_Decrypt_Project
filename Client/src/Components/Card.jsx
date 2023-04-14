import React from "react";
// import styled from "styled-components";
const Card = (props) => (
  <div className="flex flex-row w-full text-sm">
    <h2>Your Key</h2>
    {/* <div>Save it and keep it safe</div> */}
    <h3 className="flex border-dashed border-x-red-500 border-y-red-400 hover:border-red-200 hover:border-dotted h-50 w-100 p-4 border-2 my-10">
      {props.password}
    </h3>
  </div>
);
export default Card;
