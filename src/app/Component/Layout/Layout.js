import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import TopBar from "../TopBar/TopBar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <TopBar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
