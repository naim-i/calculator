import React from "react";

const Container = ({ children }) => {
  return (
    <div className=" w-full ">
      <div className="container max-w-7xl mx-auto">{children}</div>;
    </div>
  );
};

export default Container;
