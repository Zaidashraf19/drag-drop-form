import React from "react";
import { BsTextarea } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { HiCalendarDateRange } from "react-icons/hi2";
import { MdFileUpload } from "react-icons/md";
import {
  RiCheckboxFill,
  RiDropdownList,
  RiRadioButtonFill,
  RiToggleLine,
} from "react-icons/ri";
import { TbInputSpark } from "react-icons/tb";
import { styled } from "@mui/material/styles";
import { CgPassword } from "react-icons/cg";

const Bcomponents = [
  { icon: <TbInputSpark size="2rem" />, type: "Input" },
  { icon: <BsTextarea size="2rem" />, type: "TextArea" },
  { icon: <RiDropdownList size="2rem" />, type: "DropDown" },
  { icon: <RiToggleLine size="2rem" />, type: "Switcher" },
  { icon: <RiCheckboxFill size="2rem" />, type: "CheckBox" },
  { icon: <RiRadioButtonFill size="2rem" />, type: "RadioButton" },
  { icon: <MdFileUpload size="2rem" />, type: "File" },
  { icon: <HiCalendarDateRange size="2rem" />, type: "Date" },
];

const Acomponents = [
  { icon: <CgPassword size="2rem" />, type: "Password" },
  { icon: <CiMail size="2rem" />, type: "Mail" },
  { icon: <FaPhoneAlt size="2rem" />, type: "PhoneNumber" },
];

const Sider = ({ onDragStart }) => {
  return (
    <div
      style={{ width: "30rem", maxHeight: "300vh" }}
      className="shadow-lg py-3"
    >
      <div>
        <p className="text-capitalize fw-bold fs-2 text-center">
          basic components
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          {Bcomponents.map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => onDragStart(e, item.type)}
              className="border bg-body-tertiary fw-semibold p-3 rounded-3 text-capitalize text-center"
              style={{ width: "8rem", cursor: "move" }}
            >
              <p>{item.icon}</p>
              <p>{item.type}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-capitalize fw-bold fs-2 text-center mt-4">
          advance components
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          {Acomponents.map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => onDragStart(e, item.type)}
              className="border bg-body-tertiary fw-semibold p-3 rounded-3 text-capitalize text-center"
              style={{ width: "8rem", cursor: "move" }}
            >
              <p>{item.icon}</p>
              <p>{item.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sider;
