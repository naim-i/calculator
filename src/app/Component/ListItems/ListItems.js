import React from "react";

const ListItems = ({ className, children }) => {
  return <li className={`${className}`}>{children}</li>;
};

export default ListItems;
