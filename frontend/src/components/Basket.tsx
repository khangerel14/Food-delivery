"use client";

import { Basketsvg } from "@/images";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { BasketContext } from "@/context/BasketContext";

type FoodItem = {
  id: number;
  imgUrl: string;
  name: string;
  description: string;
  price: number;
};

type CartItem = FoodItem & {
  qty: number;
};

type CartItems = Record<string, number>;

export const Basket = () => {
  const router = useRouter();

  const {
    foodData = [],
    cartItems = {} as CartItems,
    removeFromCart = () => {},
    addToQty = () => {},
    addToCart = () => {},
  } = useContext(BasketContext) || {};

  const cartItemsArray: CartItem[] = [];

  const handleAddToCart = async (foodId: number, quantity: number) => {
    try {
      await addToCart(foodId.toString(), quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (foodData.length > 0) {
    const foodDataMap = new Map<number, FoodItem>(
      foodData.map((item: FoodItem) => [item.id, item])
    );

    Object.entries(cartItems).forEach(([id, qty]) => {
      const foodItem = foodDataMap.get(Number(id));
      if (foodItem) {
        cartItemsArray.push({
          ...foodItem,
          qty,
        });
      } else {
        console.warn(`Food item with id ${id} not found in foodData`);
      }
    });
  }

  return (
    <div className="flex flex-col justify-center items-start gap-20 w-[1230px] mx-auto py-20 pt-32 max-xl:w-full">
      <div className="flex items-center flex-col w-[1230px] mx-auto max-md:items-center max-xl:w-full max-xl:px-10 max-sm:px-2">
        <div className="w-full flex justify-between gap-2 items-center mb-10">
          <button
            onClick={() => router.push("/dashboard", { scroll: false })}
            className="flex items-center"
          >
            <KeyboardBackspaceIcon />
            Back
          </button>
          <button
            className="flex gap-4 px-4 p-3 bg-[#F91944] text-white rounded-full w-48 items-center justify-center"
            onClick={() => router.push("/order", { scroll: false })}
          >
            <Basketsvg />
            Move to Order
          </button>
        </div>
        {cartItemsArray.length > 0 ? (
          <div className="max-xl:w-full w-[1230px] flex flex-col gap-10">
            {cartItemsArray.map((item: CartItem) => (
              <div
                className="flex justify-between items-center w-full max-lg:flex-col-reverse max-lg:gap-10"
                key={item.id}
              >
                <div className="flex flex-col gap-7 max-lg:text-center max-lg:items-center">
                  <div className="flex flex-col gap-4 w-96">
                    <h1 className="text-4xl text-gray-700 font-semibold">
                      {item.name}
                    </h1>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="flex gap-6 items-center justify-center lg:justify-start">
                    <p className="font-bold text-3xl">
                      {item.qty * item.price}₮
                    </p>
                    <div className="p-2 px-4 rounded-full border flex items-center justify-start">
                      <button
                        className="mr-5 bg-[#f91944] rounded-full h-9 w-9"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <RemoveIcon sx={{ color: "white" }} />
                      </button>
                      {item.qty}
                      <button
                        className="ml-5 bg-[#F91944] rounded-full h-9 w-9"
                        onClick={() => addToQty(item.id)}
                        aria-label={`Add ${item.name} to quantity`}
                      >
                        <AddIcon sx={{ color: "white" }} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      className="flex gap-4 px-4 p-3 bg-[#F91944] text-white rounded-full w-44 items-center justify-center"
                      onClick={() => handleAddToCart(item.id, item.qty)}
                    >
                      <Basketsvg />
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div>
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    width={700}
                    height={500}
                    className="rounded-full h-[500px] w-[500px]"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Сагс хоосон байна.</div>
        )}
      </div>
    </div>
  );
};
