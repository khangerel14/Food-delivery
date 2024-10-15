"use client";

import { BasketContext } from "@/context/BasketContext";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import DeleteIcon from "@mui/icons-material/Delete";

type FoodItem = {
  id: number;
  name: string;
  imgUrl: string;
  price: number;
  categoryId: number;
  qty: number;
};

type FormData = {
  khoroo?: string;
  district?: string;
  phoneNumber?: string;
  email?: string;
};

export const OrderRight = ({ formData }: { formData: FormData }) => {
  const { cartItems, foodData, deleteFromCart }: any =
    useContext(BasketContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, isLoading }: any = useUser();
  const code = "invoice_code";

  const parsedItems =
    typeof cartItems === "string" ? JSON.parse(cartItems) : cartItems;

  const itemsArray = Object.entries(parsedItems)
    .map(([id, qty]) => {
      const foodItem = foodData.find(
        (item: FoodItem) => item.id === Number(id)
      );
      return foodItem ? { ...foodItem, qty } : null;
    })
    .filter(Boolean) as FoodItem[];

  const totalPrice = itemsArray.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const deliveryPrice = 2500;
  const grandTotal = totalPrice + deliveryPrice;

  const createInvoice = async () => {
    if (isLoading || !user) {
      console.log("User is loading or not authenticated");
      return;
    }

    setLoading(true);
    const encodedUserId = encodeURIComponent(user.sub);

    const invoiceData = {
      amount: grandTotal,
      user_id: encodedUserId,
      code: code,
      invoice_id: "invoice_12345",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/qpay/create-invoice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoiceData),
        }
      );

      const data = await response.json();
      localStorage.setItem("invoice", JSON.stringify(data));
      router.push("/qpay", { scroll: false });
    } catch (error) {
      console.error("Error in request:", error);
    } finally {
      setLoading(false);
    }
  };
  const categoryIdToName = (categoryId: number | undefined) => {
    const categoryMap: { [key: number]: string } = {
      1: "Breakfast",
      2: "Soup",
      3: "Main Course",
      4: "Dessert",
    };
    return categoryId ? categoryMap[categoryId] : "All Categories";
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-10 w-[50%] p-3 py-5 border-2 rounded-md max-xl:w-[500px] max-lg:w-full backdrop-blur-sm bg-white/30">
      <div className="flex flex-col gap-3">
        <h1>Хороо: {formData.khoroo || "-----"}</h1>
        <h1>Arriving in 20-30 minutes</h1>
        <p>Дүүрэг: {formData.district || "-----"}</p>
        <p>Утас: {formData.phoneNumber || "-----"}</p>
        <p>Email хаяг: {formData.email || "-----"}</p>
      </div>
      {itemsArray.map((item: FoodItem, index: number) => (
        <div className="flex items-center w-full justify-between" key={index}>
          <div className="flex items-center gap-3">
            <img
              src={item.imgUrl}
              alt={item.name}
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
          <div className="flex gap-2 items-center w-fit">
            <p className="flex items-center">{item.qty} items</p>
            <button
              className="p-2 rounded-full bg-[#F91944]"
              onClick={() => deleteFromCart(item.id)}
            >
              <DeleteIcon sx={{ color: "white" }} />
            </button>
          </div>
        </div>
      ))}
      <hr className="w-full" />
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Total Price</h1>
        <h1>{totalPrice} ₮</h1>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Delivery Price</h1>
        <h1>{deliveryPrice} ₮</h1>
      </div>
      <hr className="w-full" />
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Grand Total</h1>
        <h1 className="font-semibold text-lg">{grandTotal} ₮</h1>
      </div>
      <button
        className="flex gap-5 items-center justify-center w-full p-3 text-center bg-[#F91944] rounded-xl text-white"
        onClick={createInvoice}
        disabled={loading}
      >
        {loading ? "Processing..." : "Proceed to Payment"}
        <QrCodeScannerIcon />
      </button>
    </div>
  );
};
