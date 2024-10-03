"use client";

import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useContext, useEffect, useState, useRef } from "react";
import { BasketContext } from "@/context/BasketContext";
import toast, { Toaster } from "react-hot-toast";
import { SendBtn } from "./SendBtn";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

export const Order = () => {
  const [cartItemsArray, setCartItemsArray] = useState<any[]>([]);
  const { cartItems, foodData, setCartItems }: any = useContext(BasketContext);
  const formDataRef = useRef({
    email: "",
    khoroo: "",
    district: "",
    phoneNumber: "",
  });

  const handleRef = (field: string, value: number | string) => {
    formDataRef.current = { ...formDataRef.current, [field]: value };
  };

  const orderPost = async () => {
    const { user }: any = useUser();

    try {
      const data = await axios.post("http://localhost:8000/api/orders", {
        ...formDataRef.current,
      });
      toast.success("Мэдээлэл амжилттай бүртгэгдлээ <3");

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTable = async (user: any) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/${user.sub}`);

      setCartItems({});
      localStorage.removeItem("cartItems");
    } catch (error) {
      console.error("An error occurred while deleting the cart:", error);
      alert("Failed to clear the cart. Please try again.");
    }
  };

  useEffect(() => {
    if (cartItems && foodData.length > 0) {
      try {
        const parsedItems =
          typeof cartItems === "string" ? JSON.parse(cartItems) : cartItems;

        const itemsArray = Object.entries(parsedItems)
          .map(([id, qty]) => {
            const foodItem = foodData.find(
              (item: any) => item.id === Number(id)
            );

            return foodItem ? { ...foodItem, qty } : null;
          })
          .filter(Boolean);

        setCartItemsArray(itemsArray);
      } catch (error) {
        console.error("Error parsing cartItems", error);
        setCartItemsArray([]);
      }
    }
  }, [foodData, cartItems]);

  const totalPrice = cartItemsArray.length
    ? cartItemsArray.reduce((acc, item) => acc + item.qty * item.price, 0)
    : 0;

  const deliveryPrice = 2500;
  const grandTotal = totalPrice + deliveryPrice;

  return (
    <div className="flex justify-between items-start w-[1200px] my-32 mx-auto pt-20">
      <Toaster position="top-right" />
      <div className="flex flex-col gap-10 w-[480px]">
        <h1 className="text-2xl font-semibold">Хүргэлтийн мэдээлэл</h1>
        <div className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email хаяг"
            className="p-3 border border-gray-500 rounded-sm outline-none"
            onChange={(e) => handleRef("email", e.target.value)}
          />
          <select
            className="p-3 border border-gray-500 rounded-sm outline-none"
            onChange={(e) => handleRef("district", e.target.value)}
          >
            <option value="Хан уул">Хан уул</option>
            <option value="Чингэлтэй">Чингэлтэй</option>
            <option value="Баянзүрх">Баянзүрх</option>
            <option value="Сонгино хайрхан">Сонгино хайрхан</option>
            <option value="Багануур">Багануур</option>
            <option value="Сүхбаатар">Сүхбаатар</option>
          </select>
          <input
            type="text"
            placeholder="Хороо"
            className="p-3 border border-gray-500 rounded-sm outline-none"
            onChange={(e) => handleRef("khoroo", e.target.value)}
          />
          <input
            type="number"
            placeholder="Утасны дугаар"
            className="p-3 border border-gray-500 rounded-sm outline-none"
            onChange={(e) => handleRef("phoneNumber", e.target.value)}
          />
          <button onClick={orderPost}>
            <SendBtn />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-10 w-[450px]">
        <h1 className="text-2xl font-semibold">Төлбөрийн мэдээлэл</h1>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center h-8 border-b">
            <p>Мөнгөн дүн:</p>
            <p>{totalPrice}₮</p>
          </div>
          <div className="flex justify-between items-center h-8 border-b">
            <p>Хүргэлтийн үнэ:</p>
            <p>{deliveryPrice}₮</p>
          </div>
          <div className="flex justify-between items-center h-8 border-b font-semibold">
            <p>Нийт:</p>
            <p>{grandTotal}₮</p>
          </div>
        </div>
        <button
          className="flex gap-5 items-center justify-center w-64 p-3 text-center bg-[#48A860] rounded-xl text-white"
          onClick={deleteTable}
        >
          <a href="/api/create-invoice">Төлбөр төлөх</a>
          <QrCodeScannerIcon />
        </button>
      </div>
    </div>
  );
};
