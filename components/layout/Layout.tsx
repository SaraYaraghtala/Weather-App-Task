import { FC } from "react";
import { LayoutProps } from "./Layout.types";

const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className="bg-iron-200 relative w-full h-screen">{children}</div>;
};

export default Layout;