"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { inputContext } from "@/app/dashboard/page";
import { Basket, Icon, User } from "@/images";

export const NavbarUser = () => {
  const router = useRouter();
  const inputRef = useContext(inputContext);

  const handleRef = (e: any) => {
    if (inputRef) {
      inputRef.current = e.target.value;
    }
  };

  const logIn = () => {
    router.push("/logIn");
  };
  const menu = () => {
    router.push("/menu");
  };
  const deliverZone = () => {
    router.push("/deliverZone");
  };
  const homePage = () => {
    router.push("dashboard");
  };
  const basket = () => {
    router.push("/basket");
  };
  return (
    <div>
      <div className="flex items-center justify-between max-w-screen-xl mx-auto font-semibold h-20">
        <div className="flex items-center gap-10">
          <button>
            <Icon />
          </button>
          <button className="hover:text-green-600" onClick={homePage}>
            НҮҮР
          </button>
          <button className="hover:text-green-600" onClick={menu}>
            ХООЛНЫ ЦЭС
          </button>
          <button className="hover:text-green-600" onClick={deliverZone}>
            ХҮРГЭЛТИЙН БҮС
          </button>
        </div>
        <div className="flex items-center gap-10">
          <input
            className="border rounded-lg h-10 font-normal px-4 outline-none"
            type="search"
            placeholder="Хайх"
            onChange={handleRef}
          />
          <button
            className="flex items-center gap-4 hover:text-green-600"
            onClick={basket}
          >
            <Basket />
            Сагс
          </button>
          <button
            className="flex items-center gap-4 hover:text-green-600"
            onClick={logIn}
          >
            <User />
            Хэрэглэгч
          </button>
        </div>
      </div>
    </div>
  );
};
