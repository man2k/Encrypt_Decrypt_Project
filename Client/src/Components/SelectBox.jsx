import React from "react";
import { Select, Option } from "@material-tailwind/react";
import ChipherList from "../assets/Data/ChipherList";
const SelectBox = (props) => {
  return (
    <div className="w-full text-white">
      <Select
        className="h-11"
        label={`Select ${props.type} Type`}
        onChange={(choice) => {
          props.setChoice(choice);
        }}
      >
        {ChipherList.map((e) => {
          return (
            <Option
              className="block appearance-none bg-gray-200 border border-transparent hover:bg-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              value={e.value}
              key={e.value}
            >
              {e.label}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default SelectBox;
