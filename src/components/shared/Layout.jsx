import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <main>
        <Header />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
