import React, { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
