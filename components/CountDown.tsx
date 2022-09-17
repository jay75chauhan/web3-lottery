ReferenceError;
import React from "react";
import { useContract, useContractData } from "@thirdweb-dev/react";
import Countdown from "react-countdown";

type Props = {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

function CountDown() {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { data: expiration } = useContractData(contract, "expiration");

  const renderer = ({ hours, minutes, seconds, completed }: Props) => {
    if (completed) {
      return (
        <div className="text-red-600 md:text-2xl text-center animate-pulse">
          <h2>Ticket Sales have now CLOSED for this draw</h2>
        </div>
      );
    } else {
      return (
        <div>
          <h3 className="text-white text-xl md:text-2xl  md:mb-4 mb-2  ">
            Time Remaining
          </h3>
          <div className="flex space-x-6">
            <div className="flex-1">
              <div className="countdown animate-pulse">{hours}</div>
              <div className="countdown-lable">hours</div>
            </div>
            <div className="flex-1">
              <div className="countdown animate-pulse">{minutes}</div>
              <div className="countdown-lable">minutes</div>
            </div>
            <div className="flex-1">
              <div className="countdown animate-pulse">{seconds}</div>
              <div className="countdown-lable">seconds</div>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      <Countdown date={new Date(expiration * 1000)} renderer={renderer} />,
    </div>
  );
}

export default CountDown;
