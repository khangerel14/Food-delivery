"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { StoreContext } from "@/context/StoreContext";

export const MenuBar = () => {
  const router = useRouter();
  const { isActive, setIsActive, getCategoryIdByName }: any =
    useContext(StoreContext);

  const page: number = 1;
  const limit: number = 8;

  const handleClick = (categoryId: number) => {
    setIsActive(categoryId);
    getCategoryIdByName(categoryId);
    router.push(
      `http://localhost:3000/dashboard?page=${page}&limit=${limit}${
        categoryId ? `&categoryId=${categoryId}` : ""
      }`
    );
  };

  return (
    <div className="flex flex-col max-w-screen-xl mx-auto z-50">
      <div className="flex justify-center my-8 max-sm:flex-wrap max-sm:justify-center gap-3">
        <button
          className="h-10 px-3"
          style={{
            background: isActive === 1 ? "#F91944" : "",
            color: isActive === 1 ? "white" : "",
            borderRadius: isActive === 1 ? "9999px" : "",
          }}
          onClick={() => handleClick(1)}
        >
          Breakfast
        </button>
        <button
          className="h-10 px-3"
          style={{
            background: isActive === 2 ? "#F91944" : "",
            color: isActive === 2 ? "white" : "",
            borderRadius: isActive === 2 ? "9999px" : "",
          }}
          onClick={() => handleClick(2)}
        >
          Soup
        </button>
        <button
          className="h-10 px-3"
          style={{
            background: isActive === 3 ? "#F91944" : "",
            color: isActive === 3 ? "white" : "",
            borderRadius: isActive === 3 ? "9999px" : "",
          }}
          onClick={() => handleClick(3)}
        >
          Main Course
        </button>
        <button
          className="h-10 px-3"
          style={{
            background: isActive === 4 ? "#F91944" : "",
            color: isActive === 4 ? "white" : "",
            borderRadius: isActive === 4 ? "9999px" : "",
          }}
          onClick={() => handleClick(4)}
        >
          Dessert
        </button>
      </div>
    </div>
  );
};
