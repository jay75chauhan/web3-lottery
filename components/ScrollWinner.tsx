import { useContract, useContractData } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React from "react";
import Marquee from "react-fast-marquee";
import { currency } from "../constants";

function ScrollWinner() {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { data: lastWinner } = useContractData(contract, "lastWinner");

  const { data: lastWinnerAmount } = useContractData(
    contract,
    "lastWinnerAmount"
  );
  return (
    <Marquee className="bg-[#0A1F1C] p-3 md:5 " gradient={false} speed={100}>
      <div className="flex space-x-2 mx-10">
        <h4 className="text-white font-semibold">
          Last Winner: {lastWinner?.toString()}
        </h4>
        <h4 className="text-white font-semibold">
          Previous winnings:{" "}
          {lastWinnerAmount &&
            ethers.utils.formatEther(lastWinnerAmount?.toString()) +
              " " +
              currency}
        </h4>
      </div>
    </Marquee>
  );
}

export default ScrollWinner;
