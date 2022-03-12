import Head from "next/head";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layouts";

const Lists = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Head>
        <title>Lists - iinact</title>
        <meta
          name="description"
          content="Create, edit, share or delete your playlists"
        />
      </Head>

      <Layout>
        <div className="flex">
          <button className="bg-red-400 rounded text-white shadow p-2 text-xs md:text-lg">
            Create
          </button>
        </div>
      </Layout>
    </div>
  );
};

export default Lists;
