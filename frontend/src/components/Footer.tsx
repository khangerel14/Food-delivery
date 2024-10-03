"use client";

import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export const Footer = () => {
  const router = useRouter();
  const menu = () => {
    router.push("/menu");
  };
  const deliveryZone = () => {
    router.push("/deliverZone");
  };
  const home = () => {
    router.push("/dashboard");
  };
  return (
    <div className="flex relative items-center justify-center w-full h-[400px] bg-cover max-xl:px-12">
      <div className="flex flex-col items-center justify-center gap-9 absolute">
        <div>
          <h1 className="font-bold text-2xl">Food Delivery</h1>
        </div>
        <div className="flex max-w-screen-xl gap-32 justify-between max-xl:gap-12 max-md:gap-5 max-sm:flex-wrap max-sm:px-12">
          <button className="border-b" onClick={home}>
            Нүүр
          </button>
          <button className="border-b">Холбоо барих</button>
          <button className="border-b" onClick={menu}>
            Хоолны цэс
          </button>
          <button className="border-b">Үйлчилгээний нөхцөл</button>
          <button className="border-b" onClick={deliveryZone}>
            Хүргэлтийн бүс
          </button>
        </div>
        <div className="flex gap-5 items-center">
          <Facebook sx={{ fontSize: 35, borderRadius: 40 }} />
          <Instagram sx={{ fontSize: 35 }} />
          <Twitter sx={{ fontSize: 35 }} />
        </div>
        <div className="flex flex-col items-center gap-2 w-full border-t-2 border-white pt-8">
          <p>© 2024 Pinecone Foods LLC </p>
          <p>Зохиогчийн эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </div>
  );
};
