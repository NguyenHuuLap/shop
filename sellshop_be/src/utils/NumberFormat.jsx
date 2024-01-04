import React from "react";
export default function NumberFormat({ number }) {
  const options = { maximumFractionDigits: 2 };
  const formattedNumber = Intl.NumberFormat("en-US", options).format(number);

  return formattedNumber;
}
