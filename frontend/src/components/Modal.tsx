"use client";

import { Basket, User } from "@/images";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useContext } from "react";
import { StoreContext } from "@/context/StoreContext";

export const Modal = () => {
  const { user, error } = useUser();
  const router = useRouter();
  const { inputValue, setInputValue, cartItems }: any =
    useContext(StoreContext);

  const foodLength = cartItems ? Object.keys(cartItems).length : 0;

  if (error) return <p>{error.message}</p>;

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
    <div className="w-96 bg-red-500">
      <div className="flex items-center gap-10 flex-col">
        <input
          className="border rounded-lg h-10 font-normal px-4 outline-none"
          type="search"
          placeholder="Хайх"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="flex items-center gap-4 hover:text-green-600"
          onClick={basket}
        >
          <div className="relative">
            <Basket />
            <p className="absolute inset-0 -top-2 pl-4">{foodLength}</p>
          </div>
          Сагс
        </button>
        <button
          className="flex items-center gap-4 hover:text-green-600"
          onClick={logIn}
        >
          <User />
          {user ? user.nickname : "Нэвтрэх"}
        </button>
      </div>
    </div>
  );
};
