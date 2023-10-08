import { FC } from "react";
import { LayoutProps } from "./Layout.types";

const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className="bg-iron-200  w-full h-screen flex justify-center items-center ">{children}</div>;
};

export default Layout;