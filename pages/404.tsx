import Head from "next/head";
import React from "react";
import Layout from "../components/Atomic/layouts";

type Props = {};

const PageNotFound = (props: Props) => {
  return (
    <div>
      <Head>
        <title>Page not found - iinact</title>
        <meta name="description" content="Page not found" />
      </Head>

      <Layout>
        <div className="text-center my-4">
          Sorry, you landed on the wrong spot!
        </div>
      </Layout>
    </div>
  );
};

export default PageNotFound;
