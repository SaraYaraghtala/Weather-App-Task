import { AppProps } from "next/app";
import { NextPage } from "next/types";
import { ReactElement, ReactNode } from 'react';


 export interface LayoutProps {
    children: ReactNode;
  }

  export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
  };

  export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
  };