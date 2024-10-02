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
    inputValue,
    fetchFoods,
    loading,
    totalItems,
    isActive, // Add this line to access the current active category
  } = context;

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "8", 10);

  const categoryIdStr = searchParams.get("categoryId");
  const categoryId: number | undefined = categoryIdStr
    ? parseInt(categoryIdStr, 10)
    : undefined;

  useEffect(() => {
    fetchFoods(page, limit, isActive);
  }, [page, limit, isActive]);

  const handleAddToCart = async (foodId: string, quantity: number = 1) => {
    try {
      await addToCart(foodId, quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return <div className="w-36 mx-auto h-full py-52">Loading...</div>;
  }

  if (foodData.length === 0) {
    return <div className="w-36 mx-auto h-full py-52">No Food Available</div>;
  }

  return (
    <div className="flex flex-col mx-auto max-w-screen-xl items-center">
      <div className="flex flex-wrap justify-between rounded-xl py-10 max-w-screen-xl mx-auto gap-[53px]">
        {foodData
          .filter((elem: any) => {
            const matchesInput =
              !inputValue ||
              elem.name.toLowerCase().includes(inputValue.toLowerCase());
            return matchesInput;
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
                    <h1 className="text-gray-600">Price:</h1>
                    <p className="font-semibold">{elem.price}</p>
                  </div>
                  <button
                    className="p-2 px-3 rounded-full flex items-center justify-center bg-[#85BB65]"
                    onClick={() => handleAddToCart(elem.id, 1)}
                  >
                    Add to Cart
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
