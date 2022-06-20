import React from "react";
import Head from "next/head";
import Layout from "../components/Atomic/layouts";

const Summary = () => {
  return (
    <div>
      <Head>
        <title>Summary - iinact</title>
        <meta
          name="description"
          content="View your submissions, review and master"
        />
      </Head>

      <Layout>
        <div>Content</div>
      </Layout>
    </div>
  );
};

export default Summary;
