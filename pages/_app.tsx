import { AppPropsWithLayout } from "@/components/layout/Layout.types";
import "@/styles/globals.css";

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

export default App;
