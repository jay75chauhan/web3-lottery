import React from "react";
import Button from "./Button";
import {
  Bars3BottomRightIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";

function Header() {
  const address = useAddress();
  const disconnect = useDisconnect();
  console.log(address);
  return (
    <header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5">
      <div className="flex  items-center space-x-2">
        <img
          className="w-20 rounded-full h-20"
          src="https://avatars.githubusercontent.com/u/66429052?v=4"
          alt=""
        />

        <div>
          <h1 className="text-lg text-white">JAY DRAW</h1>
          <p className="text-xs text-emerald-500">
            User :{address?.substring(0, 7)}...
            {address?.substring(address.length, address.length - 5)}
          </p>
        </div>
      </div>
      <div className="hidden md:flex md:col-span-3 items-center justify-center ">
        <div className="bg-[#0A1F1C] p-4 space-x-2 rounded-xl">
          <Button isActive title="Buy Tickets" />
          <Button title="  Logout   " onClick={disconnect} />
        </div>
      </div>

      <div className="ml-auto">
        <div className="bg-[#0A1F1C] p-3 shadow-2xl rounded-full mx-auto">
          <ArrowLeftOnRectangleIcon
            className="h-8 w-8 text-white cursor-pointer"
            onClick={disconnect}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
