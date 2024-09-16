"use client";

import { Basket, Icon, User } from "@/images";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

export const Navbar = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading...</p>;

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
            {user ? user.name : "Нэвтрэх"}
          </button>
        </div>
      </div>
    </div>
  );
};
