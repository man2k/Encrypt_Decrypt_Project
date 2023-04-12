import React from "react";
// import styled from "styled-components";
const Card = (props) => (
  <div className="bg-white">
    <h2>Your Key</h2>
    {/* <div>Save it and keep it safe</div> */}
    <h3>{props.key}</h3>
  </div>
);
export default Card;
