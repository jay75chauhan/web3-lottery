import React from "react";
import {
  StarIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  ArrowUturnDownIcon,
} from "@heroicons/react/24/solid";
import {
  useAddress,
  useContract,
  useContractCall,
  useContractData,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { currency } from "../constants";
import { toast } from "react-hot-toast";
function AdminFunction() {
  const address = useAddress();
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const { data: totalCommission } = useContractData(
    contract,
    "operatorTotalCommission"
  );
  const { mutateAsync: DrawWinnerTicket } = useContractCall(
    contract,
    "DrawWinnerTicket"
  );
  const { mutateAsync: RefundAll } = useContractCall(contract, "RefundAll");
  const { mutateAsync: restartDraw } = useContractCall(contract, "restartDraw");
  const { mutateAsync: WithdrawCommission } = useContractCall(
    contract,
    "WithdrawCommission"
  );

  const drawWinner = async () => {
    const notification = toast.loading("Drawing winner...");
    try {
      const data = await DrawWinnerTicket([{}]);
      toast.success("Winner drawn successfully!", {
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
  const refundAll = async () => {
    const notification = toast.loading("Refunding all...");
    try {
      const data = await RefundAll([{}]);
      toast.success("Refunded successfully!", {
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
  const restart = async () => {
    const notification = toast.loading("Restarting...");
    try {
      const data = await restartDraw([{}]);
      toast.success("Restarted successfully!", {
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
  const withdrawCommission = async () => {
    const notification = toast.loading("Withdrawing commission...");
    try {
      const data = await WithdrawCommission([{}]);
      toast.success("Commission withdrawn successfully!", {
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
    <div className="text-white mt-5 text-center px-5 py-3 rounded-lg border-emerald-300/20 border">
      <h2 className="font-bold text-xl">Admin Controls</h2>
      <p className="mb-3">
        Total Commission to be withdraws :
        {totalCommission &&
          ethers.utils.formatEther(totalCommission?.toString())}{" "}
        {currency}
      </p>

      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-5">
        <button className="admin-button" onClick={drawWinner}>
          <StarIcon className="h-6 mb-2 mx-auto" />
          Draw Winner
        </button>
        <button className="admin-button" onClick={withdrawCommission}>
          <CurrencyDollarIcon className="h-6 mb-2 mx-auto" />
          Withdraw Commission
        </button>
        <button className="admin-button" onClick={restart}>
          <ArrowPathIcon className="h-6 mb-2 mx-auto" />
          Restart Draw
        </button>
        <button className="admin-button" onClick={refundAll}>
          <ArrowUturnDownIcon className="h-6 mb-2 mx-auto" />
          Refund All
        </button>
      </div>
    </div>
  );
}

export default AdminFunction;
