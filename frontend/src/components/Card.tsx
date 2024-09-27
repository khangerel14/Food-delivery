"use client";

import { useContext, useEffect } from "react";
import { StoreContext } from "@/context/StoreContext";
import { Paginations } from "./Paginations";
import StarIcon from "@mui/icons-material/Star";
import { useSearchParams } from "next/navigation";

export const Card = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("Card must be used within a StoreContextProvider");
  }

  const {
    addToCart,
    foodData,
    isActive,
    inputValue,
    fetchFoods,
    loading,
    totalItems,
  } = context;
  const searchParams = useSearchParams();

  // Get page and limit from URL
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "4", 10);

  // Fetch new food data on page change
  useEffect(() => {
    fetchFoods(page, limit);
  }, [page, limit]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (foodData.length === 0) {
    return <div>No Food Available</div>;
  }

  return (
    <div className="flex flex-col mx-auto max-w-screen-xl items-center">
      <div className="flex flex-wrap justify-between rounded-xl py-10 max-w-screen-xl mx-auto gap-[53px]">
        {foodData
          .filter((elem: any) => {
            const matchesActive = isActive === "" || elem.menu === isActive;
            const matchesInput =
              !inputValue ||
              elem.name.toLowerCase().includes(inputValue.toLowerCase());
            return matchesActive && matchesInput;
          })
          .map((elem: any) => (
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

      <Paginations currentPage={page} limit={limit} totalItems={totalItems} />
    </div>
  );
};
