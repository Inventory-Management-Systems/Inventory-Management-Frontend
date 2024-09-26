import React from "react";

const Footer = () => {
  return (
    <div
      className="footer"
      style={{
        bottom: 0,
        left: 0,
        right: 0,
        height: "6vh",
        backgroundColor: "black",
        color: "#fff",
        padding: "5px",
        // width: "100%",
      }}
    >
      <p className="text-center my-2">
        Inventory Management System &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
