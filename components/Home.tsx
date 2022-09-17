import React from "react";
import { useState, useEffect } from "react";
import {
  useAddress,
  useContract,
  useContractCall,
  useContractData,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { currency } from "../constants";
import CountDown from "./CountDown";
import toast from "react-hot-toast";
function HomePage() {
  const address = useAddress();
  const [quantity, setQuantity] = useState<number>(1);
  const [disable, setdisable] = useState<boolean>(false);
  const [userTickets, setUserTickets] = useState<number>(0);
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { data: remainingTickets } = useContractData(
    contract,
    "RemainingTickets"
  );
  const { data: currentWinningReward } = useContractData(
    contract,
    "CurrentWinningReward"
  );
  const { data: ticketCommission } = useContractData(
    contract,
    "ticketCommission"
  );
  const { data: expiration } = useContractData(contract, "expiration");
  const { data: tickets } = useContractData(contract, "getTickets");
  const { data: ticketPrice } = useContractData(contract, "ticketPrice");

  const { mutateAsync: BuyTickets } = useContractCall(contract, "BuyTickets");

  const handleBuy = async () => {
    if (!ticketPrice) return;
    const notification = toast.loading("Buying your tickets...");
    setdisable(true);
    try {
      const data = await BuyTickets([
        {
          value: ethers.utils.parseEther(
            (
              Number(ethers.utils.formatEther(ticketPrice)) * quantity
            ).toString()
          ),
        },
      ]);

      toast.success("Tickets bought successfully!", {
        id: notification,
      });
      setdisable(false);
      console.log("contract call success", data);
    } catch {
      toast.error("Whoops something went wrong!", {
        id: notification,
      });
      console.log("Whoops something went wrong");
    }
  };

  useEffect(() => {
    console.log("user tickets", tickets);
    if (!tickets) return;

    const totalTickets: string[] = tickets;
    console.log("user tickets", tickets);
    const noOfUserTickets = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
      0
    );

    setUserTickets(noOfUserTickets);
    console.log("user tickets", noOfUserTickets);
  }, [tickets, address]);

  return (
    <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row  items-start md:space-x-5">
      <div className="stats-container ">
        <h1 className="text-3xl mb-2 text-white font-semibold text-center">
          The Next Draw
        </h1>
        <div className="flex justify-between p-2 space-x-3">
          <div className="stats">
            <h2 className="text-sm">Total Pool</h2>
            <p className="text-xl">
              {currentWinningReward &&
                ethers.utils.formatEther(currentWinningReward?.toString())}{" "}
              {currency}
            </p>
          </div>
          <div className="stats">
            <h2 className="text-sm">Tickets Remaining </h2>
            <p className="text-xl">{remainingTickets?.toNumber()}</p>
          </div>
        </div>

        <div className="md:mt-5 md:mb-3">
          <CountDown />
        </div>
      </div>

      <div className="stats-container space-y-3">
        <div className="flex justify-between items-center text-white pb-2">
          <h2 className="font-semibold text-lg">Price per ticket</h2>
          <p className="font-semibold text-lg">
            {ticketPrice && ethers.utils.formatEther(ticketPrice?.toString())}{" "}
            {currency}
          </p>
        </div>

        <div className="flex text-white text-center space-x-2 rounded-lg bg-[#091B18] border-[#004337] border p-4">
          <p>TICKETS</p>
          <input
            type="number"
            className=" w-full bg-transparent text-right outline-none"
            min={1}
            max={10}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2 mt-5">
          <div className="flex items-center justify-between text-emerald-300 text-base  font-bold">
            <p>Total cost of tickets</p>
            <p>
              {ticketPrice &&
                Number(ethers.utils.formatEther(ticketPrice?.toString())) *
                  quantity}{" "}
              {currency}
            </p>
          </div>
          <div className="flex items-center justify-between text-emerald-300 text-sm ">
            <p>Service fees</p>
            <p>
              {ticketCommission &&
                ethers.utils.formatEther(ticketCommission?.toString())}{" "}
              {currency}
            </p>
          </div>
          <div className="flex items-center justify-between text-emerald-300 text-sm ">
            <p> + Network Fees</p>
            <p>TBC</p>
          </div>
        </div>

        <button
          onClick={handleBuy}
          disabled={
            expiration?.toString() < Date.now().toString() ||
            remainingTickets?.toNumber() === 0 ||
            disable
          }
          className="mt-5 w-full  bg-emerald-500 hover:bg-emerald-700 disabled:hover:bg-gray-700  px-8 py-4 rounded-lg text-black shadow-2xl  disabled:text-gray-200 disabled:bg-gray-600 disabled:cursor-not-allowed font-bold text-xl"
        >
          Buy {quantity} Tickets for{" "}
          {ticketPrice &&
            Number(ethers.utils.formatEther(ticketPrice?.toString())) *
              quantity}{" "}
          {currency}
        </button>

        {userTickets > 0 && (
          <div className="stats">
            <p className="font-semibold pb-2">
              You have {userTickets} Tickets in this draw
            </p>

            <div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2">
              {Array(userTickets)
                .fill("")
                .map((_, i) => (
                  <p
                    key={i}
                    className="text-emerald-300 bg-emerald-500/30 rounded-lg flex flex-shrink-0 items-center justify-center font-bold h-20 w-12"
                  >
                    {i + 1}
                  </p>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
