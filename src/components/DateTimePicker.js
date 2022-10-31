// import { useRouter } from "next/router";

import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export const DateTimePicker = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  ...props
}) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      isClearable={isClearable}
      showPopperArrow={showPopperArrow}
      {...props}
    />
  );
};

