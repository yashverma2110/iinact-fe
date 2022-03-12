import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>iinact - An engaging practicing platform</title>
        <meta
          name="description"
          content="Create your own playlist of DSA questions, get reminded, score yourself, view summary and become a master"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="base h-screen w-screen relative">
          <div className="header relative h-4/5">
            <div
              className={
                styles.backGradient +
                " absolute -z-10 -top-1/4 h-full w-full shadow-lg -skew-y-12"
              }
            ></div>

            <div className="w-full p-4">
              <div className="text-white italic font-bold text-2xl md:text-3xl">
                iinact
              </div>
            </div>

            <div className="flex justify-center p-4 md:my-8">
              <div className="text-center text-slate-300 text-sm md:text-lg md:w-2/3">
                An engaging practice and progress tracking platform. Create your
                LeetCode, Codeforces, Youtube lists, get reminded, score
                yourself, see summary and revise.
              </div>
            </div>

            <div className="flex justify-center my-4">
              <button className="rounded-full shadow-lg py-2 px-4 bg-red-400 text-white font-bold text-xl md:text-2xl">
                <Link href="/login">Get started</Link>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
