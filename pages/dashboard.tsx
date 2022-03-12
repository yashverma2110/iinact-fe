import Head from "next/head";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layouts";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Head>
        <title>Dashboard - iinact</title>
        <meta
          name="description"
          content="Track, setup and watch upcoming reminders"
        />
      </Head>

      <Layout>
        <div>Dashboard</div>
      </Layout>
    </div>
  );
};

export default Dashboard;
