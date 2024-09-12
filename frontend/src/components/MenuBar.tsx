"use client";

import { useState } from "react";

export const MenuBar = () => {
  const [isActive, setIsActive] = useState("Breakfast");
  const handleClick = (e: any) => {
    setIsActive(e);
  };
  return (
    <div className="flex flex-col max-w-screen-xl mx-auto">
      <div className="flex justify-between my-8">
        <button
          className="w-[280px] border border-gray-400 h-10 rounded-md"
          style={{
            background: isActive === "Breakfast" ? "#3dbf0c" : "",
            color: isActive === "Breakfast" ? "white" : "",
          }}
          onClick={() => handleClick("Breakfast")}
        >
          Breakfast
        </button>
        <button
          className="w-[280px] border border-gray-400 h-10 rounded-md"
          style={{
            background: isActive === "Soup" ? "#3dbf0c" : "",
            color: isActive === "Soup" ? "white" : "",
          }}
          onClick={() => handleClick("Soup")}
        >
          Soup
        </button>
        <button
          className="w-[280px] border border-gray-400 h-10 rounded-md"
          style={{
            background: isActive === "Main Course" ? "#3dbf0c" : "",
            color: isActive === "Main Course" ? "white" : "",
          }}
          onClick={() => handleClick("Main Course")}
        >
          Main Course
        </button>
        <button
          className="w-[280px] border border-gray-400 h-10 rounded-md"
          style={{
            background: isActive === "Dessert" ? "#3dbf0c" : "",
            color: isActive === "Dessert" ? "white" : "",
          }}
          onClick={() => handleClick("Dessert")}
        >
          Dessert
        </button>
      </div>
    </div>
  );
};
