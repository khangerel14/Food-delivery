"use client";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { White } from "@/images";
import { OrderRight } from "./OrderRight";

export const Order = () => {
  const router = useRouter();
  const { user, isLoading }: any = useUser();

  const [formData, setFormData] = useState({
    email: "",
    khoroo: "",
    district: "",
    phoneNumber: "",
  });

  const handleChange = (field: string, value: number | string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (user?.email) {
      handleChange("email", user.email);
    }
  }, [user]);

  const orderPost = async () => {
    try {
      const data = await axios.post("http://localhost:8000/api/orders", {
        ...formData,
      });
      toast.success("Мэдээлэл амжилттай бүртгэгдлээ <3");
      return data;
    } catch (error) {
      console.error(error);
      toast.error("Order submission failed. Please try again.");
    }
  };
  const back = () => {
    router.push("/basket", { scroll: false });
    localStorage.removeItem("invoice");
  };
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="relative">
      <div className="">
        <White />
      </div>
      <div className="absolute flex mx-auto justify-between w-[1230px] inset-0 top-32 max-xl:w-full gap-10 max-xl:px-12 max-lg:flex-col">
        <div className="w-[60%] max-lg:w-full">
          <div className="w-full flex justify-start gap-2 items-center py-8">
            <KeyboardBackspaceIcon />
            <button onClick={back}>Back</button>
          </div>
          <Toaster position="top-right" />
          <div className="flex flex-col gap-5 items-start max-xl:w-[100%]">
            <h1 className="text-2xl text-slate-800">Edit Delivery Details</h1>
            <hr />
            <input
              type="email"
              placeholder="Email хаяг"
              className="p-3 border border-gray-500 rounded-sm outline-none w-full backdrop-blur-sm bg-white/30"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <select
              className="p-3 border border-gray-500 rounded-sm outline-none w-full backdrop-blur-sm bg-white/30"
              onChange={(e) => handleChange("district", e.target.value)}
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
              className="p-3 border border-gray-500 rounded-sm outline-none w-full backdrop-blur-sm bg-white/30"
              onChange={(e) => handleChange("khoroo", e.target.value)}
            />
            <input
              type="number"
              placeholder="Утасны дугаар"
              className="p-3 border border-gray-500 rounded-sm outline-none w-full backdrop-blur-sm bg-white/30"
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
            />
            <button
              className="w-full bg-[#F91944] rounded-lg p-3 text-white"
              onClick={orderPost}
            >
              Save & Continue
            </button>
          </div>
        </div>
        <OrderRight formData={formData} />
      </div>
    </div>
  );
};
