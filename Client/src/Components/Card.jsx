import React from "react";
// import styled from "styled-components";
const Card = (props) => (
  <div className="flex flex-row w-full text-sm">
    <h2>Your Key</h2>
    {/* <div>Save it and keep it safe</div> */}
    {/* <h3
      className="flex border-dashed border-x-red-500 border-y-red-400 hover:border-red-200 hover:border-dotted h-50 w-100 p-4 border-2 my-10"
      onClick={() => {}}
    >
      {props.password}
    </h3> */}
    <input
      type="text"
      value={props.password}
      readOnly
      className="key hover:animate-pulse w-full placeholder:text-gray-500 placeholder:italic border-dashed border-x-red-500 border-y-red-400 hover:border-red-200 hover:border-dotted"
      onClick={(e) => {
        // console.log(typeof e.target.value);
        if (e.target.value !== "") {
          navigator.clipboard.writeText(e.target.value);
          let tmp = e.target.value;
          e.target.value = "copied to clipboard..";
          setTimeout(() => {
            e.target.value = tmp;
          }, 900);
        }
      }}
    ></input>
  </div>
);
export default Card;
