import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import {
  useAddress,
  useContractData,
  useContract,
  useContractCall,
} from "@thirdweb-dev/react";
import Login from "../components/Login";
import HomePage from "../components/Home";
import { ethers } from "ethers";
import { currency } from "../constants";
import { toast } from "react-hot-toast";

import AdminFunction from "../components/AdminFunction";
import Fotter from "../components/Fotter";
import ScrollWinner from "../components/ScrollWinner";
const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { data: winning } = useContractData(
    contract,
    "getWinningsForAddress",
    address
  );

  const { data: lotteryOperator } = useContractData(
    contract,
    "lotteryOperator"
  );

  const { mutateAsync: WithdrawWinnings } = useContractCall(
    contract,
    "WithdrawWinnings"
  );

  if (!address) return <Login />;

  const onWithdrawWinning = async () => {
    const notification = toast.loading("Withdrawing your winnings...");

    try {
      const data = await WithdrawWinnings([{}]);
      toast.success("Winnings withdrawn successfully!", {
        id: notification,
      });
      console.log("contract call success", data);
    } catch {
      toast.error("Whoops something went wrong!", {
        id: notification,
      });
      console.log("Whoops something went wrong");
    }
  };

  return (
    <div className="bg-[#091818] min-h-screen flex flex-col ">
      <Head>
        <title>🎉 Lottert </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {winning && winning > 0 && (
        <div className="max-w-md md:max-w-2xl  text-sm md:text-xl items-center font-semibold lg:max-w-4xl mx-auto mt-5 flex text-white">
          <div className="flex flex-col">
            <div className=" animate-bounce">
              <p>
                🎉🎉 Winner Winner Total Winnings :{" "}
                <span className="text-emerald-400">
                  {ethers.utils.formatEther(winning?.toString())} {currency}
                </span>{" "}
                🎉🎉
              </p>
            </div>

            <button
              onClick={onWithdrawWinning}
              className="bg-emerald-500  hover:bg-emerald-700 p-3   rounded-lg text-black shadow-2xl  font-bold text-xl"
            >
              CLAIM NOW
            </button>
          </div>
        </div>
      )}
      <ScrollWinner />
      {address === lotteryOperator && (
        <div className="flex justify-center">
          <AdminFunction />
        </div>
      )}

      <HomePage />
      <Fotter />
    </div>
  );
};

export default Home;
