import Layout from "@/components/layout/Layout";
import { NextPageWithLayout } from "@/components/layout/Layout.types";
import Widget from "@/components/widget";

const Home: NextPageWithLayout = () => {
  return <Widget />;
};

export default Home;

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
