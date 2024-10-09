"use client";

import { Basketsvg, RedOnion } from "@/images";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/StoreContext";
import LogoutIcon from "@mui/icons-material/Logout";

export const Navbar = () => {
  const { user, error } = useUser();
  const router = useRouter();
  const { cartItems }: any = useContext(StoreContext);
  const [header, setHeader] = useState(false);

  const scrollHeader = () => {
    if (window.scrollY >= 20) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);

    return () => {
      window.removeEventListener("scroll", scrollHeader);
    };
  }, []);

  const foodLength = cartItems ? Object.keys(cartItems).length : 0;

  if (error) return <p>{error.message}</p>;

  const logIn = () => {
    router.push("/logIn");
  };

  const logOut = () => {
    router.push("/api/auth/logout", { scroll: false });
  };

  const homePage = () => {
    router.push("dashboard", { scroll: false });
  };

  const basket = () => {
    router.push("/basket");
  };

  return (
    <div
      className="w-full z-50 fixed transition-all duration-300"
      style={{
        background: header ? "white" : "transparent",
        boxShadow: header ? "0 4px 10px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <div className="flex items-center justify-between w-[1230px] mx-auto font-semibold h-20 max-xl:px-12 max-xl:w-full">
        <button onClick={homePage}>
          <RedOnion />
        </button>
        {user ? (
          <div className="flex gap-3 items-center">
            <button
              className="relative flex itecen"
              onClick={() => router.push("/order", { scroll: false })}
            >
              <Basketsvg />
              <p className="absolute inset-0 -top-2 text-white h-5 w-5 pr-0 rounded-full bg-red-500">
                {foodLength}
              </p>
            </button>
            <img
              src={user?.picture ?? "/default-avatar.png"}
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-[#313132] max-sm:hidden">
              {user.nickname}
            </span>
            <button onClick={logOut}>
              <LogoutIcon sx={{ color: "#313132" }} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-5 font-light">
            <button onClick={logIn}>Sign In</button>
            <button
              onClick={logIn}
              className="p-3 text-white rounded-full px-7 bg-[#F91944]"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
