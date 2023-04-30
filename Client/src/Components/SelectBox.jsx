import React from "react";
import { Select, Option } from "@material-tailwind/react";
import ChipherList from "../assets/Data/ChipherList";
const SelectBox = (props) => {
  return (
    <div className="w-full text-slate-200 font-mono text-xs gap-2 border-transparent bg-transparent rounded-lg border-2">
      <Select
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        color="red"
        size="md"
        className="flex h-full w-full uppercase text-slate-200 text-center justify-between px-2 py-2 flex-row-reverse gap-5 text-base font-mono font-bold bg-gray-900 rounded-lg border-transparent text-slate-200"
        label={`Select ${props.type} Type`}
        onChange={(choice) => {
          props.setChoice(choice);
        }}
      >
        {ChipherList.map((e) => {
          return (
            <Option
              className="block appearance-none bg-gray-100 border border-transparent hover:bg-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline hover:uppercase"
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
