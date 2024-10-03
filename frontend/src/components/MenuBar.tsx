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
      `http://localhost:3000/menu?page=${page}&limit=${limit}${
        categoryId ? `&categoryId=${categoryId}` : ""
      }`
    );
  };

  return (
    <div className="flex flex-col max-w-screen-xl mx-auto pt-24 max-xl:px-12">
      <div className="flex justify-between my-8 max-sm:flex-wrap max-sm:justify-center gap-5">
        <button
          className="w-[280px] border border-gray-400 h-10 rounded-md"
          style={{
            background: isActive === 1 ? "#3dbf0c" : "",
            color: isActive === 1 ? "white" : "",
          }}
          onClick={() => handleClick(1)}
        >
          Breakfast
        </button>
        <button
          className="w-[280px] border border-gray-400 h-10 rounded-md"
          style={{
            background: isActive === 2 ? "#3dbf0c" : "",
            color: isActive === 2 ? "white" : "",
          }}
          onClick={() => handleClick(2)}
        >
          Soup
        </button>
        <button
          className="w-[280px] border border-gray-400 h-10 rounded-md"
          style={{
            background: isActive === 3 ? "#3dbf0c" : "",
            color: isActive === 3 ? "white" : "",
          }}
          onClick={() => handleClick(3)}
        >
          Main Course
        </button>
        <button
          className="w-[280px] border border-gray-400 h-10 rounded-md"
          style={{
            background: isActive === 4 ? "#3dbf0c" : "",
            color: isActive === 4 ? "white" : "",
          }}
          onClick={() => handleClick(4)}
        >
          Dessert
        </button>
      </div>
    </div>
  );
};
