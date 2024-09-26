"use client";

import StarIcon from "@mui/icons-material/Star";
import { useContext } from "react";
import { StoreContext } from "@/context/StoreContext";
import { Paginations } from "./Paginations";
import { useSearchParams } from "next/navigation";

type FoodItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  imgUrl: string;
  assessment: number;
  menu?: string;
};

export const Card = () => {
  const { addToCart, foodData, isActive, inputValue }: any =
    useContext(StoreContext);
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const per_page = parseInt(searchParams.get("per_page") || "4", 10);

  const start = (page - 1) * per_page;
  const end = start + per_page;

  const filteredFood = foodData.filter((item: FoodItem) => {
    const matchesActive =
      isActive === "" || !isActive || item.menu === isActive;
    const matchesInput =
      !inputValue || item.name.toLowerCase().includes(inputValue.toLowerCase());
    return matchesActive && matchesInput;
  });

  const foods = filteredFood.slice(start, end);

  return (
    <div className="flex flex-col mx-auto max-w-screen-xl items-center">
      <div className="flex flex-wrap justify-between rounded-xl py-10 max-w-screen-xl mx-auto gap-[53px]">
        {foods.map((elem: FoodItem) => (
          <div
            className="flex flex-col border border-gray-400 mb-10 w-[280px] rounded-xl shadow-inner"
            key={elem.id}
          >
            <div className="relative">
              <img
                src={elem.imgUrl}
                alt={elem.name}
                className="rounded-t-xl bg-cover h-[180px]"
                height={180}
                width={280}
              />
              <div className="absolute flex top-2 right-2 bg-white rounded-full text-center px-2 z-20">
                <StarIcon sx={{ color: "#ffff00" }} />
                <p>{elem.assessment}</p>
              </div>
            </div>
            <div className="flex flex-col p-3 justify-between gap-3 h-full">
              <h1 className="font-semibold">{elem.name}</h1>
              <p>{elem.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-gray-600">Үнэ:</h1>
                  <p className="font-semibold">{elem.price}</p>
                </div>
                <button
                  className="p-2 px-3 rounded-full flex items-center justify-center bg-[#85BB65]"
                  onClick={() => addToCart(elem.id)}
                >
                  Сагслах
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Paginations foodValue={foods} />
    </div>
  );
};
