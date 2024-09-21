import { Facebook, Instagram, Twitter } from "@mui/icons-material";

export const Footer = () => {
  return (
    <div className="flex relative items-center justify-center w-full h-[400px] bg-[#2c2c2c] text-white bg-cover">
      <div className="flex flex-col items-center justify-center gap-9 absolute">
        <div>
          <h1 className="font-bold text-2xl">Food Delivery</h1>
        </div>
        <div className="flex w-[1280px] justify-between">
          <button className="border-b">Нүүр</button>
          <button className="border-b">Холбоо барих</button>
          <button className="border-b">Хоолны цэс</button>
          <button className="border-b">Үйлчилгээний нөхцөл</button>
          <button className="border-b">Хүргэлтийн бүс</button>
          <button className="border-b">Нууцлалын бодлого</button>
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
