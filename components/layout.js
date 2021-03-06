import React from "react";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="mt-10">{children}</div>
    </div>
  );
};

export default Layout;
