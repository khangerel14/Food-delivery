"use client";

import { useContext, useEffect } from "react";
import { StoreContext } from "@/context/StoreContext";
import { Paginations } from "./Paginations";
import { useSearchParams, useRouter } from "next/navigation";

export const Card = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("Card must be used within StoreContext");
  }

  const {
    addToCart,
    foodData,
    inputValue,
    fetchFoods,
    loading,
    totalItems,
    isActive,
  } = context;
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "6", 10);

  const categoryIdStr = searchParams.get("categoryId");
  const categoryId: number | undefined = categoryIdStr
    ? parseInt(categoryIdStr, 10)
    : undefined;

  const categoryIdToName = (categoryId: number | undefined) => {
    const categoryMap: { [key: number]: string } = {
      1: "Breakfast",
      2: "Soup",
      3: "Main Course",
      4: "Dessert",
    };
    return categoryId ? categoryMap[categoryId] || "Unknown" : "All Categories";
  };

  useEffect(() => {
    fetchFoods(page, limit, isActive);
  }, [page, limit, isActive]);

  if (loading) {
    return <div className="w-36 mx-auto h-full py-52">Loading...</div>;
  }

  if (foodData.length === 0) {
    return (
      <div className="w-36 mx-auto h-full py-52">
        No Food Available. Try adjusting your search or filter.
      </div>
    );
  }

  const handleToCart = (id: number) => {
    try {
      addToCart(id);
      router.push("/basket", { scroll: false });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col mx-auto w-[1230px] items-center max-xl:w-full">
      <div className="flex flex-wrap justify-between rounded-xl py-10 mx-auto gap-[53px] max-xl:px-12 max-sm:px-2 max-xl:justify-center max-xl:flex-wrap">
        {foodData
          .filter((elem: any) => {
            const matchesInput =
              !inputValue ||
              elem.name.toLowerCase().includes(inputValue.toLowerCase());
            return matchesInput;
          })
          .map((elem: any, index: number) => (
            <div
              className="flex flex-col gap-6 rounded-lg border border-gray-100 h-[500px] w-[360px] items-center p-5 justify-between transition hover:shadow-lg hover:scale-105 ease-linear duration-300"
              key={index}
            >
              <div className="flex justify-start w-full">
                <h1 className="rounded-full px-3 bg-[#f3d7dd] border-red-500 border text-red-500">
                  {categoryIdToName(elem.categoryId)}
                </h1>
              </div>
              <div className="rounded-full h-48 w-48">
                <img
                  src={elem.imgUrl}
                  alt={`Image of ${elem.name}`}
                  loading="lazy"
                  className="object-cover h-full w-full rounded-full hover:scale-105 transition duration-300 ease-out"
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-xl font-semibold">{elem.name}</h1>
                <p className="text-center">{elem.description}</p>
                <h1 className="text-lg font-bold">{elem.price}₮</h1>
                <button
                  className="p-2 px-7 text-white rounded-full bg-[#F91944]"
                  onClick={() => handleToCart(elem.id)}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
      </div>
      <Paginations currentPage={page} limit={limit} totalItems={totalItems} />
    </div>
  );
};
