import React from "react";
import { ConnectWallet, useContract } from "@thirdweb-dev/react";
import Head from "next/head";
import Image from "next/image";
import { RingLoader } from "react-spinners";
function Login() {
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );

  return (
    <div className=" bg-[#091818] flex h-screen items-center justify-center">
      <Head>
        <title>🎉WEB 3.0 Lottr 🎉</title>
        <meta name="description" content="login " />
        <link
          rel="icon"
          href="https://image.flaticon.com/icons/png/512/2111/2111320.png"
        />
      </Head>
      {isLoading ? (
        <div className="bg-[#091B18] h-screen w-screen flex items-center justify-center justify-items-center ">
          <RingLoader color="#36d7b7" size="400" />
        </div>
      ) : (
        <div className="bg-transparent   backdrop-blur-3xl z-20  shadow-2xl shadow-pink-500 rounded-3xl p-10 sm:p-24  ">
          <div className=" flex hover:animate-spin  items-center justify-center">
            <h1 className=" text-9xl text-center">🎉</h1>
          </div>
          <div className="flex flex-col items-center mt-12">
            <ConnectWallet accentColor="" />

            <h1 className="text-5xl text-white  font-bold  mt-4">
              WEB 3.0 Lottr
            </h1>
            <a
              className=" mt-4 text-right  pl-36 text-gray-200 hover:text-gray-300 hover:underline no-underline md:hover:underline text-xs"
              href="https://github.com/jay75chauhan"
              target="_blank"
            >
              @jayChauhan
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
