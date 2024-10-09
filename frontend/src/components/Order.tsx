"use client";

import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useContext, useEffect, useState, useRef } from "react";
import { BasketContext } from "@/context/BasketContext";
import toast, { Toaster } from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { White } from "@/images";

export const Order = () => {
  const [cartItemsArray, setCartItemsArray] = useState<any[]>([]);
  const { cartItems, foodData, setCartItems, deleteFromCart }: any =
    useContext(BasketContext);
  const router = useRouter();
  const { user, isLoading }: any = useUser();

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

  const deleteTable = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/${userId}`);

      setCartItems({});
      localStorage.removeItem("cartItems");
    } catch (error) {
      console.error("An error occurred while deleting the cart:", error);
      alert("Failed to clear the cart. Please try again.");
    }
  };

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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="relative">
      <div className="blur-sm">
        <White />
      </div>
      <div className="absolute flex mx-auto justify-between w-[1230px] inset-0 top-32 max-xl:w-full gap-10 max-xl:px-12 max-lg:flex-col">
        <div className="w-[60%] max-lg:w-full">
          <div className="w-full flex justify-start gap-2 items-center py-8">
            <KeyboardBackspaceIcon />
            <button onClick={() => router.push("/basket", { scroll: false })}>
              Back
            </button>
          </div>
          <Toaster position="top-right" />
          <div className="flex flex-col gap-5 items-start max-xl:w-[100%]">
            <h1 className="text-2xl text-slate-800">Edit Delivery Details</h1>
            <hr />
            <input
              type="email"
              placeholder="Email хаяг"
              className="p-3 border border-gray-500 rounded-sm outline-none w-full"
              onChange={(e) => handleRef("email", e.target.value)}
            />
            <select
              className="p-3 border border-gray-500 rounded-sm outline-none w-full"
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
              className="p-3 border border-gray-500 rounded-sm outline-none w-full"
              onChange={(e) => handleRef("khoroo", e.target.value)}
            />
            <input
              type="number"
              placeholder="Утасны дугаар"
              className="p-3 border border-gray-500 rounded-sm outline-none w-full"
              onChange={(e) => handleRef("phoneNumber", e.target.value)}
            />
            <button
              className="w-full bg-[#F91944] rounded-lg p-3 text-white"
              onClick={orderPost}
            >
              Save & Continue
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-10 w-[50%] p-3 py-5 border-2 bg-transparent max-xl:w-[500px] max-lg:w-full">
          <div className="flex flex-col gap-3">
            <h1>Delivery Palace: -----</h1>
            <h1>Ariving in 20-30 minutes</h1>
            <p>Road -----</p>
            <p>Floor: -----</p>
            <p>Deliver to : -----</p>
          </div>
          {cartItemsArray.map((item: any, index: number) => (
            <div
              className="flex items-center w-full justify-between"
              key={index}
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.imgUrl}
                  alt=""
                  className="h-20 w-20 rounded-full"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="text-lg text-gray-700">{item.name}</h1>
                  <p className="text-[#F91944] font-semibold">{item.price} ₮</p>
                  <p className="text-gray-400">
                    {categoryIdToName(item.categoryId)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p>{item.qty} items</p>
                <button onClick={() => deleteFromCart(item.id)}>
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center h-8 border-b">
              <p>Мөнгөн дүн:</p>
              <p>{totalPrice} ₮</p>
            </div>
            <div className="flex justify-between items-center h-8 border-b">
              <p>Хүргэлтийн үнэ:</p>
              <p>{deliveryPrice} ₮</p>
            </div>
            <div className="flex justify-between items-center h-8 border-b font-semibold text-xl">
              <p>Нийт:</p>
              <p>{grandTotal} ₮</p>
            </div>
          </div>
          <button
            className="flex gap-5 items-center justify-center w-full p-3 text-center bg-[#F91944] rounded-xl text-white"
            onClick={() => deleteTable(user.sub)}
          >
            Төлбөр төлөх
            <QrCodeScannerIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
