import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import { useAddress, useDisconnect, useContract } from "@thirdweb-dev/react";
import Login from "../components/Login";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );

  if (!address) return <Login />;

  return (
    <div className="bg-[#091818] min-h-screen flex flex-col">
      <Head>
        <title>🎉 Lottert </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  );
};

export default Home;
