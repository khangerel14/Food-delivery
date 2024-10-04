"use client";

import { useEffect, useContext } from "react";
import { StoreContext } from "@/context/StoreContext";
import StarIcon from "@mui/icons-material/Star";
import { useSearchParams } from "next/navigation";
import { Paginations } from "./Paginations";

export const Dashcart = () => {
  const {
    addToCart,
    fetchFoods,
    isActive,
    totalItems,
    foodData = [],
    inputValue,
  }: any = useContext(StoreContext);
  const searchParams = useSearchParams();

  const handleAddToCart = async (foodId: string, quantity: number = 1) => {
    try {
      await addToCart(foodId, quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  console.log(foodData);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "8", 10);

  useEffect(() => {
    fetchFoods(page, limit, isActive);
  }, [page, limit, isActive]);

  return (
    <div className="max-w-screen-xl mx-auto flex flex-wrap justify-center gap-12">
      {foodData
        .filter((elem: any) => {
          const matchesInput =
            !inputValue ||
            elem.name.toLowerCase().includes(inputValue.toLowerCase());
          return matchesInput;
        })
        .map((elem: any, index: any) => (
          <div
            className="flex flex-col border border-gray-400 mb-10 w-[280px] rounded-xl shadow-inner max-xl:w-[400px] max-md:w-[260px] max-sm:w-[340px]"
            key={index}
          >
            <div className="relative">
              <img
                src={elem.imgUrl}
                alt={elem.name}
                className="rounded-t-xl bg-cover h-[180px] bg-full"
                height={180}
                width={400}
              />
              <div className="absolute flex top-2 right-2 bg-white rounded-full text-center px-3 p-1 gap-1 items-center z-20">
                <StarIcon sx={{ color: "#ffff00" }} />
                <p>{elem.assessment}</p>
              </div>
            </div>
            <div className="flex flex-col p-3 justify-between gap-3 h-full">
              <h1 className="font-semibold">{elem.name}</h1>
              <p>{elem.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-gray-600">Price:</h1>
                  <p className="font-semibold">{elem.price}</p>
                </div>
                <button
                  className="p-2 px-3 rounded-full flex items-center justify-center bg-[#85BB65] text-white"
                  onClick={() => handleAddToCart(elem.id, 1)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      <Paginations currentPage={page} limit={limit} totalItems={totalItems} />
    </div>
  );
};
