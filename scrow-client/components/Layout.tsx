import React, { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { addresses } from "../constants";

type LayoutProps = PropsWithChildren & {
  className?: string;
};

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={className}>
      <Navbar />
      {children}
    </div>
  );
};
